export const WEATHER_DUMMY = {
  current: {
    temp: 28,
    condition: "Berawan",
    icon: "Cloud",
    humidity: 75,
    windSpeed: 12,
    rainChance: 40
  },
  forecast: [
    { day: "Senin", date: "23 Des", icon: "CloudRain", tempMax: 30, tempMin: 24, rainChance: 80 },
    { day: "Selasa", date: "24 Des", icon: "Sun", tempMax: 32, tempMin: 25, rainChance: 10 },
    { day: "Rabu", date: "25 Des", icon: "Cloud", tempMax: 29, tempMin: 24, rainChance: 30 },
    { day: "Kamis", date: "26 Des", icon: "Sun", tempMax: 33, tempMin: 25, rainChance: 10 },
    { day: "Jumat", date: "27 Des", icon: "CloudRain", tempMax: 28, tempMin: 23, rainChance: 90 },
    { day: "Sabtu", date: "28 Des", icon: "CloudDrizzle", tempMax: 29, tempMin: 24, rainChance: 60 },
    { day: "Minggu", date: "29 Des", icon: "Sun", tempMax: 34, tempMin: 26, rainChance: 5 },
  ],
  alerts: [
    { 
      id: 1, 
      type: "Hujan Lebat", 
      severity: "warning", 
      time: "15:00 - 18:00", 
      description: "Potensi hujan lebat dengan intensitas 50-75mm/jam",
      recommendation: "Hindari menyemprot pupuk, tunda panen padi yang sudah dipotong"
    }
  ]
};
