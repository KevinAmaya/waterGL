function resizeCanvasToDisplaySize(canvas) {
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    const needResize = canvas.width !== displayWidth ||
        canvas.height !== displayHeight;
    if (needResize) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }
    return needResize;
}
function initCanvas(canvas) {
    const gl = canvas.getContext("webgl2");
    if (!gl) {
        console.error("No WebGL present");
        return;
    }
    const vertex_shader = gl.createShader(gl.VERTEX_SHADER);
    const vertex_shader_source = `#version 300 es 
    in vec4 pos_vec;
    void main() { 
      gl_Position = pos_vec;
    }
  `;
    gl.shaderSource(vertex_shader, vertex_shader_source);
    gl.compileShader(vertex_shader);
    const fragment_shader = gl.createShader(gl.FRAGMENT_SHADER);
    const fragment_shader_source = `#version 300 es
    precision highp float;

    out vec4 Color;
    void main() { 
      Color = vec4(0,0,5,0);
    }
  `;
    gl.shaderSource(fragment_shader, fragment_shader_source);
    gl.compileShader(fragment_shader);
    const program = gl.createProgram();
    gl.attachShader(program, fragment_shader);
    gl.attachShader(program, vertex_shader);
    gl.linkProgram(program);
    gl.useProgram(program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    const positions = [
        0, 0,
        0.4, 0.2,
        0.5, 0.7
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}
function initCanvaces() {
    Array.from(document.getElementsByClassName("water-canvas-js")).forEach(initCanvas);
}
export default initCanvaces;
