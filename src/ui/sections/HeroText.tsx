'use client'

import { useSegment } from '@/core/timeline/useKeyframe'
import { useTextAnimation } from '@/ui/hooks/useTextAnimation'
import { useSceneStore } from '@/store/useSceneStore'
import SplitText from '@/ui/components/SplitText'

/**
 * 👑 HeroText 
 * Responsive UI layer for the Hero section.
 */
export default function HeroText() {
    const { progress, visibility } = useSegment(0.3, 0.6)
    const containerRef = useTextAnimation(progress, visibility)
    const trackingData = useSceneStore((state) => state.heroTracking)

    return (
        <>
            <div
                ref={containerRef}
                className="section align-right"
            >
                <h1 className="text-8xl font-black mb-4 tracking-tighter">
                    <SplitText text="CREATIVE" /><br />
                    <SplitText text="DEVELOPER" />
                </h1>
                <p className="text-xl uppercase tracking-[0.3em] font-light opacity-60">
                    <SplitText text="Building real-time experiences" />
                </p>
            </div>

            {/* 🛸 HUD Tethered Label */}
            <div
                className="absolute pointer-events-none z-50 flex flex-col items-end gap-1"
                style={{
                    transform: `translate3d(${trackingData.x - 40}px, ${trackingData.y - 40}px, 0)`,
                    display: trackingData.visible ? 'flex' : 'none',
                    opacity: visibility
                }}
            >
                {/* 📐 Lead Line (Tether) */}
                <div className="w-px h-10 bg-white/20 translate-x-10 translate-y-10 -rotate-45" />

                <div className="flex items-center gap-3">
                    <div className="text-[10px] font-mono tracking-widest text-white/80 uppercase">
                        Hero_Core_Sync
                    </div>
                    <div className="w-2 h-2 border border-white/40 rotate-45" />
                </div>
                <div className="text-[9px] font-mono text-white/40 pr-5">
                    COORD: {trackingData.x.toFixed(0)}//Y_{trackingData.y.toFixed(0)}
                </div>
            </div>

            {/* 📟 HUD Metadata: Locked to Top Left */}
            <div
                className="fixed px-4 top-12 opacity-40 font-mono text-[8px] tracking-[0.5em] z-50"
                style={{ opacity: visibility * 0.4 }}
            >
                MODULE_LOAD // EXECUTING
            </div>
        </>
    )
}