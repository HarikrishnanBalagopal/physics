import { W, H, DATA } from '../common/globals.js';
import { draw_background, draw_particle } from './utils.js';

export function reset(can) {
    console.log('display reset start');
    can.width = W;
    can.height = H;
    const ctx = can.getContext('2d');
    DATA.ctx = ctx;
    console.log('display reset end');
}

export function draw_particles(ctx) {
    const particles = DATA.particles;
    for (let p of particles) {
        draw_particle(ctx, p);
    }
}

export function draw() {
    const ctx = DATA.ctx;
    draw_background(ctx);
    draw_particles(ctx);
}
