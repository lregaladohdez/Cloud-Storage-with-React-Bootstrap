export function svgGraphFromData(
  size: number,
  data: {date: number; uploaded: number}[],
): string {
  let points = data.slice(1).map((d, i) => ({
    percent: (d.uploaded - data[0].uploaded) / (size - data[0].uploaded),
    speed: (d.uploaded - data[i].uploaded) / (d.date - data[i].date),
  }));
  const max = Math.max(...points.map((p) => p.speed));
  points = points.map((p) => ({
    percent: 0 + 1000 * p.percent,
    speed: 100 - (p.speed / max) * 10,
  }));
  return `<svg viewBox="0 0 1000 100" xmlns="http://www.w3.org/2000/svg">
<path 
fill="none"
stroke="blue"
d="
M 0,100
${points.map(
  (p) => `L${p.percent} ${p.speed}
`,
)}
"/>
</svg>`.replace(/\n/g, ' ');
}
