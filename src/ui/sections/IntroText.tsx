'use client'

import { useSegment } from '@/core/timeline/useKeyframe'
import { useTextAnimation } from '@/ui/hooks/useTextAnimation'
import { useSceneStore } from '@/store/useSceneStore'
import SplitText from '@/ui/components/SplitText'

/**
 * 📝 IntroText
 * Responsive UI layer for the Intro section.
 */
export default function IntroText() {
    const { progress, visibility } = useSegment(0.0, 0.3)
    const containerRef = useTextAnimation(progress, visibility)
    const trackingData = useSceneStore((state) => state.introTracking)

    return (
        <>
            <div
                ref={containerRef}
                className="section align-left"
            >
                <div className="mb-2 opacity-40 font-mono text-[10px] tracking-[0.5em]">SYSTEM_BOOT // INITIALIZING</div>
                <h1 className="text-8xl font-black mb-4 tracking-tighter">
                    <SplitText text="WELCOME" />
                </h1>
                <p className="text-xl uppercase tracking-[0.3em] font-light opacity-60">
                    <SplitText text="Immersive visualization" />
                </p>
            </div>

            {/* 🛸 HUD Tethered Label */}
            <div
                className="absolute pointer-events-none z-50 flex flex-col items-start gap-1"
                style={{
                    transform: `translate3d(${trackingData.x + 40}px, ${trackingData.y - 40}px, 0)`,
                    display: trackingData.visible ? 'flex' : 'none',
                    opacity: visibility
                }}
            >
                {/* 📐 Lead Line (Tether) */}
                <div className="w-px h-10 bg-white/20 -translate-x-10 translate-y-10 rotate-45 mix-blend-exclusion" />
                <div className="flex items-center gap-3 mix-blend-exclusion">
                    <div className="w-2 h-2 border border-white/40 rotate-45" />
                    <div className="text-[10px] font-mono tracking-widest text-white/80 uppercase">
                        Intro_Mesh_Sync
                    </div>
                </div>
                <div className="text-[9px] font-mono text-white/40 pl-5">
                    POS: {trackingData.x.toFixed(0)}, {trackingData.y.toFixed(0)}
                </div>
            </div>
        </>
    )
}