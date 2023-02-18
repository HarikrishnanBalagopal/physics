import { CONSTRAINT_CIRCLE_CENTER, CONSTRAINT_CIRCLE_RADIUS, GRAVITY } from "../common/globals.js";
import { add_2, len_2, norm_2, scale_2, sub_2 } from "../math/vec.js";

export function update_particle(p, dt) {
    const old_vel_dt = sub_2(p.pos, p.old_pos);
    const acc = GRAVITY;
    p.old_pos = p.pos;
    p.pos = add_2(p.pos, add_2(old_vel_dt, scale_2(dt * dt, acc)));
}

export function constrain_particle(p) {
    // circle
    const to_p = sub_2(p.pos, CONSTRAINT_CIRCLE_CENTER);
    const d = len_2(to_p);
    const r = CONSTRAINT_CIRCLE_RADIUS - p.radius
    if (d <= r) return;
    const dir = norm_2(to_p);
    p.pos = add_2(CONSTRAINT_CIRCLE_CENTER, scale_2(r, dir));
}

export function solve_collision(p1, p2) {
    const p1_p2 = sub_2(p1.pos, p2.pos);
    const d = len_2(p1_p2);
    const required_d = p1.radius + p2.radius;
    if (d >= required_d) return;
    const diff = required_d - d;
    const m1 = p1.radius / (p1.radius + p2.radius);
    const m2 = p2.radius / (p1.radius + p2.radius);
    const dir = norm_2(p1_p2);
    p1.pos = add_2(p1.pos, scale_2(m2 * diff, dir));
    p2.pos = add_2(p2.pos, scale_2(-m1 * diff, dir));
}
