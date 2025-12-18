
import React, { useEffect, useState } from 'react';

// صور فلکی با نمادهای حیوانی/انسانی و الگوی ستارگان (Data structure)
const constellations = [
    { id: 1, name: 'حمل', icon: '🐏', stars: [[0, -20], [10, -10], [-10, 0], [20, 10]] }, // Aries
    { id: 2, name: 'ثور', icon: '🐂', stars: [[-20, -10], [0, 0], [20, -5], [10, 10], [-10, 15]] }, // Taurus
    { id: 3, name: 'جوزا', icon: '👯', stars: [[-10, -20], [10, -20], [-10, 20], [10, 20], [0, 0]] }, // Gemini
    { id: 4, name: 'سرطان', icon: '🦀', stars: [[0, 0], [-10, 10], [10, 10], [0, -10], [-15, -5]] }, // Cancer
    { id: 5, name: 'اسد', icon: '🦁', stars: [[0, -20], [10, -10], [0, 0], [-15, 5], [15, 10], [5, 25]] }, // Leo
    { id: 6, name: 'سنبله', icon: '🧚‍♀️', stars: [[0, -25], [-10, -10], [10, 0], [-5, 15], [5, 25], [15, -15]] }, // Virgo (Maiden)
    { id: 7, name: 'میزان', icon: '⚖️', stars: [[0, -15], [-20, 10], [20, 10], [0, 5]] }, // Libra (Held by human usually)
    { id: 8, name: 'عقرب', icon: '🦂', stars: [[-20, -10], [-10, 0], [0, 5], [10, 10], [20, 0], [25, -15], [15, -20]] }, // Scorpio
    { id: 9, name: 'قوس', icon: '🏹', stars: [[-15, 15], [0, 0], [15, -15], [10, 0], [0, 10], [20, -10]] }, // Sagittarius (Archer)
    { id: 10, name: 'جدی', icon: '🐐', stars: [[-10, -15], [10, -15], [20, 0], [0, 15], [-20, 0]] }, // Capricorn
    { id: 11, name: 'دلو', icon: '🧜‍♂️', stars: [[-15, -20], [0, -10], [15, -20], [0, 0], [-10, 15], [10, 15]] }, // Aquarius (Water Bearer)
    { id: 12, name: 'حوت', icon: '🐟', stars: [[-20, 0], [-10, 10], [0, 0], [10, -10], [20, 0], [0, -20]] }, // Pisces
];

const ZodiacBackground: React.FC = () => {
    // ایجاد ستاره‌های پس‌زمینه تصادفی
    const [bgStars, setBgStars] = useState<{ x: number, y: number, s: number, o: number }[]>([]);

    useEffect(() => {
        const stars = [];
        for (let i = 0; i < 150; i++) {
            stars.push({
                x: Math.random() * 100, // percentage
                y: Math.random() * 100,
                s: Math.random() * 2 + 0.5, // size
                o: Math.random() * 0.7 + 0.3 // opacity
            });
        }
        setBgStars(stars);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 flex items-center justify-center">
            
            {/* Deep Space Gradient Layer */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1e1b4b_0%,_#0f172a_40%,_#000000_100%)] opacity-80"></div>

            {/* Static Background Stars Layer */}
            <div className="absolute inset-0">
                {bgStars.map((star, i) => (
                    <div 
                        key={i}
                        className="absolute rounded-full bg-white animate-pulse"
                        style={{
                            left: `${star.x}%`,
                            top: `${star.y}%`,
                            width: `${star.s}px`,
                            height: `${star.s}px`,
                            opacity: star.o,
                            animationDuration: `${Math.random() * 3 + 2}s`
                        }}
                    />
                ))}
            </div>

            {/* Rotating Celestial Sphere */}
            <div className="relative w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] animate-[spin_240s_linear_infinite]">
                <svg viewBox="0 0 1000 1000" className="w-full h-full overflow-visible">
                    <defs>
                        <filter id="glow-icon" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <radialGradient id="star-glow">
                            <stop offset="0%" stopColor="white" stopOpacity="1" />
                            <stop offset="100%" stopColor="white" stopOpacity="0" />
                        </radialGradient>
                    </defs>

                    {/* The Ecliptic Line (The path of the zodiac) */}
                    <circle cx="500" cy="500" r="380" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="5,5" />
                    <circle cx="500" cy="500" r="382" fill="none" stroke="rgba(99, 102, 241, 0.2)" strokeWidth="20" className="blur-xl" />

                    {/* Rendering Constellations */}
                    {constellations.map((constellation, index) => {
                        // Calculate position on the circle
                        const angleDeg = (index * 30); // 360 / 12 = 30 degrees per sign
                        const angleRad = (angleDeg - 90) * (Math.PI / 180); // -90 to start from top
                        const radius = 380;
                        const cx = 500 + radius * Math.cos(angleRad);
                        const cy = 500 + radius * Math.sin(angleRad);

                        return (
                            <g key={constellation.id} transform={`translate(${cx}, ${cy}) rotate(${angleDeg + 90})`}>
                                {/* 1. The Animal/Human Figure (Large, Faint, Atmospheric) */}
                                <text 
                                    x="0" 
                                    y="0" 
                                    fontSize="80" 
                                    textAnchor="middle" 
                                    dominantBaseline="central" 
                                    fill="rgba(255,255,255,0.15)"
                                    style={{ filter: 'url(#glow-icon)' }}
                                    className="select-none"
                                >
                                    {constellation.icon}
                                </text>

                                {/* 2. The Constellation Lines (Connecting Stars) */}
                                <g opacity="0.6">
                                    {/* Draw lines between stars sequentially for simplicity */}
                                    <path 
                                        d={`M ${constellation.stars.map(s => s.join(',')).join(' L ')}`} 
                                        stroke="cyan" 
                                        strokeWidth="1.5" 
                                        fill="none" 
                                        strokeOpacity="0.6"
                                    />
                                    
                                    {/* Draw Stars at nodes */}
                                    {constellation.stars.map((star, i) => (
                                        <circle 
                                            key={i} 
                                            cx={star[0]} 
                                            cy={star[1]} 
                                            r={Math.random() * 2 + 1.5} 
                                            fill="white" 
                                            filter="url(#glow-icon)"
                                        />
                                    ))}
                                </g>

                                {/* 3. Sign Name (Optional, small) */}
                                <text 
                                    x="0" 
                                    y="50" 
                                    fontSize="12" 
                                    textAnchor="middle" 
                                    fill="rgba(165, 180, 252, 0.6)" 
                                    className="font-tanha"
                                    transform="rotate(180)" // Rotate text back to be readable from center perspective if needed, but here kept aligned with ring
                                >
                                    {constellation.name}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>
            
            {/* Cloud/Nebula Overlays for atmosphere */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-purple-900/10 blur-[100px] rounded-full mix-blend-screen"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-900/10 blur-[100px] rounded-full mix-blend-screen"></div>

        </div>
    );
};

export default ZodiacBackground;
