export const FORUM_POSTS = [
  {
    id: 1,
    author: {
      name: "Pak Yanto",
      avatar: "👨‍🌾",
      location: "Karang Tumaritis, Pesisir Selatan"
    },
    timestamp: "2 jam lalu",
    category: "Pertanyaan",
    title: "Varietas padi tahan wereng untuk musim hujan?",
    content: "Teman-teman, saya mau minta saran. Musim hujan ini saya mau tanam padi lagi, tapi di musim lalu kena wereng parah. Ada yang punya rekomendasi varietas yang tahan wereng dan cocok untuk daerah dengan curah hujan tinggi?",
    images: [], 
    likes: 12,
    commentsCount: 2,
    isLiked: false, 
    isBookmarked: false,
    comments: [
      {
        id: 101,
        author: { name: "Bu Siti", avatar: "👩‍🌾" },
        timestamp: "1 jam lalu",
        content: "Pak Yanto, saya rekomen Inpari 32 atau Ciherang. Sudah 2 musim saya pakai Inpari 32, hasilnya bagus dan tahan wereng.",
        likes: 5,
        replies: [
          {
            id: 102,
            author: { name: "Pak Yanto", avatar: "👨‍🌾" },
            timestamp: "30 menit lalu",
            content: "Terima kasih Bu Siti! Nanti saya coba cari bibitnya.",
            likes: 2
          }
        ]
      },
      {
        id: 103,
        author: { name: "Kang Ujang", avatar: "👨‍🌾" },
        timestamp: "2 jam lalu",
        content: "Di daerah saya yang basah juga cocok pakai Inpari 42. Hasil lumayan, tahan penyakit.",
        likes: 3,
        replies: []
      }
    ]
  },
  {
    id: 2,
    author: {
      name: "Bu Siti",
      avatar: "👩‍🌾",
      location: "Ujung Batu"
    },
    timestamp: "5 jam lalu",
    category: "Tips & Trik",
    title: "Cara bikin pupuk kompos dari jerami",
    content: "Mau share tips nih, daripada bakar jerami sisa panen, mendingan bikin kompos. Caranya: 1) Cacah jerami jadi kecil-kecil, 2) Campur dengan kotoran ternak, 3) Siram EM4, 4) Tutup pakai terpal, 5) Tunggu 3 minggu. Hasilnya bagus banget buat pupuk dasar!",
    images: [],
    likes: 24,
    commentsCount: 0,
    isLiked: false,
    isBookmarked: true,
    comments: []
  },
  {
    id: 3,
    author: {
      name: "Mbah Kromo",
      avatar: "👴",
      location: "Desa Karang Mulya"
    },
    timestamp: "1 hari lalu",
    category: "Pengalaman",
    title: null,
    content: "Kemarin saya coba tanam bawang merah pakai mulsa plastik hitam perak. Hasilnya luar biasa! Gulma berkurang drastis dan tanah tetap lembab. Panen meningkat 30% dibanding musim lalu.",
    images: [],
    likes: 45,
    commentsCount: 0,
    isLiked: true,
    isBookmarked: false,
    comments: []
  },
  {
    id: 4,
    author: {
       name: "Mas Agus",
       avatar: "🚜",
       location: "Desa Sukamaju"
    },
    timestamp: "3 jam lalu",
    category: "Diskusi Umum",
    title: "Harga gabah turun?",
    content: "Ada yang merasakan harga gabah kering panen di daerah masing-masing agak turun minggu ini? Di tempat saya turun 200 perak.",
    images: [],
    likes: 8,
    commentsCount: 5,
    isLiked: false,
    isBookmarked: false,
    comments: []
 }
];
