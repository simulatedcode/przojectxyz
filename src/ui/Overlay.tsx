'use client'

import { useTimeline } from '@/core/timeline/useTimeline'
import IntroText from '@/ui/sections/IntroText'
import HeroText from '@/ui/sections/HeroText'
import ProjectsText from '@/ui/sections/ProjectsText'

export default function Overlay() {
    const progress = useTimeline((state) => state.progress)
    const percentage = Math.round(progress * 100)

    return (
        <div className="overlay">
            {/* 🏁 SCANLINE / DOT OVERLAY */}
            <div className="dot-overlay" />

            {/* 🛡 GLOBAL HUD FRAME */}
            <div className="hud-corner tl" />
            <div className="hud-corner tr" />
            <div className="hud-corner bl" />
            <div className="hud-corner br" />

            {/* 📑 SECTIONS */}
            <IntroText />
            <HeroText />
            <ProjectsText />

            {/* 📟 GLOBAL STATUS BAR */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-8 opacity-20 font-mono text-[9px] tracking-[0.4em]">
                <div>STATUS: ONLINE</div>
                <div className="w-12 h-px bg-white" />
                <div>SYNC: SECTOR_O3</div>
                <div className="w-12 h-px bg-white" />
                <div>BUFFER: {percentage}%</div>
            </div>
        </div>
    )
}