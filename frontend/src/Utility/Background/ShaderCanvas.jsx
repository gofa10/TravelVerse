import React, { useEffect, useRef } from 'react';

const fragmentShaderSource = `#version 300 es
precision highp float;

uniform float time;
uniform vec2 vp;

in vec2 uv;
out vec4 fragColor;

float rand(vec2 p) {
    return fract(sin(dot(p.xy, vec2(1., 300.))) * 43758.5453123);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = rand(i);
    float b = rand(i + vec2(1.0, 0.0));
    float c = rand(i + vec2(0.0, 1.0));
    float d = rand(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) +
        (c - a) * u.y * (1.0 - u.x) +
        (d - b) * u.x * u.y;
}

#define OCTAVES 5
float fbm(vec2 p) {
    float value = 0.;
    float amplitude = .4;
    for (int i = 0; i < OCTAVES; i++) {
        value += amplitude * noise(p);
        p *= 2.;
        amplitude *= .4;
    }
    return value;
}

void main() {
    vec2 p = uv.xy;
    p.x *= vp.x / vp.y;

    float speed = 0.5;
    float details = 3.0;
    float force = 0.5;
    float shift = 0.2;

    vec2 fast = vec2(p.x, p.y - time * speed) * details;
    float ns_a = fbm(fast);
    float ns_b = force * fbm(fast + ns_a + time) - shift;
    float ins = fbm(vec2(ns_b, ns_a));

    // خلفية السماء: من أزرق سماوي فاتح إلى أزرق أفتح جدًا
    vec3 skyColorBottom = vec3(0.7, 0.9, 1.0); // تحت
    vec3 skyColorTop = vec3(0.5, 0.8, 1.0);    // فوق (مش أسود بقى)
    vec3 sky = mix(skyColorBottom, skyColorTop);

    vec3 cloud = vec3(1.0); // سحب بيضاء
    vec3 c1 = mix(sky, cloud, ins + shift);

    fragColor = vec4(c1, 1.0);
}

`;

const vertexShaderSource = `#version 300 es
precision mediump float;
const vec2 positions[6] = vec2[6](
    vec2(-1.0, -1.0), vec2(1.0, -1.0), vec2(-1.0, 1.0),
    vec2(-1.0, 1.0), vec2(1.0, -1.0), vec2(1.0, 1.0)
);
out vec2 uv;
void main() {
    uv = positions[gl_VertexID];
    gl_Position = vec4(positions[gl_VertexID], 0.0, 1.0);
}
`;

const ShaderCanvas = () => {
    const canvasRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const gl = canvas.getContext('webgl2');
        if (!gl) return;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            gl.viewport(0, 0, canvas.width, canvas.height);
        };
        window.addEventListener('resize', resize);
        resize();

        const compileShader = (source, type) => {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error(gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        };

        const program = gl.createProgram();
        const vShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
        const fShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
        gl.attachShader(program, vShader);
        gl.attachShader(program, fShader);
        gl.linkProgram(program);
        gl.useProgram(program);

        const timeLoc = gl.getUniformLocation(program, 'time');
        const vpLoc = gl.getUniformLocation(program, 'vp');
        const startTime = Date.now();

        const render = () => {
            const time = (Date.now() - startTime) / 1000;
            gl.uniform1f(timeLoc, time);
            gl.uniform2f(vpLoc, canvas.width, canvas.height);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            requestAnimationFrame(render);
        };
        render();

        return () => window.removeEventListener('resize', resize);
    }, []);

    return <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100vh' }} />;
};

export default ShaderCanvas;
