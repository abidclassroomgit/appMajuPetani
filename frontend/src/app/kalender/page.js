"use client";
import { useState, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight, Plus, Droplet, Sprout, Wheat, Leaf, CloudSun, Cloud, CloudRain, Trash2, Pencil, X, Save } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useKalender } from "@/hooks/useKalender";

export default function KalenderPage() {
    const { activities, addActivity, updateActivity, deleteActivity, isLoaded } = useKalender();
    
    // State
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [filterType, setFilterType] = useState('all');
    
    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        date: "",
        type: "tanam",
        title: "",
        weather: "Cerah",
        notes: ""
    });

    // Helper Functions
    const formatDate = (date) => date.toISOString().split('T')[0];
    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

    // Navigation Handlers
    const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    const goToToday = () => {
        const today = new Date();
        setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
        setSelectedDate(formatDate(today));
    };

    // Filter Logic
    const getActivitiesForDate = (date) => {
        return activities.filter(act => 
            act.date === date && (filterType === 'all' || act.type === filterType)
        );
    };

    // Modal Handlers
    const openAddModal = () => {
        setEditingId(null);
        setFormData({
            date: selectedDate,
            type: "tanam",
            title: "",
            weather: "Cerah",
            notes: ""
        });
        setIsModalOpen(true);
    };

    const openEditModal = (act) => {
        setEditingId(act.id);
        setFormData(act);
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            updateActivity(editingId, formData);
        } else {
            addActivity(formData);
        }
        setIsModalOpen(false);
    };

    // Colors & Icons Configuration
    const ACTIVITY_CONFIG = {
        tanam: { bg: "bg-green-100", text: "text-green-800", dot: "bg-green-500", icon: <Leaf size={16} /> },
        rawat: { bg: "bg-blue-100", text: "text-blue-800", dot: "bg-blue-500", icon: <Droplet size={16} /> },
        pupuk: { bg: "bg-yellow-100", text: "text-yellow-800", dot: "bg-yellow-500", icon: <Sprout size={16} /> },
        panen: { bg: "bg-orange-100", text: "text-orange-800", dot: "bg-orange-500", icon: <Wheat size={16} /> }
    };

    // Calendar Grid Generation
    const renderCalendarGrid = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);
        const days = [];

        // Empty cells for previous month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="min-h-16 bg-gray-50 border border-gray-100" />);
        }

        // Days cells
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isToday = dateStr === formatDate(new Date());
            const isSelected = dateStr === selectedDate;
            
            // Find activities for dots
            const dayActivities = activities.filter(act => act.date === dateStr);
            // Deduplicate types for dots
            const activityTypes = [...new Set(dayActivities.map(act => act.type))];

            days.push(
                <div 
                    key={dateStr}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`min-h-16 p-1 border border-gray-100 relative cursor-pointer transition-colors ${
                        isSelected ? "bg-green-50" : "bg-white"
                    } ${isToday ? "ring-2 ring-inset ring-green-500" : ""}`}
                >
                    <span className={`text-xs font-semibold ${isToday ? "text-green-600" : "text-gray-700"}`}>{day}</span>
                    <div className="flex flex-wrap gap-1 mt-1 justify-center">
                        {activityTypes.map(type => (
                            (filterType === 'all' || filterType === type) && (
                                <div key={type} className={`w-1.5 h-1.5 rounded-full ${ACTIVITY_CONFIG[type].dot}`} />
                            )
                        ))}
                    </div>
                </div>
            );
        }

        return days;
    };

    const selectedActivities = getActivitiesForDate(selectedDate);

    if (!isLoaded) return <div className="p-10 text-center">Memuat kalender...</div>;

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div className="bg-white p-4 sticky top-0 z-10 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full"><ChevronLeft /></button>
                    <h1 className="text-lg font-bold text-gray-800">
                        {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </h1>
                    <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full"><ChevronRight /></button>
                </div>

                {/* Filters */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {['all', 'tanam', 'rawat', 'pupuk', 'panen'].map(type => (
                        <button
                            key={type}
                            onClick={() => setFilterType(type)}
                            className={`px-3 py-1 rounded-full text-xs font-medium capitalize whitespace-nowrap transition-colors ${
                                filterType === type 
                                    ? "bg-green-700 text-white" 
                                    : "bg-gray-100 text-gray-600"
                            }`}
                        >
                            {type === 'all' ? 'Semua' : type}
                        </button>
                    ))}
                    <button onClick={goToToday} className="ml-auto px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-lg whitespace-nowrap">
                        Hari Ini
                    </button>
                </div>
                
                {/* Week Days Header */}
                <div className="grid grid-cols-7 gap-px mt-4 text-center">
                    {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(d => (
                        <div key={d} className="text-xs font-bold text-gray-400 py-2 uppercase">{d}</div>
                    ))}
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="bg-white grid grid-cols-7 border-t border-gray-100">
                {renderCalendarGrid()}
            </div>

            {/* Activity List Section */}
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-gray-800 text-sm">
                        Aktivitas: <span className="text-green-700">{selectedDate.split('-').reverse().join('-')}</span>
                    </h2>
                    {selectedActivities.length > 0 && (
                        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">{selectedActivities.length}</span>
                    )}
                </div>

                <div className="space-y-3">
                    {selectedActivities.length === 0 ? (
                        <div className="text-center py-8 bg-white rounded-xl border border-dashed border-gray-300">
                            <p className="text-gray-400 text-sm mb-2">Tidak ada aktivitas terjadwal</p>
                            <button onClick={openAddModal} className="text-green-600 text-xs font-bold hover:underline">
                                + Tambah Aktivitas
                            </button>
                        </div>
                    ) : (
                        selectedActivities.map(act => (
                            <div key={act.id} className="bg-white border rounded-xl p-4 shadow-sm relative group">
                                <div className="flex justify-between items-start mb-2">
                                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${ACTIVITY_CONFIG[act.type].bg} ${ACTIVITY_CONFIG[act.type].text}`}>
                                        {ACTIVITY_CONFIG[act.type].icon}
                                        <span className="uppercase">{act.type}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => openEditModal(act)} className="text-gray-400 hover:text-blue-500"><Pencil size={14} /></button>
                                        <button onClick={() => deleteActivity(act.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
                                    </div>
                                </div>
                                <h3 className="font-bold text-gray-800 text-sm mb-1">{act.title}</h3>
                                <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                                    <div className="flex items-center gap-1">
                                        {act.weather === "Cerah" ? <CloudSun size={12} /> : <Cloud size={12} />}
                                        {act.weather}
                                    </div>
                                </div>
                                {act.notes && (
                                    <p className="text-xs text-gray-500 bg-gray-50 p-2 rounded-lg">{act.notes}</p>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* FAB */}
            <button 
                onClick={openAddModal}
                className="fixed bottom-20 right-4 bg-green-700 hover:bg-green-800 text-white p-4 rounded-full shadow-lg shadow-green-200 z-30 transition-transform active:scale-95"
            >
                <Plus size={24} />
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-sm p-6 animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-4 border-b pb-2">
                            <h2 className="text-lg font-bold text-gray-800">{editingId ? 'Edit Aktivitas' : 'Tambah Aktivitas'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-gray-700 block mb-1">Tanggal</label>
                                <input 
                                    required
                                    type="date"
                                    className="w-full bg-gray-50 border rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-green-500"
                                    value={formData.date}
                                    onChange={e => setFormData({...formData, date: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-700 block mb-1">Jenis Aktivitas</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['tanam', 'rawat', 'pupuk', 'panen'].map(type => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => setFormData({...formData, type})}
                                            className={`p-2 rounded-lg text-xs font-bold border transition-colors flex items-center justify-center gap-1 ${
                                                formData.type === type 
                                                    ? `${ACTIVITY_CONFIG[type].bg} ${ACTIVITY_CONFIG[type].text} border-${ACTIVITY_CONFIG[type].text.split('-')[1]}-500 ring-1 ring-${ACTIVITY_CONFIG[type].text.split('-')[1]}-500` 
                                                    : "bg-white border-gray-200 text-gray-500"
                                            }`}
                                        >
                                            {ACTIVITY_CONFIG[type].icon} <span className="uppercase">{type}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-700 block mb-1">Judul Aktivitas</label>
                                <input 
                                    required
                                    type="text"
                                    placeholder="Contoh: Tanam Padi IR64"
                                    className="w-full bg-gray-50 border rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-green-500"
                                    value={formData.title}
                                    onChange={e => setFormData({...formData, title: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-700 block mb-1">Kondisi Cuaca</label>
                                <select 
                                    className="w-full bg-gray-50 border rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-green-500"
                                    value={formData.weather}
                                    onChange={e => setFormData({...formData, weather: e.target.value})}
                                >
                                    <option>Cerah</option>
                                    <option>Berawan</option>
                                    <option>Hujan</option>
                                    <option>Tidak Hujan</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-700 block mb-1">Catatan</label>
                                <textarea 
                                    rows={3}
                                    className="w-full bg-gray-50 border rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Catatan tambahan (opsional)..."
                                    value={formData.notes}
                                    onChange={e => setFormData({...formData, notes: e.target.value})}
                                />
                            </div>
                            <div className="pt-2 flex gap-2">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 text-gray-600 font-bold bg-gray-100 rounded-xl hover:bg-gray-200">Batal</button>
                                <button type="submit" className="flex-1 py-3 text-white font-bold bg-green-700 rounded-xl hover:bg-green-800 shadow-lg shadow-green-200 flex items-center justify-center gap-2">
                                    <Save size={18} /> Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <BottomNav />
        </div>
    );
}
