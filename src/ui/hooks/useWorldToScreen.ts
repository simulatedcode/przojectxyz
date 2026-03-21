import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef, RefObject } from 'react'
import * as THREE from 'three'

/**
 * 3D-to-Screen Projection Hook
 * Projects a 3D object's world position to 2D screen coordinates.
 * Only triggers onUpdate when values change (reduces React re-renders).
 */
export function useWorldToScreen(
    meshRef: RefObject<THREE.Object3D | null>,
    onUpdate: (data: { x: number; y: number; visible: boolean }) => void,
    threshold = 0.5
) {
    const { camera, size } = useThree()
    const vector = useMemo(() => new THREE.Vector3(), [])
    const prevData = useRef({ x: 0, y: 0, visible: false })

    useFrame(() => {
        if (!meshRef.current) {
            if (prevData.current.visible !== false || prevData.current.x !== 0) {
                prevData.current = { x: 0, y: 0, visible: false }
                onUpdate({ x: 0, y: 0, visible: false })
            }
            return
        }

        vector.setFromMatrixPosition(meshRef.current.matrixWorld)
        vector.project(camera)

        const isBehindCamera = vector.z > 1
        const isInView = Math.abs(vector.x) <= 1.2 && Math.abs(vector.y) <= 1.2

        if (isBehindCamera || !isInView) {
            if (prevData.current.visible !== false || prevData.current.x !== 0) {
                prevData.current = { x: 0, y: 0, visible: false }
                onUpdate({ x: 0, y: 0, visible: false })
            }
            return
        }

        const x = (vector.x * 0.5 + 0.5) * size.width
        const y = (vector.y * -0.5 + 0.5) * size.height

        const hasChanged =
            Math.abs(x - prevData.current.x) > threshold ||
            Math.abs(y - prevData.current.y) > threshold ||
            prevData.current.visible !== true

        if (hasChanged) {
            prevData.current = { x, y, visible: true }
            onUpdate({ x, y, visible: true })
        }
    })
}
