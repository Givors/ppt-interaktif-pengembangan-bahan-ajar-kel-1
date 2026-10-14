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
        s10_powered: "Didukung oleh platform & teknologi hebat:",

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
        s10_powered: "Powered by great platforms & technologies:",

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

function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.innerText = msg;
    toast.classList.remove('opacity-0', '-translate-y-2');
    toast.classList.add('opacity-100', 'translate-y-0');
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('opacity-100', 'translate-y-0');
        toast.classList.add('opacity-0', '-translate-y-2');
    }, 2000);
}

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
            specBox.innerHTML = `<p class="text-gray-400 italic">${t.s9_spec_placeholder}</p>`;
        }
    }
}

function updateSlide() {
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });

    // Pause video jika berpindah dari slide video (Slide 7 / index 6)
    const ytIframe = document.querySelector('iframe');
    if (ytIframe && currentSlide !== 6) {
        ytIframe.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }

    const indicator = document.getElementById('slide-indicator');
    if (indicator) {
        const t = translations[currentLang];
        indicator.innerText = `${t.slide_word} ${currentSlide + 1} ${t.of_word} ${totalSlides}`;
    }
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateSlide();
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlide();
    }
}

function goToSlide(index) {
    currentSlide = index;
    updateSlide();
    closeOverview();
}

function setTheme(color) {
    document.body.className = `theme-${color} flex flex-col h-screen overflow-hidden font-['Quicksand'] select-none`;
}

// Pop Up Modal
function openPopupKey(key) {
    if (!popupData[key]) return;
    const data = popupData[key][currentLang];
    document.getElementById('modal-title').innerText = data.title;
    document.getElementById('modal-desc').innerText = data.desc;
    document.getElementById('modal').classList.remove('hidden');
}

function openPopup(title, desc) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-desc').innerText = desc;
    document.getElementById('modal').classList.remove('hidden');
}

function closePopup() {
    document.getElementById('modal').classList.add('hidden');
}

// Slide Overview Modal
function openOverview() {
    const grid = document.getElementById('overview-grid');
    grid.innerHTML = '';
    const t = translations[currentLang];
    slides.forEach((_, index) => {
        const btn = document.createElement('button');
        btn.className = `p-3 rounded-2xl text-xs font-bold text-left transition border ${index === currentSlide ? 'bg-pink-500 text-white border-pink-500 shadow-sm' : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200'}`;
        btn.innerText = `${t.slide_word} ${index + 1}`;
        btn.onclick = () => goToExerciseSlide(index);
        grid.appendChild(btn);
    });
    document.getElementById('overview-modal').classList.remove('hidden');
}

function goToExerciseSlide(index) {
    goToSlide(index);
}

function closeOverview() {
    document.getElementById('overview-modal').classList.add('hidden');
}

// Quiz Logic (Slide 8)
function loadQuiz() {
    if (currentQuiz >= quizData.length) currentQuiz = 0;
    const data = quizData[currentQuiz];
    const qLang = data[currentLang] || data.id;
    const t = translations[currentLang];

    const progressEl = document.getElementById('quiz-progress');
    if (progressEl) {
        progressEl.innerText = `${t.s8_progress_prefix} ${currentQuiz + 1} ${t.s8_progress_mid} ${quizData.length}`;
    }

    const questionEl = document.getElementById('quiz-question');
    if (questionEl) {
        questionEl.innerText = qLang.q;
    }

    const feedbackEl = document.getElementById('quiz-feedback');
    if (feedbackEl) {
        feedbackEl.innerText = '';
    }
    
    const optionsBox = document.getElementById('quiz-options');
    if (!optionsBox) return;
    optionsBox.innerHTML = '';
    
    qLang.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = "p-3 rounded-2xl bg-gray-50 hover:bg-pink-50 hover:text-pink-600 font-bold text-xs text-gray-700 border border-gray-200 transition text-left cursor-pointer";
        btn.innerText = `${String.fromCharCode(65 + idx)}. ${opt}`;
        btn.onclick = () => checkQuiz(idx, data.correct);
        optionsBox.appendChild(btn);
    });
}

function checkQuiz(selected, correct) {
    const feedback = document.getElementById('quiz-feedback');
    const t = translations[currentLang];
    if (selected === correct) {
        feedback.className = "text-xs font-bold h-6 text-center text-emerald-600";
        feedback.innerText = t.quiz_correct;
        triggerCoinRain();
        setTimeout(() => {
            currentQuiz++;
            loadQuiz();
        }, 1500);
    } else {
        feedback.className = "text-xs font-bold h-6 text-center text-rose-500";
        feedback.innerText = t.quiz_wrong;
    }
}

function triggerCoinRain() {
    const container = document.getElementById('coin-container');
    if (!container) return;
    for (let i = 0; i < 15; i++) {
        const coin = document.createElement('div');
        coin.className = 'coin';
        coin.innerText = '🪙';
        coin.style.left = Math.random() * 90 + '%';
        coin.style.animationDelay = Math.random() * 0.5 + 's';
        container.appendChild(coin);
        setTimeout(() => coin.remove(), 1500);
    }
}

// Shopping Simulation (Slide 9)
function loadItems() {
    const list = document.getElementById('item-list');
    if (!list) return;
    list.innerHTML = '';
    items.forEach((item, idx) => {
        const itemData = item[currentLang] || item.id;
        const isSelected = selectedItemIndex === idx;
        const div = document.createElement('div');
        div.className = `p-2.5 rounded-xl ${isSelected ? 'bg-pink-100 border-pink-300' : 'bg-gray-50 hover:bg-pink-50 border-gray-200'} border cursor-pointer text-xs font-bold text-gray-700 flex justify-between items-center transition`;
        div.innerHTML = `<span>🛍️ ${itemData.name}</span><span class="text-pink-600">Rp ${item.price.toLocaleString('id-ID')}</span>`;
        div.onclick = () => selectItem(idx);
        list.appendChild(div);
    });
}

function selectItem(idx) {
    selectedItemIndex = idx;
    const item = items[idx];
    const itemData = item[currentLang] || item.id;
    const t = translations[currentLang];
    
    const specBox = document.getElementById('item-spec');
    if (specBox) {
        specBox.innerHTML = `<p class="font-bold text-gray-800 mb-1">${t.spec_prefix} ${itemData.name}:</p>` + 
            itemData.specs.map(s => `<p>${s}</p>`).join('');
    }
    
    const btnAgree = document.getElementById('btn-agree');
    if (btnAgree) {
        btnAgree.disabled = false;
        btnAgree.className = "mt-3 w-full py-2 bg-pink-500 text-white font-bold rounded-xl text-xs hover:bg-pink-600 transition cursor-pointer";
        btnAgree.innerText = t.s9_btn_agree;
    }

    loadItems(); // Refresh styling highlight pada list item
}

function proceedToPay() {
    if (selectedItemIndex === null) return;
    const item = items[selectedItemIndex];
    const t = translations[currentLang];

    document.getElementById('target-price').innerText = `Rp ${item.price.toLocaleString('id-ID')}`;
    document.getElementById('payment-instruction').innerText = `${t.drag_instruction_prefix} Rp ${item.price.toLocaleString('id-ID')} ${t.drag_instruction_suffix}`;
    
    const dropZone = document.getElementById('drop-zone');
    dropZone.innerHTML = `<span class="text-xs text-gray-600 font-bold">${t.s9_dropzone_default} (Target: Rp ${item.price.toLocaleString('id-ID')})</span>`;
    
    document.getElementById('payment-panel').className = "bg-white p-4 rounded-2xl shadow-xs border border-gray-100 flex flex-col justify-between transition-colors duration-300";
    document.getElementById('payment-status').innerText = t.s9_status_unpaid;
    document.getElementById('payment-status').className = "text-gray-400";
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.getAttribute('data-value'));
}

const dropZone = document.getElementById('drop-zone');
if (dropZone) {
    dropZone.addEventListener('dragover', (ev) => ev.preventDefault());
    dropZone.addEventListener('drop', (ev) => {
        ev.preventDefault();
        if (selectedItemIndex === null) return;
        const currentItem = items[selectedItemIndex];
        const val = parseInt(ev.dataTransfer.getData("text"));
        const panel = document.getElementById('payment-panel');
        const status = document.getElementById('payment-status');
        const t = translations[currentLang];
        
        if (val === currentItem.price) {
            panel.className = "bg-emerald-50 p-4 rounded-2xl shadow-xs border border-emerald-300 flex flex-col justify-between transition-colors duration-300";
            dropZone.innerHTML = `<span class="text-xs text-emerald-700 font-bold">${t.pay_success}</span>`;
            status.innerText = t.pay_status_success;
            status.className = "text-emerald-600 font-bold";
        } else {
            panel.className = "bg-rose-50 p-4 rounded-2xl shadow-xs border border-rose-300 flex flex-col justify-between transition-colors duration-300";
            dropZone.innerHTML = `<span class="text-xs text-rose-700 font-bold">${t.pay_fail_prefix} (Rp ${val.toLocaleString('id-ID')})</span>`;
            status.innerText = t.pay_status_fail;
            status.className = "text-rose-600 font-bold";
        }
    });
}

// Inisialisasi awal aman saat dokumen siap
document.addEventListener("DOMContentLoaded", () => {
    applyLanguage('id');
});