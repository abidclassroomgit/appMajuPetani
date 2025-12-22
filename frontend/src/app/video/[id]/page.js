"use client";
import { useState, useEffect } from "react";
import { ArrowLeft, Play, Eye, Download, Share2, Bookmark, ChevronDown, ChevronUp, PlayCircle } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { VIDEO_DUMMY } from "@/data/videoDummy";
import { useVideo } from "@/hooks/useVideo";

export default function VideoDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { isBookmarked, toggleBookmark } = useVideo();
    const [video, setVideo] = useState(null);
    const [relatedVideos, setRelatedVideos] = useState([]);
    const [isDescExpanded, setIsDescExpanded] = useState(false);

    useEffect(() => {
        const id = parseInt(params.id);
        const foundVideo = VIDEO_DUMMY.find(v => v.id === id);
        
        if (foundVideo) {
            setVideo(foundVideo);
            // Find related videos (same category, excluding current)
            const related = VIDEO_DUMMY
                .filter(v => v.category === foundVideo.category && v.id !== id)
                .slice(0, 6);
            setRelatedVideos(related);
        } else {
             // Handle 404
             // router.push('/video');
        }
    }, [params.id]);

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: `PetaniMaju - ${video.title}`,
                text: `Tonton tutorial ini: ${video.title}`,
                url: window.location.href,
            }).catch(console.error);
        } else {
            alert("Fitur bagikan link: " + window.location.href);
        }
    };

    const handleDownload = () => {
        alert("Fitur download video akan segera tersedia di update berikutnya! (Mode Offline)");
    };

    if (!video) return <div className="p-10 text-center">Memuat video...</div>;

    return (
        <div className="min-h-screen bg-white pb-6">
            {/* Header / Player Area */}
            <div className="sticky top-0 z-20 bg-black">
                {/* Navbar Overlay */}
                <div className="absolute top-0 left-0 p-4 z-30">
                    <button onClick={() => router.back()} className="p-2 bg-black/40 backdrop-blur-sm rounded-full text-white hover:bg-black/60">
                        <ArrowLeft size={20} />
                    </button>
                </div>

                {/* Video Player Placeholder */}
                <div className="aspect-video w-full bg-gray-900 relative flex items-center justify-center group cursor-pointer">
                    {/* In a real app, this would be an iframe or video tag toggled by state */}
                    <img src={video.thumbnail} className="w-full h-full object-cover opacity-60" alt="thumbnail" />
                    <div className="absolute inset-0 flex items-center justify-center">
                         <div className="w-16 h-16 rounded-full bg-green-600/90 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                            <Play size={28} className="text-white ml-1" fill="currentColor" />
                        </div>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                    </div>
                </div>
            </div>

            {/* Video Info */}
            <div className="p-4">
                <h1 className="text-xl font-bold text-gray-900 leading-tight mb-2">{video.title}</h1>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-3">
                         <span className="flex items-center gap-1"><Eye size={14} /> {video.views.toLocaleString()} x ditonton</span>
                         <span>• {video.uploadDate}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-800`}>
                        {video.category}
                    </span>
                </div>

                {/* Actions */}
                <div className="flex border-y border-gray-100 py-3 mb-4">
                    <button onClick={handleDownload} className="flex-1 flex flex-col items-center gap-1 text-gray-600 hover:text-green-700 active:scale-95 transition-transform">
                        <div className="p-2 bg-gray-100 rounded-full"><Download size={20} /></div>
                        <span className="text-[10px] font-medium">Download</span>
                    </button>
                    <button onClick={handleShare} className="flex-1 flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600 active:scale-95 transition-transform">
                        <div className="p-2 bg-gray-100 rounded-full"><Share2 size={20} /></div>
                        <span className="text-[10px] font-medium">Bagikan</span>
                    </button>
                    <button onClick={() => toggleBookmark(video.id)} className="flex-1 flex flex-col items-center gap-1 text-gray-600 hover:text-green-700 active:scale-95 transition-transform">
                        <div className={`p-2 rounded-full ${isBookmarked(video.id) ? "bg-green-100 text-green-700" : "bg-gray-100"}`}>
                            <Bookmark size={20} className={isBookmarked(video.id) ? "fill-green-700" : ""} />
                        </div>
                        <span className="text-[10px] font-medium">{isBookmarked(video.id) ? "Disimpan" : "Simpan"}</span>
                    </button>
                </div>

                {/* Description & Learning Points */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <div className="flex justify-between items-start cursor-pointer" onClick={() => setIsDescExpanded(!isDescExpanded)}>
                        <h3 className="font-bold text-gray-800 text-sm mb-2">Deskripsi & Poin Belajar</h3>
                         {isDescExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                    
                    <div className={`text-sm text-gray-600 space-y-3 ${isDescExpanded ? 'block' : 'line-clamp-3'}`}>
                        <p>{video.description}</p>
                        <div className="pt-2">
                             <h4 className="font-semibold text-gray-800 text-xs mb-2">Yang akan dipelajari:</h4>
                             <ul className="list-disc pl-4 space-y-1 text-xs">
                                {video.learningPoints.map((point, idx) => (
                                    <li key={idx}>{point}</li>
                                ))}
                             </ul>
                        </div>
                    </div>
                    {!isDescExpanded && (
                        <button onClick={() => setIsDescExpanded(true)} className="text-xs text-green-600 font-bold mt-2">
                            Selengkapnya
                        </button>
                    )}
                </div>

                {/* Related Videos */}
                <div>
                    <h3 className="font-bold text-gray-900 text-base mb-3">Video Terkait</h3>
                     <div className="grid grid-cols-1 gap-3">
                        {relatedVideos.map((relVideo) => (
                            <Link href={`/video/${relVideo.id}`} key={relVideo.id} className="flex gap-3 group">
                                <div className="w-32 aspect-video bg-gray-200 rounded-lg overflow-hidden relative shrink-0">
                                    <img src={relVideo.thumbnail} alt={relVideo.title} className="w-full h-full object-cover" />
                                    <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1 rounded">
                                        {relVideo.duration}
                                    </div>
                                </div>
                                <div className="flex-1 py-1">
                                    <h4 className="font-bold text-gray-800 text-sm leading-tight mb-1 line-clamp-2 group-hover:text-green-700 transition-colors">
                                        {relVideo.title}
                                    </h4>
                                    <p className="text-xs text-gray-500 mb-1">{relVideo.creator}</p>
                                    <p className="text-[10px] text-gray-400">{relVideo.views.toLocaleString()} views • {relVideo.uploadDate}</p>
                                </div>
                            </Link>
                        ))}
                     </div>
                </div>
            </div>
        </div>
    );
}
