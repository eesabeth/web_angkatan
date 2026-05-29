'use client'
import React, { useState } from 'react'

const colorData = [
  { id: 1, name: 'Star Sapphire', meaning: 'Kepercayaan', bgClass: 'bg-blue-cs-30', textClass: 'text-white' },
  { id: 2, name: 'Nature Blue', meaning: 'Keterbukaan', bgClass: 'bg-blue-cs-20', textClass: 'text-white' },
  { id: 3, name: 'Scintillating Turquoise', meaning: 'Ketenangan', bgClass: 'bg-blue-cs-10', textClass: 'text-white' },
  { id: 4, name: 'Light Gold Matte', meaning: 'Optimisme dan Harapan', bgClass: 'bg-yellow-cs-20', textClass: 'text-white' },
  { id: 5, name: 'Dixie', meaning: 'Semangat dan kehangatan', bgClass: 'bg-yellow-cs-40', textClass: 'text-white' },
  { id: 6, name: 'Chosen Blue', meaning: 'Keteguhan', bgClass: 'bg-blue-cs-40', textClass: 'text-white' },
]

const ColorPallete = () => {
  const [activeId, setActiveId] = useState<number | null>(null)

  const totalItems = colorData.length
  const wActive = 60
  const wInactive = 8
  const wDefault = 100 / totalItems

  return (
    <section className="py-16 px-4 flex flex-col items-center w-full">
      <h2 className="text-3xl md:text-5xl font-rubikone mb-12 text-center text-white relative z-10">
        Color Pallete
      </h2>

      <div 
        className="relative w-full max-w-[300px] md:max-w-5xl h-[600px] md:h-[400px] rounded-[30px] md:rounded-[40px] overflow-hidden cursor-pointer shadow-none bg-neutral-cs-100 flex isolate transform-gpu"
        style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
      >
        {colorData.map((color, i) => {
          const isActive = activeId === color.id
          const isDefault = activeId === null

          const activeIndex = activeId ? colorData.findIndex(c => c.id === activeId) : -1

          let leftVal = 0
          let topVal = 0
          let wVisibleSize = 0

          if (isDefault) {
            leftVal = i * wDefault
            topVal = i * wDefault
            wVisibleSize = wDefault
          } else {
            leftVal = i <= activeIndex ? i * wInactive : wActive + (i - 1) * wInactive
            topVal = i <= activeIndex ? i * wInactive : wActive + (i - 1) * wInactive
            wVisibleSize = isActive ? wActive : wInactive
          }

          const isLast = i === totalItems - 1

          return (
            <div
              key={color.id}
              onClick={() => setActiveId(isActive ? null : color.id)}
              className={`absolute transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                left-0 top-[var(--mobile-pos)]
                md:top-0 md:left-[var(--desktop-pos)]
                ${isLast 
                  ? 'h-[calc(100%-var(--mobile-pos))] md:h-full w-full md:w-[calc(100%-var(--desktop-pos))]' 
                  : 'h-[calc(var(--mobile-size)+80px)] md:h-full w-full md:w-[calc(var(--desktop-size)+80px)]'
                }
                ${color.bgClass} 
                ${color.textClass} 
                ${i === 0 || isDefault ? 'rounded-none' : 'rounded-t-[30px] md:rounded-t-none md:rounded-l-[40px] shadow-[0_-5px_15px_rgba(0,0,0,0.1)] md:shadow-[-10px_0_20px_rgba(0,0,0,0.1)]'}
              `}
              style={{
                zIndex: i + 1,
                '--mobile-pos': `${topVal}%`,
                '--desktop-pos': `${leftVal}%`,
                '--mobile-size': `${wVisibleSize}%`,
                '--desktop-size': `${wVisibleSize}%`
              } as React.CSSProperties}
            >
              <div 
                 className={`absolute top-0 left-0 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                   w-full ${isLast ? 'h-full' : 'h-[calc(100%-80px)]'}
                   md:h-full ${isLast ? 'md:w-full' : 'md:w-[calc(100%-80px)]'}
                 `}
              >
                <span className={`whitespace-nowrap font-bold tracking-widest origin-center absolute transition-all duration-500
                  text-sm md:text-lg
                  md:transform md:-rotate-90
                  ${isActive ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100 delay-200'}
                `}>
                  {color.name}
                </span>

                <div 
                   className={`flex flex-col items-center justify-center absolute inset-0 w-full h-full px-6 md:px-12 text-center transition-all duration-500 pointer-events-none
                    ${isActive ? 'opacity-100 scale-100 delay-300' : 'opacity-0 scale-90'}
                   `}
                >
                    <span className="text-sm md:text-lg font-bold tracking-[0.2em] uppercase mb-2 opacity-90 drop-shadow-sm">
                      {color.name}
                    </span>
                    <h3 className="text-2xl md:text-4xl lg:text-5xl font-normal leading-snug md:leading-tight max-w-2xl">
                      {color.meaning}
                    </h3>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default ColorPallete
