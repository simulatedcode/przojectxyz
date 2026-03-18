// SAFE VHS MODULE (POSTPROCESSING ONLY)

float vhsHash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

float vhsScanlines(vec2 uv, float intensity, float density) {
    float s = sin(uv.y * density);
    s = s * 0.5 + 0.5;
    return 1.0 - s * intensity;
}

float vhsGrain(vec2 uv, float time, float intensity) {
    float n = vhsHash(uv * time);
    return (n - 0.5) * intensity;
}