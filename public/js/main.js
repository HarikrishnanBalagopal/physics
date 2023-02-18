import { NUM_SUB_STEPS, TIME_STEP } from "./common/globals.js";
import { draw, reset as resetDisplay } from "./display/setup.js";
import { constrain_particles, reset as resetPhysics, solve_collisions, update_particles } from "./physics/setup.js";

function main() {
    console.log('main start');
    const num_particles = 250;
    const can = document.querySelector('canvas');
    const reset = () => {
        resetPhysics(num_particles);
        resetDisplay(can);
        draw();
    };
    reset();
    const button_reset = document.querySelector('#button-reset');
    button_reset.addEventListener('click', reset);

    // loop
    let last_t = null;
    const step = (t) => {
        if (!running) return;
        requestAnimationFrame(step);
        if (!last_t) last_t = t;
        const dt = t - last_t;
        if (dt < TIME_STEP) return;
        last_t = t;
        const sub_dt = dt / NUM_SUB_STEPS;
        for (let i = 0; i < NUM_SUB_STEPS; i++) {
            update_particles(sub_dt);
            solve_collisions();
            constrain_particles();
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

    console.log('main end');
}

main();
