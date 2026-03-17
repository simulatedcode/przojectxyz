'use client'

import IntroText from '@/ui/sections/IntroText'
import HeroText from '@/ui/sections/HeroText'
import ProjectsText from '@/ui/sections/ProjectsText'


export default function Overlay() {
    return (
        <div className="overlay">
            <IntroText />
            <HeroText />
            <ProjectsText />
        </div>
    )
}