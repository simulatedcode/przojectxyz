'use client'

import { useSceneSegment } from '@/core/scene/useSceneSegment'
import { useTextAnimation } from '@/ui/hooks/useTextAnimation'
import SplitText from '@/ui/components/SplitText'

export default function ProjectsText() {
    const { progress, visibility } = useSceneSegment(0.6, 1.0)
    const containerRef = useTextAnimation(progress, visibility)

    return (
        <div
            ref={containerRef}
            className="section"
        >
            <h1 className="text-6xl font-black mb-4 tracking-tighter">
              <SplitText text="SELECTED WORKS" />
            </h1>
            <p className="text-xl uppercase tracking-[0.3em] font-light opacity-80">
              <SplitText text="Engineering digital landscapes" />
            </p>
        </div>
    )
}