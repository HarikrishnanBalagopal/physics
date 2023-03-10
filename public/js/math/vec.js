import { PI, EPSILON } from '../common/globals.js';

export const add_2 = ([x1, y1], [x2, y2]) => [x1 + x2, y1 + y2];
export const sub_2 = ([x1, y1], [x2, y2]) => [x1 - x2, y1 - y2];
export const mul_2 = ([x1, y1], [x2, y2]) => [x1 * x2, y1 * y2];
export const scale_2 = (s, [x, y]) => [s * x, s * y];
export const dot_2 = ([x1, y1], [x2, y2]) => x1 * x2 + y1 * y2;
export const len_2 = ([x, y]) => Math.sqrt(x * x + y * y);
export const len_sq_2 = ([x, y]) => x * x + y * y;
export const norm_2 = (v) => scale_2(1 / (len_2(v) + EPSILON), v);
export const rand_2 = () => [Math.random(), Math.random()];
export const rand_n = (n) => Math.floor(n * Math.random());
export const to_rad = (a) => PI * a / 180;
export const dir_2 = (a) => [Math.cos(a), Math.sin(a)];
export const dir_deg_2 = (a) => [Math.cos(to_rad(a)), Math.sin(to_rad(a))];
export const rand_range = (min, max) => min + Math.floor((max - min) * Math.random());
export const lerp_2 = (s, v1, v2) => add_2(scale_2(1 - s, v1), scale_2(s, v2));
