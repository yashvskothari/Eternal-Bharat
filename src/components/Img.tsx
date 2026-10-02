import { useEffect, useRef, useState } from "react";

interface Props {
  src: string;
  alt: string;
  className?: string;
  /** Above-the-fold images load eagerly with high priority. */
  priority?: boolean;
}

/** Lazy image that fades in once decoded and falls back to a quiet placeholder if the CDN fails. */
export function Img({ src, alt, className = "", priority = false }: Props) {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState<string>();
  const [failed, setFailed] = useState<string>();

  useEffect(() => {
    const el = ref.current;
    if (el?.complete && el.naturalWidth > 0) setLoaded(src);
  }, [src]);

  if (!src || failed === src) {
    return (
      <div role="img" aria-label={alt} className={`grid place-items-center bg-linear-to-br from-surface to-ink-deep ${className}`}>
        <span aria-hidden className="font-display text-5xl text-gold/30">{alt.charAt(0)}</span>
      </div>
    );
  }

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      onLoad={() => setLoaded(src)}
      onError={() => setFailed(src)}
      data-loaded={loaded === src}
      className={`img-fade ${className}`}
    />
  );
}
