let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let currentLang = 'id';
let toastTimeout = null;

const translations = {
    id: {
        page_title: "Media Pembelajaran Interaktif: Jual Beli",
        nav_title: "Jual Beli • Kelas VII Fase D",
        nav_subtitle: "Pendidikan Khusus (Tunarungu)",
        nav_theme: "Tema:",
        nav_review: "Review Slide",

        // Slide 1: Cover
        s1_badge: "KURIKULUM MERDEKA • FASE D",
        s1_title: 'Mengenal Kegiatan <span class="text-pink-500">Jual Beli</span>',
        s1_subtitle: "Khusus Peserta Didik Hambatan Pendengaran (Tunarungu)",
        s1_authors_title: "Penyusun (Kelompok 1 - UNESA):",
        s1_lecturer_title: "Dosen Pengampu:",
        s1_badge_3d: "✨ 3D Interactive",

        // Slide 2: Tujuan Pembelajaran
        s2_title: "Tujuan Pembelajaran",
        s2_desc: "Setelah mempelajari materi ini, anak diharapkan dapat:",
        s2_goal1_title: "Arti Jual Beli",
        s2_goal1_desc: "Menjelaskan arti jual beli baik menggunakan bahasa isyarat maupun tulisan.",
        s2_goal2_title: "Mengenali Komponen",
        s2_goal2_desc: "Mengenali penjual, pembeli, barang, dan harga dengan tepat.",
        s2_goal3_title: "Langkah Transaksi",
        s2_goal3_desc: "Mengurutkan langkah-langkah bertransaksi secara mandiri.",
        s2_goal4_title: "Praktik Bertanggung Jawab",
        s2_goal4_desc: "Mempraktikkan secara jujur, sopan, dan bertanggung jawab.",

        // Slide 3: Pengertian & Kriteria
        s3_title: "Apa itu Jual Beli?",
        s3_desc: "Jual beli adalah kegiatan menukar barang atau jasa dengan uang berdasarkan kesepakatan. Transaksi hanya terjadi apabila kedua pihak sudah sepakat.",
        s3_req_title: "Syarat wajib dalam jual beli (Klik pop-up di bawah):",
        s3_card1_title: "1. Penjual",
        s3_card1_sub: "Klik untuk detail",
        s3_card2_title: "2. Barang",
        s3_card2_sub: "Klik untuk detail",
        s3_card3_title: "3. Alat Transaksi",
        s3_card3_sub: "Klik untuk detail",
        s3_card4_title: "4. Pembeli",
        s3_card4_sub: "Klik untuk detail",

        // Slide 4: Peran
        s4_title: "Peran Penjual dan Pembeli",
        s4_seller_title: "Peran Penjual",
        s4_seller_1: "✅ Menyediakan barang atau jasa",
        s4_seller_2: "✅ Menjelaskan harga dan kondisi barang",
        s4_seller_3: "✅ Menerima pembayaran sesuai kesepakatan",
        s4_buyer_title: "Peran Pembeli",
        s4_buyer_1: "✅ Memilih barang atau jasa",
        s4_buyer_2: "✅ Bertanya jika belum paham",
        s4_buyer_3: "✅ Membayar sesuai kesepakatan",

        // Slide 5: Langkah-Langkah
        s5_title: "Alur Langkah Jual Beli",
        s5_step1_h: "1. Pilih",
        s5_step1_p: "Memilih barang yang dibutuhkan.",
        s5_step1_b: "Langkah Awal",
        s5_step2_h: "2. Periksa",
        s5_step2_p: "Melihat kondisi dan harga barang.",
        s5_step2_b: "Cek Kualitas",
        s5_step3_h: "3. Sepakati",
        s5_step3_p: "Menyetujui harga bersama penjual.",
        s5_step3_b: "Deal Harga",
        s5_step4_h: "4. Bayar",
        s5_step4_p: "Membayar sesuai harga barang.",
        s5_step4_b: "Transaksi",
        s5_step5_h: "5. Cek Kembali",
        s5_step5_p: "Menerima dan memeriksa barang.",
        s5_step5_b: "Selesai",

        // Slide 6: Hak & Kewajiban
        s6_title: "Hak dan Kewajiban",
        s6_buyer_title: "🛒 Hak & Kewajiban Pembeli",
        s6_buyer_hak: '<strong class="text-pink-600">Hak Pembeli:</strong> Mendapat barang sesuai kesepakatan dan informasi harga yang jelas.',
        s6_buyer_kewajiban: '<strong class="text-pink-600">Kewajiban Pembeli:</strong> Membayar sesuai kesepakatan dan menjaga sikap sopan.',
        s6_seller_title: "🧑‍💼 Hak & Kewajiban Penjual",
        s6_seller_hak: '<strong class="text-emerald-600">Hak Penjual:</strong> Menerima pembayaran sesuai kesepakatan.',
        s6_seller_kewajiban: '<strong class="text-emerald-600">Kewajiban Penjual:</strong> Memberikan barang sesuai kesepakatan dan menjelaskan kondisi barang dengan jujur.',
        s6_scale_goods: "Barang Seimbang",
        s6_scale_money: "Nilai Uang Pas",

        // Slide 7: Video Animasi
        s7_title: "Video Animasi Jual Beli",
        s7_desc: "Tonton video animasi berikut agar kamu lebih paham tentang kegiatan jual beli!",
        s7_hint: "💡 Jika video tidak bisa diputar (Error 153), gunakan <b>Live Server</b> (localhost).",
        s7_yt_link: "Tonton di YouTube ↗",

        // Slide 8: Kuis
        s8_title: "Game: Choose the Right One!",
        s8_progress_prefix: "Soal",
        s8_progress_mid: "dari",

        // Slide 9: Simulasi
        s9_title: "Simulasi Belanja & Pembayaran",
        s9_desc: "Pilih barang, cek spesifikasinya dengan teliti, lalu bayar dengan menarik uang yang sesuai!",
        s9_item_title: "Pilih Barang:",
        s9_spec_title: "Cek Spesifikasi Barang:",
        s9_spec_placeholder: "Silakan pilih salah satu barang di samping untuk memeriksa kualitasnya.",
        s9_btn_agree: "Setuju & Lanjut Bayar",
        s9_cashier_title: "Kasir Pembayaran:",
        s9_cashier_inst_default: "Pilih barang dan setujui dulu untuk membayar.",
        s9_dropzone_default: "Seret uang ke sini untuk membayar",
        s9_total_label: "Total:",
        s9_status_unpaid: "Belum lunas",
        s9_wallet_title: "Dompet Uang:",

        // Slide 10: Penutup
        s10_title: "Terima Kasih! 🎉",
        s10_desc: "Semoga pembelajaran ini bermanfaat untuk kita semua.",
        s10_team: "Dan segenap tim kami",

        // Footer & Controls
        btn_prev: "Sebelumnya",
        btn_next: "Selanjutnya",
        slide_word: "Slide",
        of_word: "dari",
        modal_close: "Tutup",
        overview_title: "Pilih Slide",

        // Feedback / Dynamic strings
        quiz_correct: "🎉 Benar sekali! Hebat!",
        quiz_wrong: "❌ Belum tepat, coba lagi ya!",
        pay_success: "✅ Pembayaran Pas & Lunas!",
        pay_status_success: "Lunas (Berhasil)",
        pay_fail_prefix: "❌ Gagal! Nominal tidak sesuai",
        pay_status_fail: "Transaksi Gagal",
        spec_prefix: "Spesifikasi",
        drag_instruction_prefix: "Seret uang sejumlah",
        drag_instruction_suffix: "ke area kasir!"
    },
    en: {
        page_title: "Interactive Learning Media: Buying and Selling",
        nav_title: "Buying & Selling • Grade 7 Phase D",
        nav_subtitle: "Special Education (Deaf & Hard of Hearing)",
        nav_theme: "Theme:",
        nav_review: "Review Slides",

        // Slide 1: Cover
        s1_badge: "MERDEKA CURRICULUM • PHASE D",
        s1_title: 'Introduction to <span class="text-pink-500">Buying & Selling</span>',
        s1_subtitle: "Designed for Deaf and Hard of Hearing Students",
        s1_authors_title: "Authors (Group 1 - UNESA):",
        s1_lecturer_title: "Advising Lecturers:",
        s1_badge_3d: "✨ 3D Interactive",

        // Slide 2: Tujuan Pembelajaran
        s2_title: "Learning Objectives",
        s2_desc: "After completing this topic, students are expected to:",
        s2_goal1_title: "Meaning of Buying & Selling",
        s2_goal1_desc: "Explain the meaning of buying and selling through sign language or writing.",
        s2_goal2_title: "Recognize Components",
        s2_goal2_desc: "Accurately recognize sellers, buyers, goods, and prices.",
        s2_goal3_title: "Transaction Steps",
        s2_goal3_desc: "Sequence the steps of completing transactions independently.",
        s2_goal4_title: "Responsible Practice",
        s2_goal4_desc: "Practice transactions honestly, politely, and responsibly.",

        // Slide 3: Pengertian & Kriteria
        s3_title: "What is Buying and Selling?",
        s3_desc: "Buying and selling is the activity of exchanging goods or services for money based on mutual agreement. A transaction only happens when both parties agree.",
        s3_req_title: "Essential Requirements (Click the pop-ups below):",
        s3_card1_title: "1. Seller",
        s3_card1_sub: "Click for details",
        s3_card2_title: "2. Goods",
        s3_card2_sub: "Click for details",
        s3_card3_title: "3. Payment Tool",
        s3_card3_sub: "Click for details",
        s3_card4_title: "4. Buyer",
        s3_card4_sub: "Click for details",

        // Slide 4: Peran
        s4_title: "Roles of Seller and Buyer",
        s4_seller_title: "Seller's Role",
        s4_seller_1: "✅ Providing goods or services",
        s4_seller_2: "✅ Explaining prices and condition of goods",
        s4_seller_3: "✅ Receiving payment according to agreement",
        s4_buyer_title: "Buyer's Role",
        s4_buyer_1: "✅ Selecting goods or services",
        s4_buyer_2: "✅ Asking questions when unsure",
        s4_buyer_3: "✅ Paying according to agreement",

        // Slide 5: Langkah-Langkah
        s5_title: "Buying & Selling Steps Flow",
        s5_step1_h: "1. Choose",
        s5_step1_p: "Selecting the items needed.",
        s5_step1_b: "Initial Step",
        s5_step2_h: "2. Inspect",
        s5_step2_p: "Checking item condition and price.",
        s5_step2_b: "Quality Check",
        s5_step3_h: "3. Agree",
        s5_step3_p: "Agreeing on the price with the seller.",
        s5_step3_b: "Price Deal",
        s5_step4_h: "4. Pay",
        s5_step4_p: "Paying according to the item price.",
        s5_step4_b: "Transaction",
        s5_step5_h: "5. Re-check",
        s5_step5_p: "Receiving and inspecting items.",
        s5_step5_b: "Complete",

        // Slide 6: Hak & Kewajiban
        s6_title: "Rights and Obligations",
        s6_buyer_title: "🛒 Buyer Rights & Obligations",
        s6_buyer_hak: '<strong class="text-pink-600">Buyer Rights:</strong> Receive items as agreed and obtain clear pricing information.',
        s6_buyer_kewajiban: '<strong class="text-pink-600">Buyer Obligations:</strong> Pay according to agreement and maintain a polite attitude.',
        s6_seller_title: "🧑‍💼 Seller Rights & Obligations",
        s6_seller_hak: '<strong class="text-emerald-600">Seller Rights:</strong> Receive payment according to agreement.',
        s6_seller_kewajiban: '<strong class="text-emerald-600">Seller Obligations:</strong> Deliver items as agreed and describe item conditions honestly.',
        s6_scale_goods: "Fair Goods",
        s6_scale_money: "Exact Money",

        // Slide 7: Video Animasi
        s7_title: "Buying & Selling Animated Video",
        s7_desc: "Watch this animated video to better understand how buying and selling works!",
        s7_hint: "💡 If the video does not play (Error 153), please use <b>Live Server</b> (localhost).",
        s7_yt_link: "Watch on YouTube ↗",

        // Slide 8: Kuis
        s8_title: "Game: Choose the Right One!",
        s8_progress_prefix: "Question",
        s8_progress_mid: "of",

        // Slide 9: Simulasi
        s9_title: "Shopping & Payment Simulation",
        s9_desc: "Select an item, check specifications carefully, then pay by dragging the exact money!",
        s9_item_title: "Choose Item:",
        s9_spec_title: "Check Item Specifications:",
        s9_spec_placeholder: "Please select an item on the left to inspect its quality.",
        s9_btn_agree: "Agree & Proceed to Pay",
        s9_cashier_title: "Payment Cashier:",
        s9_cashier_inst_default: "Select an item and agree first to proceed to payment.",
        s9_dropzone_default: "Drag money here to pay",
        s9_total_label: "Total:",
        s9_status_unpaid: "Unpaid",
        s9_wallet_title: "Money Wallet:",

        // Slide 10: Penutup
        s10_title: "Thank You! 🎉",
        s10_desc: "We hope this interactive learning media is helpful for everyone.",
        s10_team: "And our entire development team",

        // Footer & Controls
        btn_prev: "Previous",
        btn_next: "Next",
        slide_word: "Slide",
        of_word: "of",
        modal_close: "Close",
        overview_title: "Select Slide",

        // Feedback / Dynamic strings
        quiz_correct: "🎉 Correct! Awesome job!",
        quiz_wrong: "❌ Not quite right, try again!",
        pay_success: "✅ Exact Payment & Paid in Full!",
        pay_status_success: "Paid (Success)",
        pay_fail_prefix: "❌ Failed! Amount does not match",
        pay_status_fail: "Transaction Failed",
        spec_prefix: "Specifications for",
        drag_instruction_prefix: "Drag money amounting to",
        drag_instruction_suffix: "to the cashier area!"
    }
};

// Data Pop-up Slide 3
const popupData = {
    seller: {
        id: { title: "Penjual", desc: "Orang yang menawarkan, menyediakan, dan menjual barang atau jasa kepada pembeli." },
        en: { title: "Seller", desc: "A person who offers, provides, and sells goods or services to buyers." }
    },
    goods: {
        id: { title: "Barang", desc: "Benda atau produk berwujud yang diperjualbelikan untuk memenuhi kebutuhan." },
        en: { title: "Goods / Items", desc: "Tangible items or products traded to meet various daily needs." }
    },
    payment_tool: {
        id: { title: "Alat Transaksi (Uang)", desc: "Alat tukar sah berupa uang tunai atau digital yang disepakati untuk pembayaran." },
        en: { title: "Payment Medium (Money)", desc: "Legal medium of exchange in cash or digital form agreed upon for payment." }
    },
    buyer: {
        id: { title: "Pembeli", desc: "Orang yang mencari, memilih, dan membayar barang atau jasa yang diinginkan." },
        en: { title: "Buyer", desc: "A person who searches for, selects, and pays for desired goods or services." }
    }
};

// Data Quiz Interaktif (Slide 8)
const quizData = [
    {
        id: {
            q: "Apa arti dari kegiatan jual beli?",
            options: ["Menukar barang dengan uang", "Membuang barang", "Menyimpan barang di rumah", "Meminta barang gratis"]
        },
        en: {
            q: "What is the meaning of buying and selling?",
            options: ["Exchanging goods for money", "Throwing away goods", "Storing goods at home", "Asking for free items"]
        },
        correct: 0
    },
    {
        id: {
            q: "Siapa pihak yang menawarkan barang dagangan?",
            options: ["Pembeli", "Penjual", "Kurir", "Penonton"]
        },
        en: {
            q: "Who is the party offering and selling merchandise?",
            options: ["Buyer", "Seller", "Courier", "Spectator"]
        },
        correct: 1
    },
    {
        id: {
            q: "Apa alat transaksi yang sah dan umum digunakan?",
            options: ["Daun kering", "Uang", "Batu", "Kertas biasa"]
        },
        en: {
            q: "What is the legal and commonly used payment medium?",
            options: ["Dry leaves", "Money", "Stones", "Plain paper"]
        },
        correct: 1
    },
    {
        id: {
            q: "Sebelum membeli barang, langkah apa yang sebaiknya dilakukan?",
            options: ["Langsung bayar tanpa lihat", "Memeriksa kondisi dan harga", "Merusak barang", "Menyembunyikan barang"]
        },
        en: {
            q: "Before purchasing an item, what step should you take?",
            options: ["Pay immediately without checking", "Check condition and price", "Damage the item", "Hide the item"]
        },
        correct: 1
    },
    {
        id: {
            q: "Apa hak seorang pembeli dalam kegiatan jual beli?",
            options: ["Mendapat barang sesuai kesepakatan", "Mengambil barang tanpa membayar", "Dimarahi penjual", "Tidak boleh bertanya"]
        },
        en: {
            q: "What is a buyer's right in buying and selling?",
            options: ["Receive items as agreed", "Take items without paying", "Get scolded by the seller", "Not allowed to ask questions"]
        },
        correct: 0
    }
];

// Data Barang Simulasi Belanja (Slide 9)
const items = [
    { 
        id: { name: "Sayuran", specs: ["1. Masih segar", "2. Sudah dipacking rapi", "3. Gampang membusuk jika di luar kulkas terlalu lama"] },
        en: { name: "Vegetables", specs: ["1. Freshly picked", "2. Neatly packaged", "3. Perishable if left outside fridge too long"] },
        price: 11000 
    },
    { 
        id: { name: "Boneka", specs: ["1. Bahan halus dan lembut", "2. Jahitan rapi dan kuat", "3. Cocok untuk mainan anak"] },
        en: { name: "Teddy Doll", specs: ["1. Soft and smooth material", "2. Strong and neat stitching", "3. Suitable for children"] },
        price: 154000 
    },
    { 
        id: { name: "Minuman", specs: ["1. Segar dan dingin", "2. Kemasan botol rapat", "3. Tanggal kedaluwarsa masih lama"] },
        en: { name: "Drink", specs: ["1. Fresh and cold", "2. Tightly sealed bottle", "3. Long expiration date"] },
        price: 15000 
    },
    { 
        id: { name: "Baju", specs: ["1. Bahan katun adem", "2. Ukuran pas di badan", "3. Warna tidak mudah luntur"] },
        en: { name: "Shirt", specs: ["1. Cool cotton fabric", "2. Comfortable fit", "3. Color does not fade easily"] },
        price: 200000 
    },
    { 
        id: { name: "Apel", specs: ["1. Manis dan renyah", "2. Sedikit memar di bagian kulit", "3. Kaya vitamin C"] },
        en: { name: "Apple", specs: ["1. Sweet and crisp", "2. Slight bruise on peel", "3. Rich in Vitamin C"] },
        price: 7500 
    }
];

let selectedItemIndex = null;
let currentQuiz = 0;

function toggleLang() {
    currentLang = currentLang === 'id' ? 'en' : 'id';
    applyLanguage(currentLang);
    showToast(currentLang === 'id' ? '🇮🇩 Bahasa diubah ke Indonesia' : '🇬🇧 Language switched to English');
}

function applyLanguage(lang) {
    document.documentElement.lang = lang;
    const btn = document.getElementById('lang-btn');
    if (btn) {
        btn.innerHTML = lang === 'id' ? '🇮🇩 ID / 🇬🇧 EN' : '🇬🇧 EN / 🇮🇩 ID';
    }

    const t = translations[lang];
    if (t) {
        if (t.page_title) document.title = t.page_title;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key] !== undefined) {
                el.innerHTML = t[key];
            }
        });
    }

    updateSlide();
    loadQuiz();
    loadItems();

    if (selectedItemIndex !== null) {
        selectItem(selectedItemIndex);
    } else {
        const specBox = document.getElementById('item-spec');
        if (specBox && t) {
            specBox.innerHTML = `<p class="muted">${t.s9_spec_placeholder}</p>`;
        }
    }
}

// ===== Teks tambahan (ID/EN) =====
Object.assign(translations.id, {
    tools_label: "Tampilan", btn_start: "Mulai Belajar", btn_restart: "Ulangi dari awal",
    cc_note: "Subtitle (CC) dinyalakan otomatis.",
    st_pick: "Pilih", st_check: "Periksa", st_pay: "Bayar", buy_again: "Belanja lagi",
    quiz_done_title: "Selesai! 🎉", quiz_score: "Skor kamu", quiz_again: "Main lagi",
    pay_more: "Uangnya terlalu banyak", pay_less: "Uangnya kurang", pay_wallet_hint: "Pilih barang dan setujui dulu."
});
Object.assign(translations.en, {
    tools_label: "Display", btn_start: "Start Learning", btn_restart: "Start over",
    cc_note: "Captions (CC) turn on automatically.",
    st_pick: "Choose", st_check: "Check", st_pay: "Pay", buy_again: "Shop again",
    quiz_done_title: "All done! 🎉", quiz_score: "Your score", quiz_again: "Play again",
    pay_more: "Too much money", pay_less: "Not enough money", pay_wallet_hint: "Choose an item and agree first."
});

// ===== Helper =====
const $ = id => document.getElementById(id);
const T = () => translations[currentLang];
const money = n => 'Rp ' + n.toLocaleString('id-ID');
const buzz = p => { try { navigator.vibrate && navigator.vibrate(p); } catch (e) {} };      // getar = umpan balik non-suara
const save = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
const load = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
const ITEM_EMOJI = ['🥬', '🧸', '🥤', '👕', '🍎'];
const THEMES = { red: '#fda4af', orange: '#fcd34d', yellow: '#fef08a', green: '#6ee7b7', blue: '#7dd3fc', purple: '#c4b5fd', pink: '#f9a8d4' };
const POP_EMOJI = { seller: '🧑‍💼', goods: '🧸', payment_tool: '💵', buyer: '🛒' };

function showToast(msg) {
    const t = $('toast'); t.innerText = msg; t.classList.add('show');
    clearTimeout(toastTimeout); toastTimeout = setTimeout(() => t.classList.remove('show'), 2200);
}
function rain(list = ['🪙', '⭐', '🎉'], id = 'coin-container') {
    const box = $(id); if (!box) return;
    for (let i = 0; i < 20; i++) {
        const c = document.createElement('span');
        c.className = 'coin'; c.innerText = list[i % list.length];
        c.style.left = Math.random() * 92 + '%'; c.style.animationDelay = Math.random() * .5 + 's';
        box.appendChild(c); setTimeout(() => c.remove(), 2400);
    }
}
function shake(el) { el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake'); }

// ===== Navigasi =====
function updateSlide() {
    slides.forEach((s, i) => { s.classList.toggle('active', i === currentSlide); s.inert = i !== currentSlide; });
    const yt = document.querySelector('iframe');
    if (yt && currentSlide !== 6) yt.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    const t = T();
    $('slide-indicator').innerText = `${t.slide_word} ${currentSlide + 1} ${t.of_word} ${totalSlides}`;
    $('bar').style.width = ((currentSlide + 1) / totalSlides * 100) + '%';
    $('prev').disabled = currentSlide === 0; $('next').disabled = currentSlide === totalSlides - 1;
    document.querySelectorAll('#dots button').forEach((b, i) => {
        b.setAttribute('aria-current', i === currentSlide);
        b.setAttribute('aria-label', `${t.slide_word} ${i + 1}: ${slides[i].querySelector('h2')?.innerText || ''}`);
    });
}
function go(i) {
    currentSlide = Math.max(0, Math.min(totalSlides - 1, i));
    updateSlide();
    const s = slides[currentSlide]; s.scrollTop = 0;
    s.querySelector('h2')?.focus({ preventScroll: true });
    if (currentSlide === 7 && currentQuiz >= quizData.length) resetQuiz();
}
function nextSlide() { go(currentSlide + 1); }
function prevSlide() { go(currentSlide - 1); }
function goToSlide(i) { go(i); }

// ===== Tampilan: tema & ukuran huruf =====
function setTheme(c) {
    document.body.className = `theme-${c}`; save('theme', c);
    document.querySelectorAll('.sw').forEach(b => b.setAttribute('aria-pressed', b.dataset.theme === c));
}
function cycleText() {
    const h = document.documentElement, n = h.classList.contains('t3') ? 1 : h.classList.contains('t2') ? 3 : 2;
    h.classList.remove('t2', 't3'); if (n > 1) h.classList.add('t' + n); save('text', n);
}

// ===== Slide 3: kartu detail (tanpa pop-up) =====
function openPopupKey(key) {
    const d = popupData[key]?.[currentLang]; if (!d) return;
    const box = $('detail');
    box.innerHTML = `<div class="row"><b class="em" aria-hidden="true">${POP_EMOJI[key]}</b><h3></h3></div><p></p>`;
    box.querySelector('h3').innerText = d.title; box.querySelector('p').innerText = d.desc;
    box.hidden = false; box.style.animation = 'none'; void box.offsetWidth; box.style.animation = '';
    document.querySelector(`.tile[data-k="${key}"]`).classList.add('seen');
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    if (document.querySelectorAll('.tile.seen').length === 4) { buzz(40); }
}

// ===== Slide 8: kuis =====
let score = 0, tries = 0, locked = false;
function loadQuiz() {
    if (currentQuiz >= quizData.length) return showEnd();
    $('quiz-box').hidden = false; $('quiz-end').hidden = true;
    const d = quizData[currentQuiz], q = d[currentLang] || d.id, t = T();
    $('quiz-progress').innerText = `${t.s8_progress_prefix} ${currentQuiz + 1} ${t.s8_progress_mid} ${quizData.length}`;
    $('quiz-bar').style.width = (currentQuiz / quizData.length * 100) + '%';
    $('quiz-question').innerText = q.q; $('quiz-feedback').innerText = ''; $('quiz-feedback').className = 'fb';
    $('mascot').innerText = '🙂'; locked = false;
    const box = $('quiz-options'); box.innerHTML = '';
    q.options.forEach((o, i) => {
        const b = document.createElement('button');
        b.className = 'opt'; b.innerHTML = `<i>${'ABCD'[i]}</i><span></span>`; b.lastChild.innerText = o;
        b.onclick = () => checkQuiz(i, d.correct, b); box.appendChild(b);
    });
}
function checkQuiz(i, correct, btn) {
    if (locked || btn.disabled) return;
    const fb = $('quiz-feedback'), t = T();
    if (i === correct) {
        locked = true; btn.classList.add('ok'); fb.className = 'fb ok'; fb.innerText = t.quiz_correct;
        $('mascot').innerText = '🥳'; if (tries === 0) score++; tries = 0;
        rain(); buzz(40); currentQuiz++;
        setTimeout(loadQuiz, 1500);
    } else {
        btn.classList.add('bad'); btn.disabled = true; tries++;
        fb.className = 'fb bad'; fb.innerText = t.quiz_wrong; $('mascot').innerText = '🤔';
        shake($('quiz-box')); buzz([80, 40, 80]);
    }
}
function showEnd() {
    const t = T(), n = quizData.length, stars = score >= n ? 3 : score >= n - 2 ? 2 : 1;
    $('quiz-bar').style.width = '100%'; $('quiz-box').hidden = true;
    const end = $('quiz-end'); end.hidden = false;
    end.innerHTML = `<div class="big" aria-hidden="true">${'⭐'.repeat(stars)}${'☆'.repeat(3 - stars)}</div><h3>${t.quiz_done_title}</h3><p>${t.quiz_score}: <b>${score}/${n}</b></p><button class="btn" onclick="resetQuiz()">↺ ${t.quiz_again}</button>`;
    if (currentSlide === 7) { rain(['⭐', '🎉', '🪙']); buzz([40, 30, 40, 30, 80]); }
}
function resetQuiz() { currentQuiz = 0; score = 0; tries = 0; loadQuiz(); }

// ===== Slide 9: simulasi belanja =====
let agreed = false;
function setStep(n) {
    document.querySelectorAll('#stepper li').forEach((li, i) => { li.classList.toggle('on', i === n - 1); li.classList.toggle('done', i < n - 1); });
}
function loadItems() {
    const list = $('item-list'); list.innerHTML = '';
    items.forEach((it, i) => {
        const d = it[currentLang] || it.id, b = document.createElement('button');
        b.className = 'item' + (i === selectedItemIndex ? ' sel' : ''); b.setAttribute('aria-pressed', i === selectedItemIndex);
        b.innerHTML = `<b class="em" aria-hidden="true">${ITEM_EMOJI[i]}</b><span>${d.name}</span><em>${money(it.price)}</em>`;
        b.onclick = () => selectItem(i); list.appendChild(b);
    });
}
function selectItem(i) {
    if (i !== selectedItemIndex) { agreed = false; clearPay(); }
    selectedItemIndex = i;
    const d = items[i][currentLang] || items[i].id, t = T();
    $('item-spec').innerHTML = `<p><b>${t.spec_prefix} ${d.name}:</b></p>` + d.specs.map(s => `<p>${s}</p>`).join('');
    const b = $('btn-agree'); b.disabled = false; b.innerText = t.s9_btn_agree;
    setStep(agreed ? 3 : 2); loadItems(); renderWallet();
}
function proceedToPay() {
    if (selectedItemIndex === null) return;
    const p = items[selectedItemIndex].price, t = T(); agreed = true;
    $('target-price').innerText = money(p);
    $('payment-instruction').innerText = `${t.drag_instruction_prefix} ${money(p)} ${t.drag_instruction_suffix}`;
    setStep(3); renderWallet(); $('wallet').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
function renderWallet() {
    const w = $('wallet'); w.innerHTML = '';
    [7500, 11000, 15000, 154000, 200000].forEach((v, k) => {
        const b = document.createElement('button');
        b.className = 'bill b' + k; b.innerText = '💵 ' + money(v); b.disabled = !agreed;
        b.draggable = true; b.dataset.value = v;
        b.ondragstart = drag; b.onclick = () => pay(v); w.appendChild(b);
    });
}
function clearPay() {
    const t = T();
    $('payment-panel').className = 'panel'; $('target-price').innerText = 'Rp 0';
    $('payment-instruction').innerText = t.s9_cashier_inst_default;
    $('drop-zone').innerHTML = `<span>${t.s9_dropzone_default}</span>`;
    const s = $('payment-status'); s.innerText = t.s9_status_unpaid; s.style.color = ''; $('btn-again').hidden = true;
}
function resetShop() {
    selectedItemIndex = null; agreed = false; clearPay(); setStep(1); loadItems(); renderWallet();
    $('item-spec').innerHTML = `<p class="muted">${T().s9_spec_placeholder}</p>`;
    const b = $('btn-agree'); b.disabled = true; b.innerText = T().s9_btn_agree;
}
function pay(val) {
    const t = T(); if (!agreed) return showToast(t.pay_wallet_hint);
    const price = items[selectedItemIndex].price, panel = $('payment-panel'), s = $('payment-status'), z = $('drop-zone');
    if (val === price) {
        panel.className = 'panel ok'; z.innerHTML = `<b>${t.pay_success}</b>`;
        s.innerText = t.pay_status_success; s.style.color = '#047857'; $('btn-again').hidden = false;
        document.querySelectorAll('.bill').forEach(b => b.disabled = true);
        rain(['🎉', '🪙', '🛍️'], 'coins-9'); buzz([40, 30, 40, 30, 80]);
    } else {
        panel.className = 'panel bad';
        z.innerHTML = `<b>${val > price ? '⬆️ ' + t.pay_more : '⬇️ ' + t.pay_less}</b><span>${money(val)} → ${money(price)}</span>`;
        s.innerText = t.pay_status_fail; s.style.color = '#be123c'; shake(panel); buzz([80, 40, 80]);
    }
}
function drag(ev) { ev.dataTransfer.setData('text', ev.target.dataset.value); }

// ===== Inisialisasi =====
window.setTheme = setTheme;
window.cycleText = cycleText;
window.toggleLang = toggleLang;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.goToSlide = goToSlide;
window.go = go;

document.addEventListener('DOMContentLoaded', () => {
    const swBox = $('swatches');
    if (swBox) {
        swBox.innerHTML = Object.entries(THEMES).map(([k, c]) => `<button class="sw" type="button" style="--c:${c}" data-theme="${k}" aria-label="Tema ${k}"></button>`).join('');
        swBox.addEventListener('click', e => {
            const sw = e.target.closest('.sw');
            if (sw && sw.dataset.theme) setTheme(sw.dataset.theme);
        });
    }
    $('dots').innerHTML = [...slides].map((_, i) => `<button type="button" onclick="go(${i})"></button>`).join('');
    setTheme(load('theme') || 'pink');
    const n = +load('text'); if (n > 1) document.documentElement.classList.add('t' + n);
    const z = $('drop-zone');
    z.addEventListener('dragover', e => { e.preventDefault(); z.classList.add('over'); });
    z.addEventListener('dragleave', () => z.classList.remove('over'));
    z.addEventListener('drop', e => { e.preventDefault(); z.classList.remove('over'); pay(parseInt(e.dataTransfer.getData('text'))); });
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') nextSlide(); else if (e.key === 'ArrowLeft') prevSlide();
    });
    let x0 = 0, y0 = 0; const main = document.querySelector('main');
    main.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    main.addEventListener('touchend', e => {
        if (e.target.closest('#wallet, iframe')) return;
        const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
        if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.8) dx < 0 ? nextSlide() : prevSlide();
    }, { passive: true });
    applyLanguage('id'); setStep(1); renderWallet();
});
