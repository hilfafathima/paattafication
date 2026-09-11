import { PhysicsAnalysis } from '../../types';

export function calculateGravity(massKg: number): PhysicsAnalysis {
  const g = 9.81;
  const force = Number((massKg * g).toFixed(2));

  let interpretation = '';
  if (force < 400) {
    interpretation = `Subject is subjected to ${force} Newtons of Earth-bound gravitational force. Extremely lightweight structure; high horizontal velocity potential detected.`;
  } else if (force <= 600) {
    interpretation = `Earth is currently exerting ${force} Newtons of downward influence on subject. This scientifically explains why getting out of bed or assembling a productive routine has occasionally felt difficult.`;
  } else {
    interpretation = `Downward gravitational loading recorded at ${force} Newtons. High structural resistance required; subject demonstrates solid planetary grounding.`;
  }

  return {
    massKg,
    gravitationalForceN: force,
    formula: `F = m × g = ${massKg} kg × 9.81 m/s²`,
    interpretation
  };
}

export function calculateVerticalOccupancy(heightCm: number) {
  const ref = 170;
  const ratio = Number((heightCm / ref).toFixed(2));

  return {
    heightCm,
    referenceHeightCm: ref,
    occupancyRatio: ratio,
    interpretation: `Subject occupies approximately ${heightCm} centimetres of Earth's vertical jurisdiction (Vertical Ratio: ${ratio}). Vertical existence officially confirmed. No immediate evidence of cockroach-level horizontal efficiency.`
  };
}
