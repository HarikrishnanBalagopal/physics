import { DATA, CONSTRAINT_CIRCLE_CENTER, PARTICLE_MIN_RADIUS, PARTICLE_MAX_RADIUS, CONSTRAINT_CHAIN_LENGTH } from "../common/globals.js";
import { rand_n, dir_2, scale_2, dir_deg_2, add_2, rand_range } from '../math/vec.js';
import { constrain_particle, solve_collision, new_particle, update_particle, new_particle_for_chain } from "./utils.js";

export function reset(num_particles, chain_length = CONSTRAINT_CHAIN_LENGTH) {
    const particles = [];
    if (chain_length > 0) {
        console.log('setting up the chain');
        setup_chain_particles(particles, chain_length);
    }
    for (let i = 0; i < num_particles; i++) {
        particles.push(new_particle());
    }
    DATA.particles = particles;
}

export function reset_empty(chain_length = CONSTRAINT_CHAIN_LENGTH) {
    const particles = [];
    if (chain_length > 0) {
        console.log('setting up the chain');
        setup_chain_particles(particles, chain_length);
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

export function setup_chain_particles(particles, chain_length) {
    const chain = [];
    for (let i = 0; i < chain_length; i++) {
        chain.push(new_particle_for_chain(i, chain_length));
    }
    for (let i = 0; i < chain_length - 1; i++) {
        const pl = chain[i];
        const pr = chain[i + 1];
        pl.link = pr;
        pr.link = pl;
    }
    particles.push(...chain);
}
