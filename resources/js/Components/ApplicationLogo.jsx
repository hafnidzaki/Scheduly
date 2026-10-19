import React from 'react';

export default function ApplicationLogo(props) {
    return (
        <div {...props} className={`flex items-center gap-2.5 font-extrabold text-2xl tracking-tight text-slate-800 ${props.className || ''}`}>
            {/* Icon Kalender / Jadwal SVG */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </div>
            
            {/* Teks Brand Scheduly */}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-black">
                Scheduly<span className="text-indigo-600">.</span>
            </span>
        </div>
    );
}