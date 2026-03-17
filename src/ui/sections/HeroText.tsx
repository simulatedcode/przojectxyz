'use client'

import { useSceneSegment } from '@/core/scene/useSceneSegment'
import { useTextAnimation } from '@/ui/hooks/useTextAnimation'
import { useSceneStore } from '@/store/useSceneStore'
import SplitText from '@/ui/components/SplitText'

export default function HeroText() {
    const { progress, visibility } = useSceneSegment(0.3, 0.6)
    const containerRef = useTextAnimation(progress, visibility)
    const trackingData = useSceneStore((state) => state.heroTracking)

    return (
        <>
            <div
                ref={containerRef}
                className="section"
            >
                <h1 className="text-6xl font-black mb-4 tracking-tighter">
                  <SplitText text="CREATIVE DEVELOPER" />
                </h1>
                <p className="text-xl uppercase tracking-[0.3em] font-light opacity-80">
                  <SplitText text="Building real-time experiences" />
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
                    HERO // SYSTEM_STABLE
                </div>
            </div>
        </>
    )
}