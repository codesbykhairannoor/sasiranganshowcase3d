export const MOTIFS_DATA = [
  {
    id: 'bayam-raja',
    title: 'Motif Bayam Raja',
    subtitle: 'Kepemimpinan & Kemakmuran (Presidential Centerpiece)',
    color: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.6)',
    textureUrl: '/textures/bayam_raja.png',
    // Mounted directly on the North End Wall of the Grand Gallery Corridor!
    position: [0, 5.0, -22],
    rotation: [0, 0, 0],
    philosophy: 'Menggambarkan sulur daun bayam raja yang tumbuh tegak, subur, dan memberi manfaat bagi lingkungan sekitarnya. Motif ini mengandung doa dan filosofi kepemimpinan yang mengayomi, martabat luhur, dan kesejahteraan masyarakat.',
    sdgImpact: 'SDG 11 & SDG 8 — Kota Berkelanjutan & Ekonomi Kreatif: Pemberdayaan komunitas pengrajin lokal (mayoritas perempuan dan ibu rumah tangga) di Banjarmasin untuk menciptakan ekosistem kemandirian ekonomi berbasis budaya.',
    facts: [
      'Secara tradisi diperuntukkan bagi pemimpin atau tokoh masyarakat.',
      'Garis vertikal melambangkan hubungan harmonis manusia dengan Tuhan.',
      'Menjadi motif standar untuk kemitraan diplomatik budaya Kalimantan Selatan.'
    ]
  },
  {
    id: 'gigi-haruan',
    title: 'Motif Gigi Haruan',
    subtitle: 'Ketajaman Berpikir & Ketangkasan (Left Wing Masterpiece)',
    color: '#f43f5e',
    glowColor: 'rgba(244, 63, 94, 0.6)',
    textureUrl: '/textures/gigi_haruan.png',
    // Mounted directly on the Left Wall of the Grand Gallery Corridor!
    position: [-7.8, 5.0, 6],
    rotation: [0, Math.PI / 2, 0],
    philosophy: 'Terinspirasi dari deretan gigi ikan haruan (gabus) khas rawa Kalimantan yang tajam dan kuat. Motif ini melambangkan ketajaman pemikiran, kewaspadaan, dan kebijaksanaan dalam mengambil keputusan di tengah dinamika zaman modern.',
    sdgImpact: 'SDG Target 11.4 — Melestarikan Warisan Budaya & Alam: Transformasi motif klasik ke dalam ekosistem digital/metaverse meningkatkan *brand value* Sasirangan di kancah global, mendukung produksi fashion berkelanjutan yang menggunakan pewarna alami ramah lingkungan.',
    facts: [
      'Digunakan oleh bangsawan Banjar pada upacara adat sakral.',
      'Melambangkan perlindungan diri dan keteguhan prinsip.',
      'Proses pembuatan teknik jumputan membutuhkan ketelitian presisi 0.1 mm.'
    ]
  },
  {
    id: 'kambang-kacang',
    title: 'Motif Kambang Kacang',
    subtitle: 'Persaudaraan & Gotong Royong (Right Wing Masterpiece)',
    color: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.6)',
    textureUrl: '/textures/kambang_kacang.png',
    // Mounted directly on the Right Wall of the Grand Gallery Corridor!
    position: [7.8, 5.0, -6],
    rotation: [0, -Math.PI / 2, 0],
    philosophy: 'Terinspirasi dari bunga kacang panjang yang merambat dan saling mengait tidak pernah putus. Melambangkan ikatan persaudaraan yang abadi, kesetiaan, gotong royong, dan keharmonisan sosial yang saling menopang satu sama lain.',
    sdgImpact: 'SDG 11 — Komunitas Perkotaan yang Inklusif: Membangun resiliensi kota melalui keharmonisan sosial, menghapus sekat-sekat perbedaan, dan menjadikan seni tradisi sebagai jembatan persatuan generasi muda.',
    facts: [
      'Sering dijadikan hadiah pernikahan sebagai simbol cinta abadi.',
      'Pola sulur lengkung melambangkan kelembutan budi pekerti.',
      'Melambangkan sinergi antar elemen masyarakat dalam membangun peradaban.'
    ]
  }
];

export const SDG_INFO = {
  title: "SDG 11: Sustainable Cities & Communities",
  subTheme: "Culture Verse — Branding for Impact",
  target: "Target 11.4: Strengthen efforts to protect and safeguard the world’s cultural and natural heritage.",
  description: "Di era disrupsi digital, kota berkelanjutan bukan hanya tentang infrastruktur beton dan teknologi cerdas, tetapi juga tentang mempertahankan identitas jiwa dan warisan budaya (Cultural Heritage). Melalui proyek 'Sasirangan Metaverse', kami mentransformasikan kain adat tradisi leluhur menjadi aset brand agensi high-tech yang relevan bagi generasi Z dan Alpha.",
  stats: [
    { label: "Pengrajin Terberdayakan", value: "1,200+" },
    { label: "Pewarna Alami Ramah Lingkungan", value: "100%" },
    { label: "Pengurangan Limbah Tekstil", value: "65%" },
    { label: "Peningkatan Nilai Brand Global", value: "3.5x" }
  ]
};
