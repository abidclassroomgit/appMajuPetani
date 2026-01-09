"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { HAMA_PENYAKIT_DATA } from '@/data/hamaDummy';
import { VIDEO_DUMMY } from '@/data/videoDummy';

const TIPS_DATA = [
    { 
        title: "Cara Memilih Pupuk Organik", 
        category: "Pupuk", 
        description: "Pelajari kriteria penting dalam memilih pupuk organik yang baik untuk tanah Anda.",
        content: "Pupuk organik yang baik harus matang sempurna, tidak berbau busuk, dan remah. Perhatikan kandungan C/N ratio...",
        weather_condition: "Semua", 
        is_featured: true 
    },
    { 
        title: "Teknik Tanam Padi Jajar Legowo", 
        category: "Tanam", 
        description: "Sistem tanam jajar legowo 4:1 atau 2:1 untuk meningkatkan populasi tanaman dan hasil panen.",
        weather_condition: "Semua",
        is_featured: true
    },
    { 
        title: "Mengatasi Hama Wereng", 
        category: "Rawat", 
        description: "Tips pengendalian hama wereng dengan musuh alami dan insektisida nabati.",
        weather_condition: "Hujan",
        is_featured: false
    },
    { 
        title: "Waktu Panen Padi yang Tepat", 
        category: "Tanam", 
        description: "Kenali tanda-tanda fisik padi yang sudah siap dipanen agar gabah berkualitas.",
        weather_condition: "Kering",
        is_featured: false
    },
];

export default function SeedPage() {
    const [status, setStatus] = useState("Ready");
    const [log, setLog] = useState([]);

    const addLog = (msg) => setLog(prev => [...prev, msg]);

    const runSeeding = async () => {
        setStatus("Seeding...");
        setLog([]);

        try {
            setStatus("Clearing...");
            addLog("🧹 Clearing old data... (This might take a moment)");

            // 0. RESET DATA - Delete everything!
            // We use delete().gt('id', 0) to match all positive IDs.
            const { error: err1, count: c1 } = await supabase.from('tips').delete().gt('id', 0);
            if (err1) { console.error(err1); throw err1; }
            addLog(`Deleted ${c1 ?? '?'} existing tips.`);
            
            const { error: err2, count: c2 } = await supabase.from('hama_penyakit').delete().gt('id', 0);
            if (err2) { console.error(err2); throw err2; }
            addLog(`Deleted ${c2 ?? '?'} existing hama.`);
            
            const { error: err3, count: c3 } = await supabase.from('videos').delete().gt('id', 0);
            if (err3) { console.error(err3); throw err3; }
            addLog(`Deleted ${c3 ?? '?'} existing videos.`);

            addLog("Old data cleared ✨ NOW Seeding...");
            setStatus("Seeding...");
            
            // 1. Seed Tips
            addLog("Seeding Tips...");
            const tipsPayload = TIPS_DATA.map((t, i) => ({
                id: i + 1, // Explicit ID to prevent duplicates
                title: t.title,
                category: t.category,
                description: t.description,
                content: t.content,
                weather_condition: t.weather_condition,
                is_featured: t.is_featured,
                image_url: `https://placehold.co/600x400/15803d/FFF?text=${encodeURIComponent(t.title)}` // Generates image with text
            }));
            
            const { error: tipsError } = await supabase.from('tips').upsert(tipsPayload);
            if (tipsError) throw tipsError;
            addLog("Tips Seeded ✅");

            // 2. Seed Hama
            addLog("Seeding Hama...");
            const hamaPayload = HAMA_PENYAKIT_DATA.map(h => ({
                id: h.id, // Explicit ID
                name: h.nama,
                type: h.category, // Map 'Hama'/'Penyakit' -> type
                severity: h.severity,
                description: h.shortDesc,
                symptoms: h.ciriCiri.join('\n'),
                cause: h.penyebab,
                solution_organic: h.solusi.join('\n'),
                prevention: h.pencegahan.join('\n'),
                image_url: `https://placehold.co/600x400/orange/white?text=${encodeURIComponent(h.nama)}` // Better placeholder
            }));
            const { error: hamaError } = await supabase.from('hama_penyakit').upsert(hamaPayload);
            if (hamaError) throw hamaError;
            addLog("Hama Seeded ✅");

            // 3. Seed Video
            addLog("Seeding Videos...");
            const videoPayload = VIDEO_DUMMY.map(v => ({
                id: v.id, // Explicit ID
                title: v.title,
                thumbnail_url: `https://placehold.co/600x400/darkred/white?text=Video:+${encodeURIComponent(v.title.substring(0, 15))}...`,
                duration: v.duration,
                category: v.category,
                views: v.views,
                upload_date: new Date().toISOString().split('T')[0],
                learning_points: v.learningPoints,
                description: v.description,
                creator: v.creator || "PetaniMaju Official"
            }));
            const { error: videoError } = await supabase.from('videos').upsert(videoPayload);
            if (videoError) throw videoError;
            addLog("Videos Seeded ✅");

            setStatus("Complete!");
            addLog("All data seeded successfully! 🚀");

        } catch (error) {
            console.error(error);
            setStatus("Error");
            addLog(`ERROR: ${error.message}`);
        }
    };

    return (
        <div className="p-10 flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">Database Seeder</h1>
            <button 
                onClick={runSeeding} 
                disabled={status === "Seeding..."}
                className="bg-green-700 text-white px-6 py-3 rounded-xl font-bold disabled:opacity-50"
            >
                {status === "Seeding..." ? "Running..." : "Start Seeding"}
            </button>
            <div className="mt-6 bg-gray-100 p-4 rounded-xl w-full max-w-md h-64 overflow-y-auto font-mono text-xs">
                {log.map((l, i) => <div key={i}>{l}</div>)}
            </div>
        </div>
    );
}
