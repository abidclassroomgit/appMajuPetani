"use client";
import { User, MapPin, Phone, Mail, Settings, LogOut, ChevronRight, Edit2, Save, X, Bookmark, MessageSquare, Clock } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useForum } from "@/hooks/useForum";
import { useBookmarks } from "@/hooks/useBookmarks";
import BottomNav from "@/components/BottomNav";

export default function ProfilPage() {
    const pathname = usePathname();
    const { user, logout, updateProfile, isLoading } = useAuth();
    const { posts } = useForum();
    const { bookmarks, loading: loadingBookmarks } = useBookmarks();
    
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('info'); // 'info', 'posts', 'bookmarks'
    const [formData, setFormData] = useState({
        nama: "",
        username: "",
        telepon: "",
        provinsi: "",
        kabupaten: "",
        kecamatan: "",
        tanaman: ""
    });

    // Dynamic Location State
    const [provinces, setProvinces] = useState([]);
    const [regencies, setRegencies] = useState([]);
    const [districts, setDistricts] = useState([]);
    
    const [selectedProvId, setSelectedProvId] = useState("");
    const [selectedRegencyId, setSelectedRegencyId] = useState("");
    
    // Initial Data Loading & Sync with User
    useEffect(() => {
        if (user) {
            setFormData({
                nama: user.nama || "",
                username: user.username || "",
                telepon: user.telepon || "",
                provinsi: user.provinsi || "",
                kabupaten: user.kabupaten || "",
                kecamatan: user.kecamatan || "",
                tanaman: user.jenisTanaman || "" 
            });
        }
    }, [user]);

    // Fetch Provinces on Mount
    useEffect(() => {
        fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
            .then(res => res.json())
            .then(data => {
                setProvinces(data);
                // Attempt to re-hydrate location IDs if user has data
                if (user?.provinsi) {
                    const found = data.find(p => p.name === user.provinsi);
                    if (found) setSelectedProvId(found.id);
                }
            })
            .catch(err => console.error(err));
    }, [user]); // Re-run if user is loaded late

    // Fetch Regencies when Province ID is set
    useEffect(() => {
        if (selectedProvId) {
            fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvId}.json`)
                .then(res => res.json())
                .then(data => {
                    setRegencies(data);
                    // Match Regency ID
                    if (user?.kabupaten && !selectedRegencyId) {
                        const found = data.find(r => r.name === user.kabupaten);
                        if (found) setSelectedRegencyId(found.id);
                    }
                })
                .catch(err => console.error(err));
        } else {
            setRegencies([]);
        }
    }, [selectedProvId, user]);

    // Fetch Districts when Regency ID is set
    useEffect(() => {
        if (selectedRegencyId) {
            fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedRegencyId}.json`)
                .then(res => res.json())
                .then(data => setDistricts(data))
                .catch(err => console.error(err));
        } else {
            setDistricts([]);
        }
    }, [selectedRegencyId]);


    const TANAMAN_DATA = ["Padi", "Jagung", "Cabai", "Bawang Merah", "Sayuran", "Buah-buahan", "Palawija"];

    const handleSave = async (e) => {
        e.preventDefault();
        const success = await updateProfile(formData);
        if (success) {
            setIsEditing(false);
            alert("Profil berhasil disimpan!"); 
        }
    };

    const handleCancel = () => {
        // Revert to user data
        if (user) {
             setFormData({
                nama: user.nama || "",
                username: user.username || "",
                telepon: user.telepon || "",
                provinsi: user.provinsi || "",
                kabupaten: user.kabupaten || "",
                kecamatan: user.kecamatan || "",
                tanaman: user.jenisTanaman || ""
            });
        }
        setIsEditing(false);
    };

    // Filter My Posts (Safely using ID)
    const myPosts = posts.filter(p => user?.id && p.user_id === user.id);

    if (isLoading) return <div className="p-6 text-center">Memuat profil...</div>;
    // if (!user) ... handled by middleware/auth guard usually, but safe to keep
    if (!user) return <div className="p-6 text-center">Silakan login terlebih dahulu.</div>;

    const hasProfileData = user.provinsi && user.kabupaten;

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div className="bg-green-700 text-white p-8 rounded-b-3xl mb-6 shadow-md relative">
                <div className="flex flex-col items-center">
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4 ring-4 ring-white/30">
                        <User size={48} />
                    </div>
                    {isEditing ? (
                        <h1 className="text-xl font-bold">Edit Profil</h1>
                    ) : (
                        <>
                            <h1 className="text-xl font-bold">{user.nama || "Nama Belum Diisi"}</h1>
                            <p className="text-white/80 text-sm">
                                {user.username ? `@${user.username}` : ""} 
                                {user.jenisTanaman ? ` • Petani ${user.jenisTanaman}` : ""} 
                            </p>
                        </>
                    )}
                </div>
                
                {/* Edit Toggle Button (Only show in view mode) */}
                {!isEditing && (
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="absolute top-6 right-6 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                    >
                        <Edit2 size={20} />
                    </button>
                )}
            </div>

            <div className="px-6 space-y-6">
                
                {isEditing ? (
                    /* EDIT MODE: FORM */
                    <form onSubmit={handleSave} className="bg-white rounded-xl p-6 shadow-sm space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-600">Nama Lengkap</label>
                            <input 
                                required
                                type="text"
                                className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                                value={formData.nama}
                                onChange={e => setFormData({...formData, nama: e.target.value})}
                            />
                        </div>

                         <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-600">No. Telepon</label>
                            <input 
                                required
                                type="tel"
                                className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                                value={formData.telepon}
                                onChange={e => setFormData({...formData, telepon: e.target.value})}
                            />
                        </div>

                        {/* Username ReadOnly */}
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-400">Username (Tidak dapat diubah)</label>
                             <input 
                                disabled
                                type="text"
                                className="w-full border bg-gray-100 rounded-lg p-3 text-sm text-gray-500 outline-none"
                                value={formData.username}
                            />
                        </div>

                        {/* DYNAMIC LOCATION SELECTS */}
                        <div className="space-y-3 pt-2">
                             <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-600">Provinsi</label>
                                <SearchableSelect 
                                    label="Provinsi"
                                    placeholder="Cari provinsi..."
                                    data={provinces}
                                    value={formData.provinsi}
                                    onChange={(item) => {
                                        setFormData({ ...formData, provinsi: item.name, kabupaten: "", kecamatan: "" });
                                        setSelectedProvId(item.id);
                                        setSelectedRegencyId("");
                                    }}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-600">Kabupaten/Kota</label>
                                <SearchableSelect 
                                    label="Kabupaten/Kota"
                                    placeholder={selectedProvId ? "Cari kabupaten..." : "Pilih provinsi dulu"}
                                    data={regencies}
                                    value={formData.kabupaten}
                                    disabled={!selectedProvId}
                                    onChange={(item) => {
                                        setFormData({ ...formData, kabupaten: item.name, kecamatan: "" });
                                        setSelectedRegencyId(item.id);
                                    }}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-600">Kecamatan</label>
                                <SearchableSelect 
                                    label="Kecamatan"
                                    placeholder={selectedRegencyId ? "Cari kecamatan..." : "Pilih kabupaten dulu"}
                                    data={districts}
                                    value={formData.kecamatan}
                                    disabled={!selectedRegencyId}
                                    onChange={(item) => {
                                        setFormData({ ...formData, kecamatan: item.name });
                                    }}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-600">Jenis Tanaman Utama</label>
                            <select 
                                required
                                className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-green-500 outline-none bg-white"
                                value={formData.tanaman}
                                onChange={e => setFormData({...formData, tanaman: e.target.value})}
                            >
                                <option value="">Pilih Tanaman...</option>
                                {TANAMAN_DATA.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button 
                                type="button" 
                                onClick={handleCancel}
                                className="flex-1 py-3 border border-gray-300 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2"
                            >
                                <X size={18} /> Batal
                            </button>
                            <button 
                                type="submit" 
                                className="flex-1 py-3 bg-green-700 text-white rounded-xl font-bold shadow-lg shadow-green-200 hover:bg-green-800 flex items-center justify-center gap-2"
                            >
                                <Save size={18} /> Simpan
                            </button>
                        </div>
                    </form>
                ) : (
                    /* VIEW MODE: INFO & MENU & TABS */
                    <>
                        {/* Stats Card */}
                         <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
                            <h2 className="font-bold text-gray-800 border-b pb-2 mb-3">Statistik Saya</h2>
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div className="bg-green-50 rounded-lg p-3 cursor-pointer" onClick={() => setActiveTab('posts')}>
                                    <span className="block text-2xl font-bold text-green-700">{myPosts.length}</span>
                                    <span className="text-xs text-gray-500">Postingan</span>
                                </div>
                                <div className="bg-blue-50 rounded-lg p-3 cursor-pointer" onClick={() => setActiveTab('bookmarks')}>
                                    <span className="block text-2xl font-bold text-blue-700">{bookmarks.length}</span>
                                    <span className="text-xs text-gray-500">Disimpan</span>
                                </div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-gray-200 mb-4 bg-white rounded-t-xl px-2">
                             <button 
                                onClick={() => setActiveTab('info')}
                                className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'info' ? 'border-green-600 text-green-700' : 'border-transparent text-gray-500'}`}
                            >
                                Info Akun
                            </button>
                             <button 
                                onClick={() => setActiveTab('posts')}
                                className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'posts' ? 'border-green-600 text-green-700' : 'border-transparent text-gray-500'}`}
                            >
                                Postingan
                            </button>
                             <button 
                                onClick={() => setActiveTab('bookmarks')}
                                className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'bookmarks' ? 'border-green-600 text-green-700' : 'border-transparent text-gray-500'}`}
                            >
                                Disimpan
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div className="min-h-[200px]">
                            {activeTab === 'info' && (
                                <div className="space-y-3 animate-in fade-in">
                                     <div className="bg-white rounded-xl p-4 space-y-4 shadow-sm">
                                        <h2 className="font-bold text-gray-800 border-b pb-2">Detail Kontak & Lokasi</h2>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 text-sm">
                                                <Phone size={18} className="text-green-700 shrink-0" />
                                                <span className="text-gray-600">{user.telepon || "Belum ada nomor telepon"}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm">
                                                <MapPin size={18} className="text-green-700 shrink-0" />
                                                <span className="text-gray-600">
                                                    {hasProfileData 
                                                        ? `Kec. ${user.kecamatan}, ${user.kabupaten}, ${user.provinsi}`
                                                        : "Lokasi belum diatur"}
                                                </span>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    
                                     {/* Menu Options (Settings, Logout) */}
                                    <div className="space-y-3">
                                        <div className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                                                    <Settings size={20} className="text-green-700" />
                                                </div>
                                                <span className="font-medium text-gray-700">Pengaturan Akun</span>
                                            </div>
                                            <ChevronRight size={18} className="text-gray-300" />
                                        </div>
                                         <div 
                                            onClick={() => {
                                                if(confirm('Apakah Anda yakin ingin keluar?')) {
                                                    logout();
                                                }
                                            }}
                                            className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm cursor-pointer hover:bg-red-50 transition-colors group"
                                        >
                                            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center group-hover:bg-red-200">
                                                <LogOut size={20} className="text-red-500" />
                                            </div>
                                            <span className="font-medium text-red-500">Keluar</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'posts' && (
                                <div className="space-y-3 animate-in fade-in">
                                    {myPosts.length > 0 ? (
                                        myPosts.map(post => (
                                            <Link href={`/forum/${post.id}`} key={post.id} className="block bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                                <h3 className="font-bold text-gray-800 text-sm mb-1">{post.title || "Tanpa Judul"}</h3>
                                                <p className="text-xs text-gray-500 line-clamp-2 mb-2">{post.content}</p>
                                                <div className="flex items-center justify-between text-[10px] text-gray-400">
                                                    <span>{post.timestamp}</span>
                                                    <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded font-bold">{post.category}</span>
                                                </div>
                                            </Link>
                                        ))
                                    ) : (
                                        <div className="text-center py-8 text-gray-400 text-sm">
                                            Belum ada postingan.
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'bookmarks' && (
                                <div className="space-y-3 animate-in fade-in">
                                    {loadingBookmarks ? (
                                        <div className="text-center py-8 text-gray-400 text-sm">Memuat...</div>
                                    ) : bookmarks.length > 0 ? (
                                        bookmarks.map(item => (
                                            <Link href={item.type === 'post' ? `/forum/${item.id}` : `/tips/${item.id}`} key={`${item.type}-${item.id}`} className="block bg-white p-4 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden">
                                                <div className={`absolute top-0 right-0 px-2 py-1 rounded-bl-lg text-[10px] font-bold text-white ${item.type === 'post' ? 'bg-blue-500' : 'bg-yellow-500'}`}>
                                                    {item.type === 'post' ? 'Forum' : 'Tips'}
                                                </div>
                                                <h3 className="font-bold text-gray-800 text-sm mb-1">{item.displayTitle}</h3>
                                                {item.displayImage && (
                                                    <img src={item.displayImage} alt="" className="w-full h-24 object-cover rounded-lg mb-2" />
                                                )}
                                                <p className="text-xs text-gray-500 line-clamp-2">{item.displayDesc}</p>
                                            </Link>
                                        ))
                                    ) : (
                                        <div className="text-center py-8 text-gray-400 text-sm">
                                            Belum ada item disimpan.
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>

            {/* Bottom Navigation */}
            <BottomNav />
        </div>
    );
}

// Reusable SearchableSelect Component
function SearchableSelect({ label, placeholder, data, value, onChange, disabled }) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    
    // Filter data based on search
    const filteredData = data.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        if (!value) setSearch("");
    }, [value]);

    return (
        <div className="relative">
            <div 
                className={`w-full border rounded-lg p-3 text-sm flex justify-between items-center cursor-pointer bg-white ${disabled ? 'opacity-50 cursor-not-allowed text-gray-400' : 'text-gray-800 focus:ring-2 focus:ring-green-500'}`}
                onClick={() => !disabled && setIsOpen(!isOpen)}
            >
                <span>
                    {value || placeholder}
                </span>
                <span className="text-gray-400">▼</span>
            </div>

            {isOpen && !disabled && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-hidden flex flex-col">
                    <input 
                        autoFocus
                        type="text"
                        className="p-3 border-b text-sm outline-none"
                        placeholder="Ketik untuk mencari..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="overflow-y-auto flex-1">
                        {filteredData.length > 0 ? (
                            filteredData.map(item => (
                                <div 
                                    key={item.id}
                                    className="p-3 hover:bg-green-50 text-sm cursor-pointer border-b border-gray-50 last:border-0 text-gray-700"
                                    onClick={() => {
                                        onChange(item);
                                        setIsOpen(false);
                                        setSearch("");
                                    }}
                                >
                                    {item.name}
                                </div>
                            ))
                        ) : (
                            <div className="p-3 text-sm text-gray-400 text-center">Tidak ditemukan</div>
                        )}
                    </div>
                </div>
            )}
            
            {isOpen && (
                <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setIsOpen(false)}></div>
            )}
        </div>
    );
}
