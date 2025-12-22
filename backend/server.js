const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Mock Data for MVP
const TIPS_DATA = [
    {
        id: 1,
        title: "Cara Memilih Pupuk Organik",
        description: "Pelajari kriteria penting dalam memilih pupuk organik untuk hasil panen maksimal.",
        category: "Pupuk",
        imageUrl: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=200&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Teknik Tanam Padi Jajar Legowo",
        description: "Sistem tanam jajar legowo merupakan salah satu metode yang efektif tingkatkan produksi.",
        category: "Tanam",
        imageUrl: "https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?q=80&w=200&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Mengatasi Hama Wereng",
        description: "Tips dan trik pengendalian hama wereng pada tanaman padi secara alami.",
        category: "Rawat",
        imageUrl: "https://images.unsplash.com/photo-1599818311477-3de4f940868a?q=80&w=200&auto=format&fit=crop"
    },
];

const WEATHER_DATA = {
    location: "Subang",
    current: {
        temp: 32,
        condition: "Cerah",
        high: 35,
        low: 24
    },
    forecast: [
        { day: "Sen", tempHigh: 35, tempLow: 24, condition: "sunny" },
        { day: "Sel", tempHigh: 34, tempLow: 23, condition: "rain" },
        { day: "Rab", tempHigh: 36, tempLow: 25, condition: "cloudy" },
        { day: "Kam", tempHigh: 33, tempLow: 23, condition: "cloudy" },
        { day: "Jum", tempHigh: 32, tempLow: 22, condition: "rain" },
        { day: "Sab", tempHigh: 34, tempLow: 24, condition: "sunny" },
        { day: "Min", tempHigh: 35, tempLow: 24, condition: "sunny" }
    ]
};

// Routes
app.get('/', (req, res) => {
    res.send('PetaniMaju API is running');
});

app.get('/api/tips', (req, res) => {
    const { category, search } = req.query;
    let filteredTips = [...TIPS_DATA];

    if (category && category !== 'Semua') {
        filteredTips = filteredTips.filter(t => t.category === category);
    }

    if (search) {
        filteredTips = filteredTips.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));
    }

    res.json(filteredTips);
});

app.get('/api/weather', (req, res) => {
    res.json(WEATHER_DATA);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
