import { NUM_SUB_STEPS, NUM_PARTICLES, TIME_STEP, DATA, EPSILON } from "./common/globals.js";
import { draw, reset as resetDisplay } from "./display/setup.js";
import {
    constrain_particles,
    reset as resetPhysics,
    reset_empty,
    solve_collisions,
    update_particles,
} from "./physics/setup.js";
import { new_particle_from_fountain } from './physics/utils.js';

function main() {
    console.log('main start');
    const can = document.querySelector('canvas');
    const output_time = document.querySelector('#output-time');
    const output_num_particles = document.querySelector('#output-num-particles');
    const output_fps = document.querySelector('#output-fps');
    const checkbox_constraint = document.querySelector('#checkbox-constraint');
    checkbox_constraint.addEventListener('change', () => {
        console.log('checkbox_constraint.checked', checkbox_constraint.checked);
        DATA.constraint = checkbox_constraint.checked;
    });

    let filling = false;

    const reset = () => {
        filling = false;
        checkbox_constraint.checked = false;
        resetPhysics(NUM_PARTICLES);
        resetDisplay(can);
        draw();
    };
    reset();
    const button_reset = document.querySelector('#button-reset');
    button_reset.addEventListener('click', reset);

    // loop
    let last_t = null;
    let last_filled_t = null;
    let ema_dt = 0;
    const step = (t) => {
        if (!running) return;
        const particles = DATA.particles;
        output_time.textContent = `time: ${t}`;
        output_num_particles.textContent = `particles: ${particles?.length}`;
        requestAnimationFrame(step);
        if (!last_t) last_t = t;
        const dt = t - last_t;
        if (dt < TIME_STEP) return;
        last_t = t;
        ema_dt = 0.9 * ema_dt + 0.1 * dt;
        const fps = 1000 / (ema_dt + EPSILON);
        output_fps.textContent = `fps: ${Math.round(fps * 100) / 100}`;
        if (filling) {
            // filling
            if (particles.length >= NUM_PARTICLES) {
                filling = false;
            } else {
                if (!last_filled_t) last_filled_t = t;
                if (t - last_filled_t >= 50) {
                    last_filled_t = t;
                    console.log('filling');
                    particles.push(new_particle_from_fountain(t * 0.1));
                }
            }
        }
        const sub_dt = dt / NUM_SUB_STEPS;
        for (let i = 0; i < NUM_SUB_STEPS; i++) {
            solve_collisions(sub_dt);
            update_particles(sub_dt);
            if (DATA.constraint) constrain_particles();
        }
        draw();
    };
    requestAnimationFrame(step);

    let running = true;
    const button_start_stop = document.querySelector('#button-start-stop');
    button_start_stop.addEventListener('click', () => {
        if (running) {
            running = false;
            button_start_stop.textContent = 'start';
        } else {
            last_t = null;
            running = true;
            button_start_stop.textContent = 'stop';
            requestAnimationFrame(step);
        }
    });

    const button_fill = document.querySelector('#button-fill');
    button_fill.addEventListener('click', () => {
        reset_empty();
        filling = true;
    });

    console.log('main end');
}

main();
