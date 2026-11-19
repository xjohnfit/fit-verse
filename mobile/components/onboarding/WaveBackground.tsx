import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg";

interface WaveBackgroundProps {
  width: number;
  height: number;
}

const LINE_COUNT = 16;

export default function WaveBackground({ width, height }: WaveBackgroundProps) {
  const baseY = height * 0.55;

  const lines = Array.from({ length: LINE_COUNT }).map((_, i) => {
    const t = i / (LINE_COUNT - 1); // 0 -> 1
    const offsetY = (t - 0.5) * height * 0.5;
    const amp = height * (0.12 + t * 0.05);
    const y0 = baseY + offsetY;

    const d = `M 0,${y0}
      C ${width * 0.18},${y0 - amp} ${width * 0.32},${y0 - amp * 1.1} ${width * 0.5},${y0}
      C ${width * 0.68},${y0 + amp * 1.1} ${width * 0.82},${y0 + amp} ${width},${y0 - amp * 0.25}`;

    const opacity = 0.12 + (1 - Math.abs(t - 0.5) * 2) * 0.35;

    return { d, opacity, key: i };
  });

  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ position: "absolute", top: 0, left: 0 }}
    >
      <Defs>
        <LinearGradient id="waveGradient" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0%" stopColor="#22c1ff" />
          <Stop offset="50%" stopColor="#a855f7" />
          <Stop offset="100%" stopColor="#e83fe8" />
        </LinearGradient>
      </Defs>
      {lines.map((line) => (
        <Path
          key={line.key}
          d={line.d}
          stroke="url(#waveGradient)"
          strokeWidth={1}
          fill="none"
          opacity={line.opacity}
        />
      ))}
    </Svg>
  );
}
