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

/**
 * Like `ptBlocks`, but for longer documents with headings: each section
 * becomes an optional h2 block followed by its paragraphs.
 */
export function ptSections(
  sections: { heading?: string; paragraphs: string[] }[],
) {
  return sections.flatMap((section, i) => [
    ...(section.heading
      ? [
          {
            _type: "block",
            _key: `section-${i}-h`,
            style: "h2" as const,
            markDefs: [],
            children: [
              {
                _type: "span",
                _key: `section-${i}-h-0`,
                text: section.heading,
                marks: [],
              },
            ],
          },
        ]
      : []),
    ...section.paragraphs.map((text, j) => ({
      _type: "block",
      _key: `section-${i}-${j}`,
      style: "normal" as const,
      markDefs: [],
      children: [
        { _type: "span", _key: `section-${i}-${j}-0`, text, marks: [] },
      ],
    })),
  ]);
}
