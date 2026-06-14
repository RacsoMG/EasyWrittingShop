const DOT_PATTERN =
  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")";

/**
 * Lightweight static stand-in for the 3D constellation. Used during SSR, while
 * the 3D chunk loads, and as the permanent fallback when the WebGL / reduced-
 * motion / low-power gates fail. Pure CSS — zero JS cost.
 *
 * @param {boolean} [showGrid=false] Render the faint dot grid (hero only).
 * @param {string}  [glowClassName]  Tailwind classes for the central glow blob.
 */
export default function ConstellationPoster({
  showGrid = false,
  glowClassName = "h-[420px] w-[420px] bg-gradient-to-br from-white/10 to-transparent",
}) {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      {showGrid ? (
        <div
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: DOT_PATTERN }}
        />
      ) : null}
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl ${glowClassName}`}
      />
    </div>
  );
}
