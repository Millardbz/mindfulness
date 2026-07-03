/** Extract the YouTube video id from any watch/share/embed/shorts URL. */
export function youtubeId(url?: string): string | null {
  if (!url) return null;
  const m = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|live\/))([\w-]{11})/,
  );
  return m?.[1] ?? null;
}
