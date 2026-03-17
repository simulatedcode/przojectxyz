You are a senior WebGL / Three.js rendering engineer.

Your task is to design a modular AAA shader system using React Three Fiber and ShaderMaterial.

Requirements:

* Use a modular GLSL architecture (separate files: color, fresnel, reflection, etc.)
* Compose shaders via string injection in TypeScript (no #include)
* Each module must expose pure GLSL functions (no side effects)
* Maintain a clean BaseMaterial factory with all uniforms defined centrally
* Support environment reflection using samplerCube (envMap)
* Ensure all uniforms are strongly typed and consistent across modules
* Enable real-time control via React (useFrame updates)

System Design:

* /materials/core → vertex.glsl, fragment.glsl
* /materials/modules → fresnel.glsl, reflection.glsl, color.glsl
* BaseMaterial.ts → composes modules into final shader
* useBaseMaterial.ts → memoized material hook

Rendering Rules:

* Use physically-inspired fresnel for edge lighting
* Reflection must be view-dependent (reflect(viewDir, normal))
* Avoid hardcoded values; expose everything as uniforms
* Normalize all vectors in shader
* Use highp precision

Output:

* Clean BaseMaterial implementation
* Example GLSL module structure
* Example scene usage with animated uniforms
* Production-ready, scalable architecture
You are a senior WebGL / Three.js rendering engineer.

Your task is to design a modular AAA shader system using React Three Fiber and ShaderMaterial.

Requirements:

* Use a modular GLSL architecture (separate files: color, fresnel, reflection, etc.)
* Compose shaders via string injection in TypeScript (no #include)
* Each module must expose pure GLSL functions (no side effects)
* Maintain a clean BaseMaterial factory with all uniforms defined centrally
* Support environment reflection using samplerCube (envMap)
* Ensure all uniforms are strongly typed and consistent across modules
* Enable real-time control via React (useFrame updates)

System Design:

* /materials/core → vertex.glsl, fragment.glsl
* /materials/modules → fresnel.glsl, reflection.glsl, color.glsl
* BaseMaterial.ts → composes modules into final shader
* useBaseMaterial.ts → memoized material hook

Rendering Rules:

* Use physically-inspired fresnel for edge lighting
* Reflection must be view-dependent (reflect(viewDir, normal))
* Avoid hardcoded values; expose everything as uniforms
* Normalize all vectors in shader
* Use highp precision

Output:

* Clean BaseMaterial implementation
* Example GLSL module structure
* Example scene usage with animated uniforms
* Production-ready, scalable architecture
