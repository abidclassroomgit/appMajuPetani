export const HAMA_PENYAKIT_DATA = [
  {
    id: 1,
    nama: "Wereng Coklat",
    category: "Hama",
    severity: "Tinggi",
    thumbnail: "🦟",
    shortDesc: "Hama penghisap pada tanaman padi yang dapat menyebabkan gagal panen",
    ciriCiri: [
      "Daun menguning dari ujung dan tepi",
      "Tanaman menjadi kerdil dan tidak berkembang",
      "Bercak coklat pada batang bawah",
      "Tanaman mudah roboh saat ditekan"
    ],
    penyebab: "Kelembaban tinggi (>80%) dengan suhu 25-30°C, populasi meningkat saat musim hujan, dan penggunaan pupuk nitrogen berlebihan",
    solusi: [
      "Tanam varietas tahan wereng seperti IR64, Ciherang, atau Inpari 32",
      "Pergiliran tanaman dengan kacang-kacangan atau jagung",
      "Semprot pestisida nabati dari daun mimba (10 lembar/liter air) atau bawang putih (5 siung dihaluskan/liter)",
      "Pasang perangkap cahaya kuning di malam hari"
    ],
    pencegahan: [
      "Jaga jarak tanam 25x25cm agar sirkulasi udara baik",
      "Hindari pemupukan nitrogen berlebihan",
      "Bersihkan gulma dan sisa tanaman setelah panen",
      "Monitor populasi wereng sejak awal tanam"
    ],
    tanamanTerserang: ["Padi"],
    imageUrl: "https://via.placeholder.com/400x300?text=Wereng+Coklat"
  },
  {
    id: 2,
    nama: "Blas Daun (Blast)",
    category: "Penyakit",
    severity: "Tinggi",
    thumbnail: "🍂",
    shortDesc: "Penyakit jamur yang menyerang daun, batang, dan malai padi",
    ciriCiri: [
      "Bercak kecil berbentuk belah ketupat berwarna coklat di daun",
      "Bagian tengah bercak berwarna abu-abu atau putih",
      "Daun mengering dan mati",
      "Malai patah dan gabah hampa"
    ],
    penyebab: "Jamur Pyricularia oryzae yang berkembang pada suhu 25-28°C dengan kelembaban tinggi dan kabut pagi",
    solusi: [
      "Semprot fungisida nabati dari daun sirih (20 lembar direbus 1 liter air)",
      "Gunakan larutan belerang 2 gram/liter air",
      "Buang dan bakar bagian tanaman yang terserang",
      "Kurangi pemupukan nitrogen, tambah kalium dan fosfor"
    ],
    pencegahan: [
      "Pilih varietas tahan seperti Ciherang, IR64, Memberamo",
      "Jarak tanam teratur untuk sirkulasi udara",
      "Drainase sawah harus baik",
      "Gunakan benih sehat dan bersertifikat"
    ],
    tanamanTerserang: ["Padi"],
    imageUrl: "https://via.placeholder.com/400x300?text=Blas+Daun"
  },
  {
    id: 3,
    nama: "Ulat Grayak",
    category: "Hama",
    severity: "Sedang",
    thumbnail: "🐛",
    shortDesc: "Ulat pemakan daun yang menyerang tanaman jagung dan padi",
    ciriCiri: [
      "Daun berlubang-lubang atau hanya tersisa tulang daun",
      "Kotoran ulat berwarna hijau di sekitar tanaman",
      "Ulat berwarna hijau kecoklatan dengan garis kuning di punggung",
      "Menyerang dalam kelompok besar"
    ],
    penyebab: "Populasi meningkat saat musim kemarau dan awal musim hujan, terutama pada lahan yang banyak gulma",
    solusi: [
      "Ambil ulat secara manual pada pagi atau sore hari",
      "Semprot larutan daun pepaya (1 kg daun dihaluskan + 5 liter air)",
      "Gunakan pestisida nabati dari biji mahoni atau nimba",
      "Pasang perangkap feromon untuk ngengat dewasa"
    ],
    pencegahan: [
      "Bersihkan gulma di sekitar lahan",
      "Tanam tanaman perangkap seperti bunga kertas di pinggir lahan",
      "Monitor telur dan ulat kecil sejak awal",
      "Pergiliran tanaman dengan kacang-kacangan"
    ],
    tanamanTerserang: ["Jagung", "Padi", "Kedelai"],
    imageUrl: "https://via.placeholder.com/400x300?text=Ulat+Grayak"
  },
  {
    id: 4,
    nama: "Antraknosa Cabai",
    category: "Penyakit",
    severity: "Tinggi",
    thumbnail: "🌶️",
    shortDesc: "Penyakit jamur yang menyerang buah cabai dan menyebabkan busuk",
    ciriCiri: [
      "Bercak bulat berwarna coklat pada buah",
      "Buah membusuk dan berlendir",
      "Bercak meluas dengan cepat saat hujan",
      "Buah gugur sebelum matang"
    ],
    penyebab: "Jamur Colletotrichum sp. yang aktif pada kelembaban tinggi >80% dan suhu 20-30°C",
    solusi: [
      "Semprot fungisida nabati dari bawang putih + cabai + deterjen (100ml/10 liter air)",
      "Gunakan larutan kapur sirih 1%",
      "Buang buah yang terserang dan bakar",
      "Kurangi kelembaban dengan pruning daun berlebihan"
    ],
    pencegahan: [
      "Jarak tanam cukup (50x70cm) untuk sirkulasi udara",
      "Mulsa plastik untuk mencegah percikan air hujan",
      "Drainase lahan harus baik",
      "Pangkas daun tua dan ranting tidak produktif"
    ],
    tanamanTerserang: ["Cabai", "Tomat", "Terong"],
    imageUrl: "https://via.placeholder.com/400x300?text=Antraknosa+Cabai"
  },
  {
    id: 5,
    nama: "Tikus Sawah",
    category: "Hama",
    severity: "Tinggi",
    thumbnail: "🐀",
    shortDesc: "Hama perusak tanaman padi dari fase vegetatif hingga panen",
    ciriCiri: [
      "Batang padi terpotong di pangkal",
      "Bulir padi dimakan dan berkurang",
      "Ada bekas gigitan di batang dan daun",
      "Terdengar suara di malam hari"
    ],
    penyebab: "Populasi tikus meningkat saat musim panen, lahan dengan banyak semak dan gulma",
    solusi: [
      "Gropyokan (berburu massal) secara berkelompok",
      "Pasang bubu/perangkap bambu di pematang sawah",
      "Tanaman serentak (tanam bersama petani sekitar)",
      "Umpan beracun dari campuran beras + klerat (jauhkan dari anak-anak dan hewan peliharaan)"
    ],
    pencegahan: [
      "Bersihkan semak dan gulma di pematang",
      "Buramkan sarang tikus sebelum tanam",
      "Tanam serentak dalam satu hamparan",
      "Pagar keliling dengan seng setinggi 50cm"
    ],
    tanamanTerserang: ["Padi", "Jagung"],
    imageUrl: "https://via.placeholder.com/400x300?text=Tikus+Sawah"
  },
  {
    id: 6,
    nama: "Lalat Buah",
    category: "Hama",
    severity: "Sedang",
    thumbnail: "🪰",
    shortDesc: "Hama yang menyerang buah cabai, tomat, dan jeruk",
    ciriCiri: [
      "Buah berlubang kecil (bekas tusukan lalat)",
      "Buah busuk dari dalam",
      "Ada belatung putih di dalam buah",
      "Buah gugur sebelum matang"
    ],
    penyebab: "Populasi meningkat saat musim buah, terutama cuaca lembab",
    solusi: [
      "Pasang perangkap metil eugenol (bisa beli di toko pertanian) atau botol bekas isi air gula + sedikit insektisida",
      "Bungkus buah muda dengan plastik atau kertas",
      "Buang dan kubur buah yang terserang",
      "Semprot pestisida nabati dari daun sirsak atau mimba"
    ],
    pencegahan: [
      "Pasang perangkap sejak bunga mulai muncul",
      "Sanitasi kebun: buang buah busuk",
      "Panen buah tepat waktu",
      "Bungkus buah sejak masih muda"
    ],
    tanamanTerserang: ["Cabai", "Tomat", "Jeruk", "Jambu"],
    imageUrl: "https://via.placeholder.com/400x300?text=Lalat+Buah"
  }
];
