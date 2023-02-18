import { DATA, H, W } from "../common/globals.js";
import { mul_2, rand_2, rand_n } from '../math/vec.js';
import { constrain_particle, solve_collision, update_particle } from "./utils.js";

export function new_particle() {
    const p = mul_2([W, H], rand_2());
    return {
        pos: p,
        old_pos: p,
        radius: 10+rand_n(10),
        color: 360 * Math.random(),
    };
}

export function reset(num_particles) {
    const particles = [];
    for (let i = 0; i < num_particles; i++) {
        particles.push(new_particle());
    }
    DATA.particles = particles;
}

export function update_particles(dt) {
    const particles = DATA.particles;
    for (let p of particles) {
        update_particle(p, dt);
    }
}

export function constrain_particles() {
    const particles = DATA.particles;
    for (let p of particles) {
        constrain_particle(p);
    }
}

export function solve_collisions() {
    const particles = DATA.particles;
    for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            solve_collision(p1, p2);
        }
    }
}
