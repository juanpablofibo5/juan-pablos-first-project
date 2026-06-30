type KlokkMarkProps = {
  /** Lado del isotipo en px. */
  size?: number;
  /** Verde de la burbuja y la K. Usa un token de marca por defecto. */
  color?: string;
  /** Color del "papel" de la burbuja (la K es negativa sobre este). */
  bubble?: string;
  className?: string;
  /** Texto accesible; si se omite, el isotipo es decorativo (aria-hidden). */
  title?: string;
};

/**
 * Isotipo de Klokk — "K en burbuja" (Opción 11).
 * Burbuja de chat (WhatsApp) con una K que también es un check.
 * Geometría derivada de favicon-klokk.svg; los colores salen de tokens.
 */
export default function KlokkMark({
  size = 64,
  color = "var(--brand)",
  bubble = "#eef1f6",
  className,
  title,
}: KlokkMarkProps) {
  const decorative = !title;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 256 256"
      className={className}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title>{title}</title> : null}
      <rect x="16" y="16" width="224" height="224" rx="56" fill={color} />
      <g transform="translate(2,8)">
        <rect x="50" y="56" width="156" height="116" rx="36" fill={bubble} />
        <path d="M76 162 L76 204 L116 164 Z" fill={bubble} />
        <g transform="translate(-11,-12)">
          <rect x="100" y="80" width="18" height="92" rx="9" fill={color} />
          <path
            d="M118 126 L166 80"
            fill="none"
            stroke={color}
            strokeWidth="18"
            strokeLinecap="round"
          />
          <path
            d="M118 126 L142 150 L178 110"
            fill="none"
            stroke={color}
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
}
