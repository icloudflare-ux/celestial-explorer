
import React, { useEffect, useState } from 'react';
import { useTimeZone } from '../contexts/TimeZoneContext';

// صور فلکی با نمادهای حیوانی/انسانی و الگوی ستارگان
const constellations = [
    { id: 1, name: 'حمل', icon: '🐏', stars: [[0, -20], [10, -10], [-10, 0], [20, 10]] },
    { id: 2, name: 'ثور', icon: '🐂', stars: [[-20, -10], [0, 0], [20, -5], [10, 10], [-10, 15]] },
    { id: 3, name: 'جوزا', icon: '👯', stars: [[-10, -20], [10, -20], [-10, 20], [10, 20], [0, 0]] },
    { id: 4, name: 'سرطان', icon: '🦀', stars: [[0, 0], [-10, 10], [10, 10], [0, -10], [-15, -5]] },
    { id: 5, name: 'اسد', icon: '🦁', stars: [[0, -20], [10, -10], [0, 0], [-15, 5], [15, 10], [5, 25]] },
    { id: 6, name: 'سنبله', icon: '🧚‍♀️', stars: [[0, -25], [-10, -10], [10, 0], [-5, 15], [5, 25], [15, -15]] },
    { id: 7, name: 'میزان', icon: '⚖️', stars: [[0, -15], [-20, 10], [20, 10], [0, 5]] },
    { id: 8, name: 'عقرب', icon: '🦂', stars: [[-20, -10], [-10, 0], [0, 5], [10, 10], [20, 0], [25, -15], [15, -20]] },
    { id: 9, name: 'قوس', icon: '🏹', stars: [[-15, 15], [0, 0], [15, -15], [10, 0], [0, 10], [20, -10]] },
    { id: 10, name: 'جدی', icon: '🐐', stars: [[-10, -15], [10, -15], [20, 0], [0, 15], [-20, 0]] },
    { id: 11, name: 'دلو', icon: '🧜‍♂️', stars: [[-15, -20], [0, -10], [15, -20], [0, 0], [-10, 15], [10, 15]] },
    { id: 12, name: 'حوت', icon: '🐟', stars: [[-20, 0], [-10, 10], [0, 0], [10, -10], [20, 0], [0, -20]] },
];

// داده‌های سیارات منظومه شمسی (شعاع مدار، رنگ، سایز، سرعت چرخش)
const planets = [
    { name: 'عطارد', r: 55, size: 4, color: '#9ca3af', speed: 8 }, // Mercury
    { name: 'زهره', r: 85, size: 7, color: '#fbbf24', speed: 15 }, // Venus
    { name: 'زمین', r: 120, size: 7, color: '#3b82f6', speed: 25 }, // Earth
    { name: 'مریخ', r: 155, size: 5, color: '#ef4444', speed: 40 }, // Mars
    { name: 'مشتری', r: 210, size: 14, color: '#d97706', speed: 80 }, // Jupiter
    { name: 'زحل', r: 270, size: 12, color: '#fcd34d', speed: 150, hasRing: true }, // Saturn
    { name: 'اورانوس', r: 320, size: 9, color: '#22d3ee', speed: 220 }, // Uranus
    { name: 'نپتون', r: 360, size: 9, color: '#3b82f6', speed: 300 }, // Neptune
];

const CosmicClock: React.FC = () => {
    const { formattedTimeZone } = useTimeZone();
    const [time, setTime] = useState(new Date());
    const [mounted, setMounted] = useState(false);
    const [bgStars, setBgStars] = useState<{ x: number, y: number, r: number, opacity: number }[]>([]);

    useEffect(() => {
        setMounted(true);
        // Generate static stars for the clock face background
        const stars = [];
        for (let i = 0; i < 100; i++) {
            const r = Math.random() * 480; 
            const theta = Math.random() * 2 * Math.PI;
            stars.push({
                x: 500 + r * Math.cos(theta),
                y: 500 + r * Math.sin(theta),
                r: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.8 + 0.2
            });
        }
        setBgStars(stars);

        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const getTimeParts = () => {
        try {
            const format = new Intl.DateTimeFormat('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: false,
                timeZone: formattedTimeZone
            });
            const parts = format.formatToParts(time);
            const getPart = (type: string) => parseInt(parts.find(p => p.type === type)?.value || '0', 10);
            return { h: getPart('hour'), m: getPart('minute'), s: getPart('second') };
        } catch (e) {
            return { h: time.getHours(), m: time.getMinutes(), s: time.getSeconds() };
        }
    };

    const { h, m, s } = getTimeParts();

    const secondAngle = s * 6;
    const minuteAngle = m * 6 + s * 0.1;
    const hourAngle = (h % 12) * 30 + m * 0.5;

    if (!mounted) return null;

    return (
        <div className="relative w-full max-w-[650px] aspect-square mx-auto mb-12 select-none flex items-center justify-center">
            
            {/* Outer Glow */}
            <div className="absolute inset-4 rounded-full bg-indigo-500/5 blur-3xl animate-pulse"></div>

            <svg viewBox="0 0 1000 1000" className="w-full h-full overflow-visible drop-shadow-2xl">
                <defs>
                    <filter id="glow-icon" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    
                    <radialGradient id="deepSpaceFace" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="40%" stopColor="#0f172a" stopOpacity="0.9" />
                        <stop offset="90%" stopColor="#000000" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="#1e1b4b" stopOpacity="1" />
                    </radialGradient>

                    <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#fef08a" />
                        <stop offset="50%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#b45309" stopOpacity="0.8" />
                    </radialGradient>

                    <linearGradient id="goldHand" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#fbbf24" />
                        <stop offset="50%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#fbbf24" />
                    </linearGradient>

                    <linearGradient id="silverHand" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#e2e8f0" />
                        <stop offset="50%" stopColor="#94a3b8" />
                        <stop offset="100%" stopColor="#e2e8f0" />
                    </linearGradient>
                    
                    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.7"/>
                    </filter>
                </defs>

                {/* --- 1. Background Sphere --- */}
                <circle cx="500" cy="500" r="480" fill="url(#deepSpaceFace)" stroke="#312e81" strokeWidth="2" />
                <circle cx="500" cy="500" r="470" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

                {/* --- 2. Background Stars --- */}
                <g>
                    {bgStars.map((star, i) => (
                        <circle 
                            key={i} 
                            cx={star.x} 
                            cy={star.y} 
                            r={star.r} 
                            fill="white" 
                            opacity={star.opacity} 
                        />
                    ))}
                </g>

                {/* --- 3. The Solar System (Planets & Orbits) --- */}
                <g>
                    {planets.map((planet, index) => (
                        <g key={planet.name}>
                            {/* Orbit Path */}
                            <circle 
                                cx="500" cy="500" 
                                r={planet.r} 
                                fill="none" 
                                stroke="rgba(255,255,255,0.08)" 
                                strokeWidth="1" 
                                strokeDasharray={index % 2 === 0 ? "0" : "4 4"}
                            />
                            {/* Planet Animation Container */}
                            <g 
                                style={{ 
                                    animation: `spin ${planet.speed}s linear infinite`,
                                    transformOrigin: '500px 500px'
                                }}
                            >
                                <g transform={`translate(500, ${500 - planet.r})`}>
                                    {/* The Planet */}
                                    <circle r={planet.size} fill={planet.color} filter="url(#glow-icon)" />
                                    {/* Saturn's Ring */}
                                    {planet.hasRing && (
                                        <ellipse 
                                            cx="0" cy="0" 
                                            rx={planet.size * 2} ry={planet.size * 0.5} 
                                            fill="none" 
                                            stroke="#fcd34d" 
                                            strokeWidth="2" 
                                            transform="rotate(-20)"
                                            opacity="0.8"
                                        />
                                    )}
                                </g>
                            </g>
                        </g>
                    ))}
                </g>

                {/* --- 4. Rotating Constellation Ring (The Zodiac) --- */}
                {/* Positioned outside the main planetary area but inside the numbers */}
                <g className="animate-[spin_240s_linear_infinite]" style={{ transformOrigin: '500px 500px' }}>
                    <circle cx="500" cy="500" r="400" fill="none" stroke="rgba(99, 102, 241, 0.1)" strokeWidth="60" className="blur-sm" />
                    
                    {constellations.map((constellation, index) => {
                        const angleDeg = (index * 30);
                        const angleRad = (angleDeg - 90) * (Math.PI / 180);
                        const radius = 400; // Push constellations out a bit to clear planets
                        const cx = 500 + radius * Math.cos(angleRad);
                        const cy = 500 + radius * Math.sin(angleRad);

                        return (
                            <g key={constellation.id} transform={`translate(${cx}, ${cy}) rotate(${angleDeg + 90})`}>
                                {/* Icon */}
                                <text 
                                    x="0" y="0" 
                                    fontSize="50" 
                                    textAnchor="middle" 
                                    dominantBaseline="central" 
                                    fill="rgba(255,255,255,0.3)"
                                    style={{ filter: 'url(#glow-icon)' }}
                                >
                                    {constellation.icon}
                                </text>
                                {/* Stars Connection */}
                                <path 
                                    d={`M ${constellation.stars.map(s => s.join(',')).join(' L ')}`} 
                                    stroke="cyan" strokeWidth="1" fill="none" strokeOpacity="0.3"
                                />
                                {constellation.stars.map((star, i) => (
                                    <circle key={i} cx={star[0]} cy={star[1]} r={1.5} fill="white" />
                                ))}
                            </g>
                        );
                    })}
                </g>

                {/* --- 5. Clock Markers (Numbers/Ticks) --- */}
                {Array.from({ length: 12 }).map((_, i) => {
                    const angle = (i * 30) * (Math.PI / 180);
                    const r = 440;
                    const x = 500 + r * Math.sin(angle);
                    const y = 500 - r * Math.cos(angle);
                    const persianNum = new Intl.NumberFormat('fa-IR').format(i === 0 ? 12 : i);
                    return (
                        <g key={i}>
                            <text 
                                x={x} y={y} 
                                textAnchor="middle" 
                                dominantBaseline="central" 
                                fill="#fbbf24" 
                                fontSize="32" 
                                fontFamily="Lalezar"
                                style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}
                            >
                                {persianNum}
                            </text>
                            {/* Ticks between numbers */}
                            {Array.from({length: 4}).map((_, j) => {
                                const subAngle = angle + ((j + 1) * 6 * Math.PI / 180);
                                const x1 = 500 + 460 * Math.sin(subAngle);
                                const y1 = 500 - 460 * Math.cos(subAngle);
                                const x2 = 500 + 470 * Math.sin(subAngle);
                                const y2 = 500 - 470 * Math.cos(subAngle);
                                return <line key={`${i}-${j}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                            })}
                        </g>
                    );
                })}

                {/* --- 6. The Sun (Central Hub) --- */}
                <circle cx="500" cy="500" r="25" fill="url(#sunGradient)" filter="url(#glow-icon)" />
                <circle cx="500" cy="500" r="28" fill="none" stroke="rgba(251, 191, 36, 0.3)" strokeWidth="2" className="animate-pulse" />

                {/* --- 7. Hands (The Clock Mechanism) --- */}
                
                {/* Hour Hand */}
                <g transform={`rotate(${hourAngle}, 500, 500)`} filter="url(#shadow)">
                    <circle cx="500" cy="560" r="10" fill="url(#goldHand)" />
                    <line x1="500" y1="500" x2="500" y2="560" stroke="url(#goldHand)" strokeWidth="4" />
                    <path d="M500 500 L485 450 L500 280 L515 450 Z" fill="url(#goldHand)" />
                    <line x1="500" y1="500" x2="500" y2="280" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
                </g>

                {/* Minute Hand */}
                <g transform={`rotate(${minuteAngle}, 500, 500)`} filter="url(#shadow)">
                    <circle cx="500" cy="580" r="8" fill="url(#silverHand)" />
                    <line x1="500" y1="500" x2="500" y2="580" stroke="url(#silverHand)" strokeWidth="3" />
                    <path d="M500 500 L490 450 L500 180 L510 450 Z" fill="url(#silverHand)" />
                    <line x1="500" y1="450" x2="500" y2="200" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
                </g>

                {/* Second Hand */}
                <g transform={`rotate(${secondAngle}, 500, 500)`} filter="url(#shadow)">
                    <line x1="500" y1="600" x2="500" y2="140" stroke="#ef4444" strokeWidth="2" />
                    <circle cx="500" cy="140" r="4" fill="#ef4444" />
                    <circle cx="500" cy="500" r="4" fill="#ef4444" stroke="#000" strokeWidth="1" />
                </g>

                {/* Tiny center cap */}
                <circle cx="500" cy="500" r="3" fill="#fff" />

            </svg>
        </div>
    );
};

export default CosmicClock;
