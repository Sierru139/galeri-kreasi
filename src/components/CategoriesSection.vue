<template>
  <section id="generation" class="py-20 relative bg-bg2">
    <div class="max-w-[1200px] mx-auto px-6 pt-12 pb-12 relative z-2">
      <div class="mb-12">
        <div class="font-hand text-[.9rem] text-orange tracking-[.1em] flex items-center gap-2 reveal">
          <!-- <svg viewBox="0 0 20 20" fill="currentColor" class="w-[18px] h-[18px]"><path d="M10 1l2.4 7.3H20l-6.2 4.5 2.4 7.3L10 15.6 3.8 20l2.4-7.3L0 8.3h7.6z"/></svg> -->
          Tahun Angkatan
        </div>
        <h2 class="font-bang text-[clamp(2.2rem,7vw,4rem)] tracking-[.06em] leading-none text-cream2 [text-shadow:2px_2px_0_rgba(0,0,0,.8)] reveal">LOGO <span class="text-orange">KREASI</span></h2>
        <p class="font-hand text-[.9rem] text-tan opacity-80 mt-1.5 italic reveal">Setiap angkatan kreasi punya logo dan wajahnya sendiri. Klik untuk melihat filosofi logonya.</p>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 relative z-2 max-w-[980px] mx-auto">
        <div
          v-for="y in angkatanData"
          :key="y.year"
          class="angkatan-card group bg-paper p-4 text-center cursor-pointer block border border-[rgba(0,0,0,.2)] shadow-[3px_3px_10px_rgba(0,0,0,.5)] transition-[transform,box-shadow] duration-[.25s] ease-in-out hover:-translate-y-1.5 hover:-rotate-1 hover:shadow-[5px_8px_20px_rgba(0,0,0,.7)]"
          :data-year="y.year"
          @click="openLogoModal(y)"
        >
          <div class="w-full aspect-square bg-white rounded flex items-center justify-center overflow-hidden mb-2.5">
            <img
              :src="driveImgUrl(y.logo, 300)"
              :alt="'Logo ' + y.year"
              loading="lazy"
              referrerpolicy="no-referrer"
              class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
              @error="e => e.target.src = `https://drive.google.com/thumbnail?id=${y.logo}&sz=w300`"
            >
          </div>
          <div class="font-bold text-[1.1rem] tracking-[.08em] text-[#2a1800]">{{ y.year }}</div>
          <div class="font-hand text-[.75rem] text-[#6a4a20] mt-0.5 leading-tight">{{ y.desc }}</div>
        </div>
      </div>

      <p class="reveal font-hand text-[.85rem] text-tan opacity-65 text-center mt-8">
        Galeri ini terhubung langsung ke folder "Kreasi SI 2015-2025" di Google Drive. 
      </p>

      <!-- Quote strips -->
      <div class="flex gap-6 mt-10 flex-wrap">
        <div class="bg-[#8b1a0a] py-2 px-4 font-hand text-[.85rem] text-[#f8d0a0] -rotate-2 shadow-[2px_2px_8px_rgba(0,0,0,.5)]">
          Kenangan tidak harus sempurna,<br>yang penting nyata.
        </div>
        <div class="ml-auto font-hand text-[.85rem] text-cream opacity-70 text-right italic self-center">
          Bersama kita bisa,<br>bersama kita berarti.
        </div>
      </div>
    </div>
  </section>

  <!-- Fullscreen Logo Detail Modal -->
  <Transition name="fade">
    <div 
      v-if="selectedLogo" 
      class="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
      @click="closeLogoModal"
    >
      <!-- Close Button -->
      <button 
        class="absolute top-4 right-4 md:top-6 md:right-6 text-cream/70 hover:text-white bg-black/40 hover:bg-black/70 p-2.5 rounded-full transition-colors cursor-pointer z-50 flex items-center justify-center border border-white/10"
        aria-label="Tutup Detail"
        @click.stop="closeLogoModal"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Modal Content Box -->
      <div 
        class="bg-[#1a140b] border border-[rgba(176,128,60,0.3)] shadow-[0_15px_50px_rgba(0,0,0,0.9)] rounded-[2px] max-w-4xl w-full max-h-[90vh] md:max-h-[80vh] overflow-hidden relative flex flex-col md:flex-row animate-in fade-in zoom-in duration-300"
        @click.stop
      >
        <!-- Left Side: Large Logo View -->
        <div class="md:flex-1 bg-[#110c06] p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-[rgba(176,128,60,0.15)] min-h-[200px] md:min-h-[400px] shrink-0">
          <img 
            :src="driveImgUrl(selectedLogo.logo, 800)" 
            :alt="'Logo ' + selectedLogo.year"
            class="max-w-full max-h-[200px] md:max-h-[400px] object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]"
            @error="e => { if (selectedLogo) e.target.src = `https://drive.google.com/thumbnail?id=${selectedLogo.logo}&sz=w800` }"
          />
        </div>

        <!-- Right Side: Details / Philosophy -->
        <div class="md:flex-1 flex flex-col min-h-0 overflow-hidden">
          <!-- Sticky header (title + desc) -->
          <div class="p-6 md:p-8 pb-0 md:pb-0 shrink-0">
            <div class="font-bang text-[2.5rem] md:text-[3.5rem] tracking-[.06em] leading-none text-orange mb-1.5 [text-shadow:2px_2px_0_rgba(0,0,0,.8)]">
              ANGKATAN {{ selectedLogo.year }}
            </div>
            <div class="font-hand text-[1.1rem] md:text-[1.3rem] text-cream opacity-95 italic mb-4 border-b border-[rgba(176,128,60,0.25)] pb-3">
              "{{ selectedLogo.desc }}"
            </div>
          </div>
          
          <!-- Scrollable philosophy content -->
          <div class="overflow-y-auto flex-1 min-h-0 px-6 md:px-8 pb-6 md:pb-8">
            <div class="font-bold text-[0.7rem] tracking-[0.18em] uppercase text-orange mb-2">Filosofi & Deskripsi Logo</div>
            <p class="font-hand text-base md:text-lg text-cream2/90 leading-relaxed italic" v-html="getPhilosophy(selectedLogo.year)">
            </p>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'
import { angkatanData, driveImgUrl } from '../data.js'

// Philosophies / descriptions for each batch logo
const philosophies = {
  2015: "-",
  2016: "-",
  2017: 'Pohon: POHON KAMI PILIH KARENA POHON MEMILIKI BANYAK MANFAAT, BAIK ITU BAGI MANUSIA DAN LINGKUNGANNYA SENDIRI <br><br> Akar: MAKNA 2 AKAR SEBAGAI SIMBOL 2 KREASI TERDAHULU, DIMANA AKAR DI LAMBANGKAN SEBAGAI PONDASI UTAMA <br><br> Batang: BATANG SEBAGAI TEMPAT TUMBUHNYA RANTING DAN DAUN, DIMANA BATANG DI LAMBANGKAN SEBAGAI JURUSAN SISTEM INFORMASI <br><br> Ranting: RANTING SEBAGAI SIMBOL PENGORBANAN, DIMANA RANTING DI LAMBANGKAN SEBAGAI KETUJUAN <br><br> Daun: DAUN SEBAGAI SIMBOL KEBAIKAN, DIMANA DAUN DI LAMBANGKAN SEBAGAI KEHIDUPAN <br><br> Daun: DAUN MEMILIKI MAKNA KESETARAAN DIMANA 3 DAUN MERUPAKAN 3 PILAR YANG DIBANGUN DI JURUSAN SISTEM INFORMASI <br><br> Kreasi Lingkaran: KREASI BERBENTUK LINGKARAN ARTINYA KREASI YANG HARUS TERLAKSANA TIAP TAHUNNYA SEBAGAI BENTUK PROSES BAGI MAHASISWA BARU SISTEM NFORMASI',
  2018: "Logo: LOGO KREASI 2018 YAITU TANGAN SEBAGAI ALAT UNTUK MENGAMBIL DATA DATA KREASI SEBELUMNYA SEBAGAI PANDANGAN UNTU KREASI YANG LEBIH BAIK <br><br> 3 Jari: 3 JARI YANG MASIH TEGAK MELAMBANGKAN 3 PILAR YANG MASIH TEHAK SAMPAI SEKARAN <br><br> Logo: LOGO KREASI YANG MELAMBANGKAN GARIS TANGA YANG DIMAKSUDKAN ADALAH TAKDIR BAGI MABA SISTEM INFORMAS <br><br> Jari Jempol: JARI JEMPOL MELAMBANGKAN KREASI YANG AKAN LEBIH BAIK DARI KREASI SEBELIUMNYA <br><br> Jari kelingking: JARI KELINGKING MELAMBANGKAN KREASI YANG DILAKSANAKAN ATAS PERSAUDARAANDAN KERJASAM <br><br> 3 Arus Data; 3 ARUS DATA MELAMBANGKA 3 KREASI SEBELUMNY <br><br> 2018: IDENTITAS DARI LOGO KREASI 2018",
  2019: "Isolator: SEBAGAI SUMBER ENERGI PEMAKNAAN SEMANGAT DAN MOTIVASI UNTUK TERUS BERPROSES DALAM SISTEM INFORMASI <br><br>Sekrup Ulir: SEBAGAI MAKNA TELAH TERLAKSANANYA KREASI SELAMA 4 PERIODE ANGKATAN DALAM SISTEM INFORMASI <br><br>2019: SEBAGAI IDENTITAS ANGKATAN <br><br>Kreasi: SEBAGAI SIMBOL KREATIVITAS DAN SOLIDARITAS DALAM SISTEM INFORMASI <br><br>3 Pancaran Cahaya: MELAMBANGKAN 3 PILAR YANG TETAP DIPERTAHANKAN DAN DIPEGANG TEGUH DAN TAK LUPA UNTUK DI IMPLEMENTASIKA <br><br>Lampu: SEBAGAI SUMBER CAHAYA PENERANG PEMIKIRAN DAN SIKAP UNTUK MENGAMBIL SEBUAH TINDAKAN ATAU KEPUTUSAN BAGI ANGKATAN 2019 SISTEM INFORMASI <br>",
  2020: "Logo kreasi 020 kali ini diangkat berdasarkan tema yang mengandung kearifan lokal, khususnya di Sulawesi Selatan <br><br> air Melambangkan kegigihan dalam berproses sebagaimana genangan air yang mampu bersabar dalam menghadapi suatu masalah <br><br> angin angin yang bergerak bebas tetap bisa memberikan kita suasana tontram dan nyaman sehingga membawa semangat dalam berproses dan mengisi tiap kekosongan yang ada <br><br> tanah Kokoh dalam solidaritas dan nyata berproses di jurusan Sistem Informasi <br><br> api Membakar Semangat Berproses Di Sistem Informasi <br><br> 4 Unsur Alam Tersebut Melambangkan Sebuah Identitas Dari Sulapa Eppa' Yang Merupakan Unsur Kejadian Manusia ",
  2021: "Mengapa Turbin?<br>Karena Turbin mengambil energi dari kecepatan udara menjadi putaran yang sangat tinggi bagaikan kreasi terus berjalan karena para pelaku-pelaku kreasi yang siap berkorban sehingga kreasi siap mengudara<br><br>Logo kreasi ditengah artinya sebagai pusat dalam membentuk kreatifitas dan solidaritas bagi mahasiswa baru sistem informasi<br><br>Lingkaran berputar secar dinamis dan terus menerus, tidak memiliki akhir, yang artinya dalam kreasi ini kita akan lebih mempertebal ikatan yang hingga tidak mudah terputus meski dalam kehidupan ibarat roda berputar yang mana kita sering merasakan bahagia dan sedih bersama-sama tapi karena adanya ikatan yang kuat maka kita akan terus barsama sehingga tidak akan pernah ada kata akhir untuk ikatan ini.<br><br>7 bilah baling melingkar dengan satu arah dengan arti angkatan ini bergerak bersama pada satu arah untuk kreasi, bilah baling-baling membentuk orang mengepalkan tangan ke arah lingkaran sehingga menciptakan semangat kebersamaan dan 7 bermakna bahwa kreasi 2021 adalah kreasi ke-7<br><br>Putaran angin bermakna sebagai pendorong berputarnya turbin dimana turbin dapat berjalan atau berputar sebagaimana kreasi ini berjalan dengan dorongan semangat dan kerja keras",
  2022: "Logo Kreasi: Logo Kreasi ditengah artinya sebagai simbol utama kreatifitas dan solidaritas sistem informasi <br><br>Mengapa Bambu?: 1. Pada tahun pertama, kedua dan ketiga bambu tumbuh hanya beberapa centimeter saja namun berfokus pada pertumbuhan akarnya lalu pada tahun berikutnya bambu mulai menampakan tumbuhnya ke atas dengan subur dan kuat. Hal ini berarti kita harus mengutamakan fondasi terlebih dahulu agar bisa tegap dalam melalui semua rintangan.<br>2. Bambu tumbuh berdampingan yang berarti kita harus selalu Bersama berdampingan agar kuat, dalam menghadapi sebuah masalah, seperti bambu yang sedang menerima hembusan angin yang kuat Ketika tumbuh semakin tinggi ke atas.<br><br>Tangan: Tangan-tangan yang saling menarik melambangkan semangat gotong royong, tolong menolong, dan bekerja sama dalam membentuk kebersamaan untuk menciptakan karya yang luar biasa melalui kolaborasi yang erat. Pada logo ini terdapat 8 jumlah tangan yang mewakili penyelenggaraan kreasi yang ke-8. Ini menujukan bahwa kreasi akan terus bertumbuh dan berkelanjutan seiring dengan kreativitas para pelaku pelaku kreasi.",
  2023: "MATAHARI: <br>Matahari kekuatan dan vitalitas dari kepemimpinan serta kesatuan dan persatuan di antara semua individu yang terlibat. Cahaya matahari yang menyebar mengisyaratkan penyebaran pengetahuan dan semangat baru yang lahir dari momen inaugurasi ini, menandakan bahwa acara ini adalah awal dari era baru yang membawa harapan dan kebahagiaan.<br><br>LOGO KREASI:<br>Logo kreasi ialah simbol utama kreatifitas dan solidaritas sistem informasi<br><br>BULAN SABIT: <br>Bulan sabit melambangkan awal yang baru dan harapan yang mencerminkan bagaimana setiap persahabatan dimulai dengan keinginan untuk saling mengenal dan membangun harapan untuk kreasi yang lebih baik.<br><br>SINAR MATAHARI: <br>Sinar matahari melambangkan keberanian dan semangat untuk menghadapi tantangan. Dalam persahabatan, ini menggambarkan bagaimana teman-teman saling memberi semangat dan keberanian untuk mengatasi rintangan. pada logo ini terdapat 9 sinar matahari yang melambangkan penyelenggaraan kreasi yang ke-9.<br><br>API: <br>Api sering kali dikaitkan dengan semangat yang membara dan energi yang tidak pernah padam, di mana kita saling memberi energi dan semangat untuk menghadapi berbagai tantangan. Tiga layer api melambangkan 3 pilar yang tetap dipertahankan.",
  2024: "SIMPUL TALI:<br>Tali melambangkan kekuatan, keterikatan, dan kesinambungan, di mana susunan tali yang membentuk lingkaran menggambarkan bahwa setiap individu dalam angkatan saling terhubung. Simpul tali menjadi simbol ikatan yang erat dan tidak mudah lepas, mencerminkan komitmen, kesatuan visi dan misi, serta ikatan emosional dan tanggung jawab satu sama lain.r>LOGO KREASI:<br>Logo KREASI Berada ditengah menjadi lambang utama semangat Kreatifitas & Solidaritas Sistem Informasi.r>LINGKARAN:<br>Lingkaran menggambarkan harmoni dan keterhubungan yang utuh antar Individu. Tanpa awal dan akhir, bentuk ini menyimbolkan kebersamaan yang abadi dan saling melengkapi, menciptakan ikatan yang kuat dan tak terpisahkan.r>TALI:<br>Di tengah, tali yang terjalin tebal melambangkan bahwa kekuatan sejati lahir dari perpaduan, bukan perindividu. Satu helai mudah rapuh, tapi dalam kebersamaan, muncul keteguhan. mewakili ketirakatan seperti tali yang tampak biasa, namun menyimpan kekuatan karena terjalin erat, tak menuntut terlihat, cukup. Jumlah daun tali 24 menggambarkan angkatan tahun 2024",
  2025: "Coming soon"
}

function getPhilosophy(year) {
  return philosophies[year] || "Deskripsi filosofi logo kreasi untuk angkatan ini belum diunggah."
}

const selectedLogo = ref(null)

function openLogoModal(y) {
  selectedLogo.value = y
}

function closeLogoModal() {
  selectedLogo.value = null
}

const onKeyDown = (e) => {
  if (e.key === 'Escape') closeLogoModal()
}

watch(selectedLogo, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
  } else {
    document.body.style.overflow = ''
    window.removeEventListener('keydown', onKeyDown)
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeyDown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
