"use client";
import Link from "next/link";
import { ArrowRight, CloudSun, Leaf, Bug, Calendar, PlayCircle, MessageSquare, CheckCircle, Smartphone, Wifi, Users } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Navbar */}
            <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img src="/images/logo.png" alt="PetaniMaju Logo" className="w-10 h-10 object-contain" />
                        <span className="font-bold text-xl text-green-800">PetaniMaju</span>
                    </div>
                    <Link href="/auth">
                        <button className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-full font-medium text-sm transition-all active:scale-95">
                            Masuk
                        </button>
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-block px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-semibold mb-6 animate-in fade-in slide-in-from-bottom-4">
                        🚀 Solusi Pertanian Masa Depan
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                        Solusi Cerdas untuk <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Petani Indonesia</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Tingkatkan hasil panen dengan prediksi cuaca akurat, kalender tanam otomatis, dan konsultasi hama. Semua dalam satu aplikasi.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/auth" className="w-full sm:w-auto">
                            <button className="w-full bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-green-200 transition-all flex items-center justify-center gap-2 hover:-translate-y-1">
                                Mulai Sekarang <ArrowRight size={20} />
                            </button>
                        </Link>
                        <a href="#features" className="w-full sm:w-auto">
                             <button className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-8 py-4 rounded-full font-bold text-lg transition-all">
                                Pelajari Fitur
                            </button>
                        </a>
                    </div>
                    
                    {/* Hero Image/Illustration Mockup */}
                    <div className="mt-16 relative mx-auto max-w-5xl">
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10"></div>
                        <div className="bg-gradient-to-b from-green-50 to-white rounded-t-[3rem] p-4 md:p-8 pb-0 border border-b-0 border-gray-100 shadow-2xl">
                             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-50 blur-[2px] hover:blur-none transition-all duration-700">
                                 {/* Fake Stats for Visual */}
                                 <div className="bg-white p-4 rounded-2xl shadow-sm"><CloudSun className="text-blue-500 mb-2"/> <div className="h-2 w-16 bg-gray-200 rounded"></div></div>
                                 <div className="bg-white p-4 rounded-2xl shadow-sm"><Calendar className="text-green-500 mb-2"/> <div className="h-2 w-16 bg-gray-200 rounded"></div></div>
                                 <div className="bg-white p-4 rounded-2xl shadow-sm"><Bug className="text-red-500 mb-2"/> <div className="h-2 w-16 bg-gray-200 rounded"></div></div>
                                 <div className="bg-white p-4 rounded-2xl shadow-sm"><PlayCircle className="text-purple-500 mb-2"/> <div className="h-2 w-16 bg-gray-200 rounded"></div></div>
                             </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-20 bg-gray-50/50">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Fitur Lengkap untuk Petani</h2>
                        <p className="text-gray-500">Semua alat yang Anda butuhkan untuk bertani lebih efisien.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard 
                            icon={<CloudSun size={32} />} 
                            title="Cuaca Akurat" 
                            desc="Prediksi cuaca real-time khusus lokasi lahan Anda untuk perencanaan yang lebih baik."
                            color="bg-blue-100 text-blue-600"
                        />
                        <FeatureCard 
                            icon={<Calendar size={32} />} 
                            title="Kalender Tanam" 
                            desc="Jadwal tanam, pemupukan, dan panen otomatis disesuaikan dengan jenis tanaman."
                            color="bg-green-100 text-green-600"
                        />
                         <FeatureCard 
                            icon={<Bug size={32} />} 
                            title="Info Hama" 
                            desc="Deteksi dini hama dan penyakit dengan solusi penanganan organik maupun kimia."
                            color="bg-red-100 text-red-600"
                        />
                         <FeatureCard 
                            icon={<Leaf size={32} />} 
                            title="Tips Pertanian" 
                            desc="Ribuan artikel dan tips praktis untuk meningkatkan kualitas hasil panen."
                            color="bg-emerald-100 text-emerald-600"
                        />
                         <FeatureCard 
                            icon={<PlayCircle size={32} />} 
                            title="Video Tutorial" 
                            desc="Belajar teknik bertani modern langsung dari ahli melalui video interaktif."
                            color="bg-purple-100 text-purple-600"
                        />
                         <FeatureCard 
                            icon={<MessageSquare size={32} />} 
                            title="Forum Diskusi" 
                            desc="Terhubung dengan ribuan petani lain untuk berbagi pengalaman dan solusi."
                            color="bg-orange-100 text-orange-600"
                        />
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="bg-green-900 rounded-[2.5rem] p-8 md:p-16 text-white overflow-hidden relative">
                        {/* Background Patterns */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-green-800 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl opacity-50"></div>
                        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-800 rounded-full -translate-x-1/3 translate-y-1/3 blur-3xl opacity-50"></div>

                        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Mengapa Memilih PetaniMaju?</h2>
                                <div className="space-y-6">
                                    <BenefitItem text="Meningkatkan hasil panen hingga 30%" />
                                    <BenefitItem text="Menghemat biaya pupuk dan pestisida" />
                                    <BenefitItem text="Akses informasi mudah tanpa sinyal kuat" />
                                    <BenefitItem text="Komunitas yang saling mendukung" />
                                </div>
                                <div className="mt-8">
                                    <Link href="/auth">
                                        <button className="bg-white text-green-900 px-8 py-3 rounded-full font-bold hover:bg-green-50 transition-colors">
                                            Gabung Komunitas
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-sm border border-white/10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center font-bold text-xl">
                                        👨‍🌾
                                    </div>
                                    <div>
                                        <p className="font-bold">Pak Slamet</p>
                                        <p className="text-sm text-green-200">Petani Padi, Subang</p>
                                    </div>
                                </div>
                                <p className="text-lg italic opacity-90">
                                    "Sejak pakai PetaniMaju, saya jadi tahu kapan waktu tepat untuk memupuk. Hasil panen naik drastis!"
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 text-center px-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Siap Meningkatkan Hasil Panen?</h2>
                <p className="text-gray-600 mb-8">Bergabunglah dengan revolusi pertanian digital Indonesia.</p>
                <Link href="/auth">
                    <button className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl shadow-green-200 transition-all hover:-translate-y-1">
                        Daftar Gratis Sekarang
                    </button>
                </Link>
            </section>

            {/* Footer */}
            <footer className="bg-gray-50 py-10 border-t border-gray-200">
                <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <img src="/images/logo.png" alt="PetaniMaju Logo" className="w-10 h-10 object-contain" />
                        <span className="font-bold text-gray-800">PetaniMaju</span>
                    </div>
                    <div className="flex gap-6 text-sm text-gray-500">
                        <a href="#" className="hover:text-green-700">Tentang Kami</a>
                        <a href="#" className="hover:text-green-700">Kebijakan Privasi</a>
                        <a href="#" className="hover:text-green-700">Bantuan</a>
                    </div>
                    <p className="text-sm text-gray-400">© 2025 PetaniMaju. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, desc, color }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${color}`}>
                {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500 leading-relaxed">{desc}</p>
        </div>
    );
}

function BenefitItem({ text }) {
    return (
        <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                <CheckCircle size={14} className="text-white" />
            </div>
            <span className="font-medium text-lg">{text}</span>
        </div>
    );
}
