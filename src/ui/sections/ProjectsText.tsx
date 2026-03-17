'use client'

import { useSegment } from '@/core/timeline/useKeyframe'
import { useTextAnimation } from '@/ui/hooks/useTextAnimation'
import { useSceneStore } from '@/store/useSceneStore'
import SplitText from '@/ui/components/SplitText'

/**
 * 🛠 ProjectsText
 * Responsive UI layer for the Selected Works section.
 */
export default function ProjectsText() {
    const { progress, visibility } = useSegment(0.6, 1.0)
    const containerRef = useTextAnimation(progress, visibility)
    const trackingData = useSceneStore((state) => state.projectsTracking)

    return (
        <>
            <div
                ref={containerRef}
                className="section align-left"
            >
                <h1 className="text-8xl font-black mb-4 tracking-tighter">
                    <SplitText text="SELECTED" /><br />
                    <SplitText text="WORKS" />
                </h1>
                <p className="text-xl uppercase tracking-[0.3em] font-light opacity-60">
                    <SplitText text="Engineering digital landscapes" />
                </p>
            </div>

            {/* 🛸 HUD Tethered Label */}
            <div
                className="absolute pointer-events-none z-50 flex flex-col items-start gap-1"
                style={{
                    transform: `translate3d(${trackingData.x + 40}px, ${trackingData.y + 40}px, 0)`,
                    display: trackingData.visible ? 'flex' : 'none',
                    opacity: visibility
                }}
            >
                {/* 📐 Lead Line (Tether) */}
                <div className="w-px h-10 bg-white/20 -translate-x-10 -translate-y-10 -rotate-45" />

                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 border border-white/40 rotate-45" />
                    <div className="text-[10px] font-mono tracking-widest text-white/80 uppercase">
                        Archive_Node_01
                    </div>
                </div>
                <div className="text-[9px] font-mono text-white/40 pl-5">
                    STATUS: RETRIEVING_DATA
                </div>
            </div>

            {/* 📟 HUD Metadata: Locked to Top Left */}
            <div
                className="fixed px-4 top-12 opacity-40 font-mono text-[8px] tracking-[0.5em] z-50"
                style={{ opacity: visibility * 0.4 }}
            >
                WORK_ARCHIVE // DATA_STREAM
            </div>
        </>
    )
}