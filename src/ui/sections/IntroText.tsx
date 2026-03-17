'use client'

import { useSceneSegment } from '@/core/scene/useSceneSegment'
import { useTextAnimation } from '@/ui/hooks/useTextAnimation'
import { useWorldToScreen } from '@/ui/hooks/useWorldToScreen'
import { useSceneStore } from '@/store/useSceneStore'
import SplitText from '@/ui/components/SplitText'

export default function IntroText() {
    const { progress, visibility } = useSceneSegment(0.0, 0.3)
    const containerRef = useTextAnimation(progress, visibility)

    // 🎯 3D Tracking Logic
    const trackingData = useSceneStore((state) => state.introTracking)

    return (
        <>
            <div
                ref={containerRef}
                className="section"
            >
                <h1 className="text-6xl font-black mb-4 tracking-tighter">
                    <SplitText text="WELCOME" />
                </h1>
                <p className="text-xl uppercase tracking-[0.3em] font-light opacity-80">
                    <SplitText text="Immersive experience" />
                </p>
            </div>

            {/* 3D Tracking Label */}
            <div
                className="absolute pointer-events-none z-50 flex items-center gap-4 whitespace-nowrap"
                style={{
                    transform: `translate3d(${trackingData.x}px, ${trackingData.y}px, 0) translate(-50%, -50%)`,
                    display: trackingData.visible ? 'flex' : 'none',
                    opacity: visibility
                }}
            >
                <div className="w-8 h-px bg-white opacity-40" />
                <div className="text-[10px] font-mono tracking-widest text-white/60">
                    SEC_01 // 3D_TRACK_ACTIVE
                </div>
            </div>
        </>
    )
}