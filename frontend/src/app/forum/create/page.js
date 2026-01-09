"use client";
import { useState } from "react";
import { ArrowLeft, Send, CheckCircle, AlertCircle, Camera, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForum } from "@/hooks/useForum";
import { useAuth } from "@/hooks/useAuth";

export default function CreatePostPage() {
    const router = useRouter();
    const { addPost } = useForum();
    const { user } = useAuth();
    
    // Form State
    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const CATEGORIES = ["Pertanyaan", "Tips & Trik", "Pengalaman", "Diskusi Umum"];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validation
        if (!category) {
            setError("Silakan pilih kategori postingan.");
            return;
        }
        if (!content || content.length < 10) {
            setError("Isi postingan minimal 10 karakter.");
            return;
        }

        setIsSubmitting(true);

        try {
            const newPost = {
                author: {
                    name: user?.nama || "Petani", 
                    avatar: "👤",
                    location: user?.kabupaten || "Indonesia"
                },
                category,
                title: title.trim(),
                content: content.trim(),
            };

            const newId = await addPost(newPost);

            if (newId) {
                // Redirect to Feed (Home) so user sees their post in the list
                router.push('/forum'); 
                router.refresh(); // Force refresh to show new data
            } else {
                setIsSubmitting(false);
            }
            
        } catch (err) {
            console.error(err);
            setError("Gagal membuat postingan. Silakan coba lagi.");
            setIsSubmitting(false);
        }
    };

    if (!user) return <div className="min-h-screen flex items-center justify-center">Memuat...</div>;

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-white p-4 sticky top-0 z-10 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
                        <X size={20} />
                    </button>
                    <h1 className="text-lg font-bold text-gray-800">Buat Postingan</h1>
                </div>
                <button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-green-700 text-white text-sm font-bold rounded-full hover:bg-green-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                    {isSubmitting ? "Memposting..." : "Posting"}
                </button>
            </div>

            <div className="p-5 max-w-lg mx-auto">
                {error && (
                    <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4 flex items-center gap-2">
                        <AlertCircle size={16} /> {error}
                    </div>
                )}

                {/* Category Selection */}
                <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Kategori <span className="text-red-500">*</span></label>
                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${
                                    category === cat 
                                        ? "bg-green-50 border-green-500 text-green-700 ring-1 ring-green-500" 
                                        : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Title Input */}
                <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Judul (Opsional)</label>
                    <input 
                        type="text"
                        placeholder="Berikan judul menarik..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-green-500 transition-shadow"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength={100}
                    />
                </div>

                {/* Content Input */}
                <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Isi Postingan <span className="text-red-500">*</span></label>
                    <textarea 
                        rows={8}
                        placeholder="Ceritakan pengalaman, tanyakan sesuatu, atau bagikan tips..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-green-500 transition-shadow resize-none"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <div className="text-right text-xs text-gray-400 mt-1">
                        Min. 10 karakter
                    </div>
                </div>

                {/* Image Upload Dummy */}
                <div>
                     <button className="flex items-center gap-2 text-green-700 font-bold text-sm bg-green-50 px-4 py-3 rounded-xl border border-dashed border-green-300 w-full justify-center hover:bg-green-100 transition-colors">
                        <Camera size={20} /> Tambah Foto (Opsional)
                    </button>
                </div>

            </div>
        </div>
    );
}
