"use client";
import { Cloud, Sun, CloudRain, CloudDrizzle, Wind, MapPin, Droplets, AlertTriangle, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { WEATHER_DUMMY } from "@/data/weatherDummy";
import BottomNav from "@/components/BottomNav";
import { useAuth } from "@/hooks/useAuth";
import { useWeather } from "@/hooks/useWeather";

export default function CuacaPage() {
    const { user } = useAuth();
    const { weather, loading, refreshWeather } = useWeather();
    const [isRefreshing, setIsRefreshing] = useState(false);
    
    // Use weather name if available (from API), otherwise profile
    const displayLocation = weather.current.name || user?.kabupaten || "Lokasi Anda";

    const handleRefresh = async () => {
        setIsRefreshing(true);
        // Clear cache to force new fetch
        const cacheKey = `weather_${user?.kabupaten || 'Jakarta'}`;
        localStorage.removeItem(cacheKey);
        
        await refreshWeather();
        setIsRefreshing(false);
    };

    // Helper to get Icon component
    const getWeatherIcon = (iconName, size = 24, className = "") => {
        const icons = {
            Cloud: <Cloud size={size} className={className} />,
            Sun: <Sun size={size} className={className} />,
            CloudRain: <CloudRain size={size} className={className} />,
            CloudDrizzle: <CloudDrizzle size={size} className={className} />,
            Wind: <Wind size={size} className={className} />
        };
        return icons[iconName] || <Cloud size={size} className={className} />;
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            
            {/* Header */}
            <div className="bg-white p-6 pb-2 sticky top-0 z-50 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2 text-gray-700">
                        <MapPin size={20} className="text-green-600" />
                        <span className="font-bold text-lg capitalize">{displayLocation.toLowerCase()}</span>
                    </div>
                    <button 
                        onClick={handleRefresh} 
                        className={`p-2 rounded-full hover:bg-gray-100 transition-all ${isRefreshing ? 'animate-spin text-green-600' : 'text-gray-400'}`}
                    >
                        <RefreshCw size={20} />
                    </button>
                </div>
                <p className="text-xs text-gray-400 ml-7">
                    {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
            </div>

            <div className="p-6 space-y-6">
                
                {/* Weather Alerts */}
                {weather.alerts.map(alert => (
                    <div key={alert.id} className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex gap-4 animate-in fade-in slide-in-from-top-4">
                        <div className="bg-orange-100 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                            <AlertTriangle className="text-orange-600" size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-orange-800 text-sm">Peringatan: {alert.type}</h3>
                            <p className="text-xs text-orange-700 mt-1 mb-2 line-clamp-2">{alert.description}</p>
                            <p className="text-[10px] text-orange-600 font-medium bg-orange-100 inline-block px-2 py-1 rounded">
                                {alert.time}
                            </p>
                        </div>
                    </div>
                ))}

                {/* Current Weather Hero */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
                    {/* Background decorations */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
                    
                    <div className="flex justify-between items-start relative z-10">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-5xl font-bold tracking-tighter">{weather.current.temp}°</span>
                            </div>
                            <p className="text-lg font-medium opacity-90">{weather.current.condition}</p>
                        </div>
                        <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                            {getWeatherIcon(weather.current.icon, 40, "text-white")}
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-8 relative z-10">
                        <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                            <div className="flex items-center gap-1.5 text-blue-100 mb-1">
                                <Droplets size={14} /> <span className="text-[10px]">Hujan</span>
                            </div>
                            <p className="font-bold text-sm">{weather.current.rainChance}%</p>
                        </div>
                        <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                            <div className="flex items-center gap-1.5 text-blue-100 mb-1">
                                <Wind size={14} /> <span className="text-[10px]">Angin</span>
                            </div>
                            <p className="font-bold text-sm">{weather.current.windSpeed} km/j</p>
                        </div>
                        <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                            <div className="flex items-center gap-1.5 text-blue-100 mb-1">
                                <Droplets size={14} /> <span className="text-[10px]">Lembab</span>
                            </div>
                            <p className="font-bold text-sm">{weather.current.humidity}%</p>
                        </div>
                    </div>
                </div>

                {/* 7 Day Forecast */}
                <div>
                    <h2 className="font-bold text-gray-800 mb-4 flex items-center justify-between">
                        Prakiraan 7 Hari
                        <span className="text-xs font-normal text-blue-600">Lihat Semua</span>
                    </h2>
                    <div className="flex gap-3 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
                        {weather.forecast.map((day, idx) => {
                            const isToday = day.date === new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
                            return (
                                <div 
                                    key={idx} 
                                    className={`flex-shrink-0 w-20 p-3 rounded-2xl border text-center flex flex-col items-center gap-2 ${
                                        isToday 
                                            ? "bg-blue-50 border-blue-200 ring-1 ring-blue-300"
                                            : "bg-white border-gray-100"
                                    }`}
                                >
                                    <span className="text-xs font-medium text-gray-500">{day.day}</span>
                                    <span className="text-[10px] text-gray-400 mb-1">{day.date}</span>
                                    {getWeatherIcon(day.icon, 24, isToday ? "text-blue-500" : "text-gray-400")}
                                    <div className="mt-1">
                                        <span className="text-sm font-bold text-gray-800">{day.tempMax}°</span>
                                        <span className="text-xs text-gray-400 block">{day.tempMin}°</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Agricultural Impact */}
                <div className="bg-white border rounded-xl p-5">
                    <h3 className="font-bold text-sm mb-3 text-gray-800">Rekomendasi Pertanian</h3>
                    <ul className="space-y-3">
                        <li className="flex gap-3 text-sm text-gray-600">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 shrink-0" />
                            Cuaca mendukung untuk pemupukan pagi hari.
                        </li>
                        <li className="flex gap-3 text-sm text-gray-600">
                            <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-1.5 shrink-0" />
                            Waspada kelembaban tinggi memicu jamur pada cabai.
                        </li>
                    </ul>
                </div>

            </div>

            <BottomNav />
        </div>
    );
}
