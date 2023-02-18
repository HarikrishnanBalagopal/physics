export const VERSION = '1.0.2';
export const EPSILON = 0.000001;
export const PI = Math.PI;
export const W = 640;
export const H = W;
export const GRAVITY = [0, 0.001];
export const CONSTRAINT_CIRCLE_CENTER = [W / 2, H / 2];
export const CONSTRAINT_CIRCLE_RADIUS = W / 2 - 10;
export const CONSTRAINT_CHAIN_LEFT = [W / 6, 3 * H / 4];
export const CONSTRAINT_CHAIN_RIGHT = [5 * W / 6, 3 * H / 4];
export const CONSTRAINT_CHAIN_PARTICLE_RADIUS = 10;
export const CONSTRAINT_CHAIN_LENGTH = 20;
export const TIME_STEP = 1;
export const NUM_SUB_STEPS = 4;
export const NUM_PARTICLES = 500;
export const PARTICLE_MIN_RADIUS = 5;
export const PARTICLE_MAX_RADIUS = 25;
export const DATA = {};

console.log(
    'VERSION', VERSION,
    'GRAVITY', GRAVITY,
);
