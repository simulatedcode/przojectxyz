import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, RefObject } from 'react'
import * as THREE from 'three'

/**
 * Super Premium 3D-to-Screen Projection Hook (Producer)
 * Projects a 3D object's world position to 2D screen coordinates (pixels).
 * MUST BE USED INSIDE THE CANVAS COMPONENT tree.
 * 
 * @param meshRef - Reference to the 3D mesh to track.
 * @param onUpdate - Callback receiving the screen coordinates and visibility.
 */
export function useWorldToScreen(
    meshRef: RefObject<THREE.Object3D>,
    onUpdate: (data: { x: number; y: number; visible: boolean }) => void
) {
    const { camera, size } = useThree()
    const vector = useMemo(() => new THREE.Vector3(), [])

    useFrame(() => {
        if (!meshRef.current) {
            onUpdate({ x: 0, y: 0, visible: false })
            return
        }

        // 1. Get the world position of the mesh
        vector.setFromMatrixPosition(meshRef.current.matrixWorld)

        // 2. Project the world position to Normalized Device Coordinates (NDC)
        vector.project(camera)

        // 3. Frustum/Occlusion check
        const isBehindCamera = vector.z > 1
        const isInView = Math.abs(vector.x) <= 1.2 && Math.abs(vector.y) <= 1.2

        if (isBehindCamera || !isInView) {
            onUpdate({ x: 0, y: 0, visible: false })
            return
        }

        // 4. Map NDC to screen pixels
        const x = (vector.x * 0.5 + 0.5) * size.width
        const y = (vector.y * -0.5 + 0.5) * size.height

        // 5. Push high-frequency updates
        onUpdate({ x, y, visible: true })
    })
}
