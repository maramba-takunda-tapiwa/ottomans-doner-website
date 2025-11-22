export const animation = {
  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  slow: 0.85,
  base: 0.55,
  fast: 0.3
};

export const shadows = {
  glowOrange: '0 0 12px rgba(232,114,36,0.45)',
  glowGold: '0 0 10px rgba(201,162,39,0.35)'
};

export const colors = {
  orange: 'var(--color-orange)',
  orangeLight: 'var(--color-orange-light)',
  gold: 'var(--color-gold)',
  offWhite: 'var(--color-offwhite)'
};

export const tokens = { animation, shadows, colors };