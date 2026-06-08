/** Libera buffer decodificado do elemento de vídeo (pause não basta). */
export function unloadVideoElement(video: HTMLVideoElement) {
  video.pause();
  video.removeAttribute("src");
  for (const source of video.querySelectorAll("source")) {
    source.removeAttribute("src");
  }
  video.load();
}

/** Preenche <source> e dispara load(); retorna função de cleanup. */
export function loadVideoSources(
  video: HTMLVideoElement,
  sources: { src: string; type: string }[],
) {
  unloadVideoElement(video);
  video.replaceChildren(
    ...sources.map(({ src, type }) => {
      const node = document.createElement("source");
      node.src = src;
      node.type = type;
      return node;
    }),
  );
  video.load();
  return () => unloadVideoElement(video);
}
