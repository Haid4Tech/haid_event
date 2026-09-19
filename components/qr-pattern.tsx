// ponytail: visual-only QR mock (deterministic pseudo-random grid from the code),
// not a real encodable/scannable QR. Add a real encoder (e.g. `qrcode`) if this
// ever needs to be scanned by an actual camera.
function seededGrid(code: string, length: number) {
  let seed = 0;
  for (const ch of code) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;

  const grid: boolean[] = [];
  for (let i = 0; i < length; i++) {
    seed = (seed * 1103515245 + 12345) >>> 0;
    grid.push(seed / 0xffffffff > 0.55);
  }
  return grid;
}

export function QrPattern({ code, size = 220 }: { code: string; size?: number }) {
  const cells = 21;
  const grid = seededGrid(code, cells * cells);
  const cellSize = size / cells;
  const isFinder = (r: number, c: number) =>
    (r < 7 && c < 7) || (r < 7 && c >= cells - 7) || (r >= cells - 7 && c < 7);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rounded-lg bg-white p-3">
      {grid.map((on, i) => {
        const r = Math.floor(i / cells);
        const c = i % cells;
        if (isFinder(r, c) || !on) return null;
        return (
          <rect
            key={i}
            x={c * cellSize}
            y={r * cellSize}
            width={cellSize}
            height={cellSize}
            fill="#0a0912"
          />
        );
      })}
      {[
        [0, 0],
        [0, cells - 7],
        [cells - 7, 0],
      ].map(([r, c]) => (
        <g key={`${r}-${c}`}>
          <rect x={c * cellSize} y={r * cellSize} width={cellSize * 7} height={cellSize * 7} fill="#0a0912" />
          <rect
            x={c * cellSize + cellSize}
            y={r * cellSize + cellSize}
            width={cellSize * 5}
            height={cellSize * 5}
            fill="#fff"
          />
          <rect
            x={c * cellSize + cellSize * 2}
            y={r * cellSize + cellSize * 2}
            width={cellSize * 3}
            height={cellSize * 3}
            fill="#0a0912"
          />
        </g>
      ))}
    </svg>
  );
}
