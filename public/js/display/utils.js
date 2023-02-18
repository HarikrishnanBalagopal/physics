import { CONSTRAINT_CIRCLE_CENTER, CONSTRAINT_CIRCLE_RADIUS, H, PI, W } from "../common/globals.js";

export const toHSL = (h) => `hsl(${h} 100% 50%)`;

export function draw_background(ctx) {
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, W, H);
    const [x, y] = CONSTRAINT_CIRCLE_CENTER;
    // draw_circle(ctx, x, y, CONSTRAINT_CIRCLE_RADIUS);
    ctx.restore();
}

export function draw_circle(ctx, x, y, r, color = 'white') {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * PI);
    ctx.fill();
    ctx.restore();
}

export function draw_particle(ctx, p) {
    draw_circle(ctx, p.pos[0], p.pos[1], p.radius, toHSL(p.color));
}
