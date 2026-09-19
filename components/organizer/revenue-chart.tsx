export function RevenueChart({ data }: { data: { month: string; value: number }[] }) {
  const width = 600;
  const height = 180;
  const max = Math.max(...data.map((d) => d.value));
  const step = width / (data.length - 1);

  const points = data.map((d, i) => {
    const x = i * step;
    const y = height - (d.value / max) * (height - 20) - 10;
    return `${x},${y}`;
  });

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke="var(--primary)"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {data.map((d, i) => (
        <text
          key={d.month}
          x={i * step}
          y={height - 2}
          fontSize={10}
          fill="var(--muted)"
          textAnchor="middle"
        >
          {d.month}
        </text>
      ))}
    </svg>
  );
}
