/**
 * Targeted migration for the customer feedback of 15 September 2026.
 * Preview: yarn sanity exec scripts/apply-customer-feedback.ts --with-user-token
 * Publish: add -- --apply
 *
 * Only changes the requested fields on the three offerings (and their drafts).
 * Saves a backup before applying and uses revision guards to protect edits
 * made after the documents were read. Never run the full seed on live content.
 */
import { isDeepStrictEqual } from "node:util";
import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { getCliClient } from "sanity/cli";

import { offeringFeedback, yogaTimes } from "./customer-feedback-content";

type BodyBlock = {
  _key: string;
  _type: string;
  children?: { text?: string }[];
};

type OfferingDocument = {
  _id: string;
  _rev: string;
  _type: string;
  title: string;
  body?: BodyBlock[];
  infoBoxes?: { _key: string; [key: string]: unknown }[];
  [key: string]: unknown;
};

function yogaBody(body: BodyBlock[] = []) {
  const text = (block: BodyBlock) =>
    block.children?.map((child) => child.text ?? "").join("") ?? "";
  const blocks = body.filter(
    (block) =>
      block._key !== yogaTimes._key &&
      !/^Hold: mandage kl\. 16\.30–18\.00 og onsdage kl\. 8\.30–10\.00\.$/.test(
        text(block),
      ),
  );
  const introIndex = blocks.findIndex((block) =>
    text(block).startsWith(
      "Mindful yoga er en helt unik, blid, skånsom og langsom yogaform.",
    ),
  );
  if (introIndex === -1) {
    throw new Error(
      "Yoga introduction not found; refusing to guess where Tider belongs.",
    );
  }
  blocks.splice(introIndex + 1, 0, yogaTimes);
  return blocks;
}

async function run() {
  const client = getCliClient({ apiVersion: "2024-10-01" }).withConfig({
    useCdn: false,
    perspective: "raw",
  });
  const ids = Object.keys(offeringFeedback);
  const documents = await client.fetch<OfferingDocument[]>(
    '*[_type == "offering" && _id in $ids]',
    { ids: ids.flatMap((id) => [id, `drafts.${id}`]) },
  );
  for (const id of ids) {
    if (!documents.some((doc) => doc._id === id)) {
      throw new Error(`Missing published offering: ${id}`);
    }
  }

  const changes = documents.flatMap((doc) => {
    const id = doc._id.replace(
      /^drafts\./,
      "",
    ) as keyof typeof offeringFeedback;
    const feedback = offeringFeedback[id];
    const desired: Record<string, unknown> = {
      ...feedback,
      infoBoxes: [
        ...(doc.infoBoxes ?? []).filter(
          (box) => !feedback.infoBoxes.some((next) => next._key === box._key),
        ),
        ...feedback.infoBoxes,
      ],
      ...(id === "offering-mindful-yoga" ? { body: yogaBody(doc.body) } : {}),
    };
    const fields = Object.fromEntries(
      Object.entries(desired).filter(
        ([key, value]) => !isDeepStrictEqual(doc[key], value),
      ),
    );
    return Object.keys(fields).length ? [{ doc, fields }] : [];
  });

  console.log(
    `Project: ${client.config().projectId} / ${client.config().dataset}`,
  );
  console.log(
    JSON.stringify(
      changes.map(({ doc, fields }) => ({ id: doc._id, fields })),
      null,
      2,
    ),
  );
  if (!changes.length) {
    console.log("Already up to date; no changes needed.");
    return;
  }
  if (!process.argv.includes("--apply")) {
    console.log("Preview only. Add -- --apply to publish these changes.");
    return;
  }

  const backupDir = await mkdtemp(join(tmpdir(), "mindfulness-feedback-"));
  const backupPath = join(backupDir, "offerings-before.json");
  await writeFile(backupPath, JSON.stringify(documents, null, 2), {
    mode: 0o600,
  });
  console.log(`Backup: ${backupPath}`);

  let transaction = client.transaction();
  for (const { doc, fields } of changes) {
    transaction = transaction.patch(doc._id, (patch) =>
      patch.ifRevisionId(doc._rev).set(fields),
    );
  }
  const result = await transaction.commit();
  console.log(
    `Published ${changes.length} document updates; transaction ${result.transactionId}.`,
  );
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
