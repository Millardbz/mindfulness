/**
 * Helpers for building valid Portable Text `initialValue` arrays, so editors
 * open documents that are already filled in and ready to tweak.
 */
export function ptBlocks(paragraphs: string[]) {
  return paragraphs.map((text, i) => ({
    _type: "block",
    _key: `default-${i}`,
    style: "normal" as const,
    markDefs: [],
    children: [{ _type: "span", _key: `default-${i}-0`, text, marks: [] }],
  }));
}
