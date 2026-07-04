<template>
  <section id="featured" class="about-section py-24 relative overflow-hidden">
    <!-- Grunge background layers -->
    <div class="about-grain"></div>
    <div class="about-scratches"></div>

    <!-- Floating decorative doodles -->
    <div class="about-doodle ad-note1 reveal">♪</div>
    <div class="about-doodle ad-note2 reveal">♫</div>
    <div class="about-doodle ad-star1 reveal">✦</div>
    <div class="about-doodle ad-star2 reveal">★</div>
    <div class="about-doodle ad-heart reveal">♥</div>
    <div class="about-doodle ad-arrow reveal">→</div>

    <!-- Film strip decoration (left edge) -->
    <div class="about-filmstrip reveal hidden lg:block">
      <div class="filmstrip-holes">
        <span v-for="n in 18" :key="n"></span>
      </div>
    </div>

    <div class="max-w-300 mx-auto px-6 relative z-10">

      <!-- Section label tape -->
      <div class="inline-block relative mb-14 reveal">
        <div class="tape top" style="left:30%; width:80px; transform:rotate(-5deg)"></div>
        <div class="bg-red text-cream2 font-bang text-[1.1rem] md:text-[1.3rem] tracking-[.08em] py-2 px-5 -rotate-2 shadow-[3px_3px_0_#000,0_0_20px_rgba(192,39,10,.2)]">
          TENTANG KREASI
        </div>
      </div>

      <!-- Main two-column layout -->
      <div class="about-grid grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10 lg:gap-14 items-start">

        <!-- ═══════════════════════════════ -->
        <!-- LEFT COLUMN: Title & Decorations -->
        <!-- ═══════════════════════════════ -->
        <div class="relative rv-left">
          
          <!-- Torn paper title block -->
          <div class="about-torn-paper relative bg-[#e8dcc0] p-8 md:p-10 shadow-[4px_8px_24px_rgba(0,0,0,.7)] mb-8">
            <!-- Coffee stain decoration -->
            <!-- <div class="coffee-stain"></div> -->

            <div class="font-hand text-[.85rem] text-[#8a6040] tracking-[.08em] mb-2">catatan tentang kami</div>
            <h2 class="font-bang text-[clamp(2.8rem,8vw,4.5rem)] tracking-[.04em] leading-[.9] text-[#1a0e00] [text-shadow:2px_2px_0_rgba(0,0,0,.15)] mb-3">
              TENTANG<br>
              <span class="text-red">KREASI</span>
            </h2>
            <div class="w-[60px] h-[3px] bg-red mb-4"></div>
            <p class="font-hand text-[1rem] text-[#5a3a10] leading-[1.6] italic">
              Membuka halaman pertama dari buku kenangan yang menyimpan 10 tahun perjalanan.
            </p>
          </div>

          <!-- Vintage stamp "Since 2015" -->
          <!-- <div class="about-stamp reveal rotate-[-8deg] inline-block mb-8">
            <div class="stamp-inner">
              <div class="font-bang text-[.65rem] tracking-[.25em] uppercase">ESTABLISHED</div>
              <div class="font-bang text-[1.6rem] leading-none tracking-[.08em]">2015</div>
              <div class="font-type text-[.5rem] tracking-[.15em] uppercase mt-0.5">SISFO · FST · UINAM</div>
            </div>
          </div> -->

          <!-- Polaroid photo with tape -->
          <div class="relative reveal mt-4 hidden md:block">
            <div class="tape top" style="left:40%; width:70px; transform:rotate(3deg)"></div>
            <div class="bg-cream2 p-[10px_10px_40px] rotate-[4deg] shadow-[4px_8px_20px_rgba(0,0,0,.7),0_0_0_1px_rgba(0,0,0,.3)] max-w-[280px]">
              <img 
                src="https://drive.google.com/thumbnail?id=17iZ9FCOJTgFmBrx2JKaZdND8PvYmFj9P&sz=w600" 
                alt="Keluarga KREASI"
                referrerpolicy="no-referrer"
                class="w-full aspect-[4/3] object-cover sepia-[.4] contrast-[1.1] brightness-[.95]"
                @error="e => e.target.src='https://drive.google.com/thumbnail?id=17iZ9FCOJTgFmBrx2JKaZdND8PvYmFj9P&sz=w600'"
              >
              <div class="font-hand text-[.95rem] text-[#3a2a10] text-center pt-2.5">Satu rumah, satu cerita</div>
            </div>
          </div>

          <!-- Small tilted secondary polaroid -->
          <div class="absolute -bottom-4 -right-4 lg:-right-10 reveal hidden md:block">
            <div class="bg-cream2 p-[5px_5px_24px] rotate-[-6deg] shadow-[3px_5px_14px_rgba(0,0,0,.6)] w-[100px]">
              <div class="tape tl" style="width:40px; height:14px;"></div>
              <img 
                src="https://drive.google.com/thumbnail?id=1WUO7ykjpa5Eb9v-mKXcX5CHeSqYB-ALN&sz=w200" 
                alt="Kreasi Memory"
                referrerpolicy="no-referrer"
                class="w-full aspect-square object-cover sepia-[.5] contrast-[1.05]"
                @error="e => e.target.style.display='none'"
              >
            </div>
          </div>

          <!-- Ink stamp decoration -->
          <!-- <div class="about-ink-stamp hidden lg:flex reveal">
            <svg viewBox="0 0 80 80" class="w-[70px] h-[70px]">
              <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(192,39,10,.25)" stroke-width="3"/>
              <circle cx="40" cy="40" r="30" fill="none" stroke="rgba(192,39,10,.2)" stroke-width="1.5"/>
              <text x="40" y="36" text-anchor="middle" fill="rgba(192,39,10,.3)" font-family="Bangers" font-size="8" letter-spacing="2">KREASI</text>
              <text x="40" y="48" text-anchor="middle" fill="rgba(192,39,10,.25)" font-family="Bangers" font-size="11" letter-spacing="1">SI</text>
            </svg>
          </div> -->
        </div>

        <!-- ═══════════════════════════════ -->
        <!-- RIGHT COLUMN: Notebook Content  -->
        <!-- ═══════════════════════════════ -->
        <div class="rv-right">
          <div class="about-notebook relative">
            <!-- Spiral binding holes -->
            <div class="absolute left-[14px] top-0 bottom-0 flex-col justify-evenly items-center w-5 hidden md:flex">
              <div v-for="n in 8" :key="n" class="w-3.5 h-3.5 rounded-full bg-bg shadow-[inset_0_1px_3px_rgba(0,0,0,.5)]"></div>
            </div>

            <!-- Notebook header tag -->
            <div class="notebook-tag font-type text-[.68rem] tracking-[.12em] uppercase text-[#6a4020] mb-3 flex items-center gap-1.5">
              KREASI SI — CATATAN SEJARAH
            </div>

            <!-- ── BLOCK 1: Apa itu KREASI? ── -->
            <div class="about-block mb-8 reveal">
              <div class="flex items-start gap-3 mb-3">
                <!-- Hand-drawn book icon --> 
                <div>
                  <h3 class="font-marker text-[clamp(1.2rem,2.5vw,1.6rem)] text-[#2a1200] leading-[1.2] mb-1">Apa itu KREASI?</h3>
                </div>
              </div>
              <p class="font-type text-[.82rem] text-[#3a2a10] leading-[1.95] ">
                KREASI (Kreativitas dan solidaritas sistem informasi) merupakan salah satu rangkaian kegiatan kaderisasi yang menjadi wadah bagi mahasiswa sistem informasi uinam untuk membangun kebersamaan, mempererat melalui hubungan kekeluargaan, serta menumbuhkan rasa solidaritas antara anggota. berbagai kegiatan yang dilakukan secara bersama-sama, peserta diberikan kesempatan untuk berinteraksi lebih dekat, mengenal karakter satu sama lain, dan membangun kemampuan bekerja dalam tim. kreasi juga menjadi sarana untuk menanamkan nilai-nilai kebersamaan, loyalits, dan tanggung jawab sebagai bagian dari keluarga sistem informasi
              </p>
            </div>

            <!-- Decorative divider -->

            <!-- ── BLOCK 2: Tujuan KREASI ── -->
            <div class="about-block mb-8 reveal">
              <div class="flex items-start gap-3 mb-3">
                <!-- Hand-drawn compass/target icon -->
                <div>
                  <h3 class="font-marker text-[clamp(1.2rem,2.5vw,1.6rem)] text-[#2a1200] leading-[1.2] mb-1">Tujuan KREASI</h3>
                </div>
              </div>
                <ul class="font-type text-[.82rem] text-[#3a2a10] leading-[1.95]">
                  <li>1. Menjadi sarana bagi anggota muda untuk berinteraksi, berkolaborasi, dan bekerja sama secara langsung dalam mencapai tujuan bersama.</li>
                  <li>2. Mempererat hubungan kekeluargaan dan solidaritas antaranggota angkatan maupun dalam lingkup Keluarga Besar Sistem Informasi.</li>
                  <li>3. Menjadi wadah untuk saling mengenal karakter, potensi, dan kemampuan masing-masing anggota serta membangun kerja sama yang baik dalam organisasi.</li>
                </ul>
            </div>

            <!-- Decorative divider -->
            <!-- <div class="flex items-center gap-3 my-6 mx-0 md:mx-[52px]">
              <div class="flex-1 h-px bg-[#c8b890]"></div>
              <div class="flex-1 h-px bg-[#c8b890]"></div>
            </div> -->

            <!-- ── BLOCK 3: Awal Mula KREASI ── -->
            <div class="about-block mb-6 reveal">
              <div class="flex items-start gap-3 mb-3">
                <!-- Hand-drawn seedling/origin icon -->
                <div>
                  <h3 class="font-marker text-[clamp(1.2rem,2.5vw,1.6rem)] text-[#2a1200] leading-[1.2] mb-1">Awal Mula KREASI</h3>
                </div>
              </div>
              <p class="font-type text-[.82rem] text-[#3a2a10] leading-[1.95]">
                KREASI (Kreativitas dan Solidaritas Sistem Informasi) lahir dari kebutuhan untuk membangun hubungan yang lebih erat antar mahasiswa Sistem Informasi UIN Alauddin Makassar. Seiring bertambahnya jumlah setiap angkatan, diperlukan sebuah wadah yang tidak hanya menjadi tempat berkumpul, tetapi juga mampu menumbuhkan rasa kekeluargaan, solidaritas, dan kebersamaan di lingkungan Keluarga Besar Sistem Informasi. mahasiswa
                <br><br>
                Berangkat dari semangat tersebut, KREASI kemudian dibentuk sebagai salah satu rangkaian kegiatan kaderisasi yang berfokus pada penguatan hubungan antaranggota. Kegiatan ini dirancang untuk memberikan ruang bagi mahasiswa agar dapat saling mengenal lebih dekat, memahami karakter satu sama lain, serta membangun kerja sama melalui berbagai aktivitas yang edukatif dan menyenangkan.
                <br><br>
                Sejak pertama kali dilaksanakan, KREASI terus berkembang menjadi kegiatan yang memiliki peran penting dalam mempererat ikatan antar mahasiswa Sistem Informasi. Nilai-nilai kebersamaan, loyalitas, tanggung jawab, dan solidaritas yang ditanamkan dalam setiap pelaksanaannya menjadikan KREASI sebagai salah satu tradisi yang memperkuat identitas dan semangat kekeluargaan di lingkungan Sistem Informasi UIN Alauddin Makassar.
              </p>
            </div>

            <!-- Closing quote block -->
            <div class="border-l-[3px] border-red pl-4 mt-8 mb-3 reveal">
              <p class="font-hand text-[1rem] md:text-[1.1rem] text-[#5a3a10] italic leading-[1.6]">
                "Beda angkatan, beda logo, beda wajah — tapi tetap satu rumah yang sama. 10 tahun bukan sekadar angka, tapi bukti bahwa KREASI adalah cerita yang tidak pernah selesai ditulis."
              </p>
            </div>
            <div class="ml-0 md:ml-[52px] font-hand text-[.75rem] text-[#8a6040] pl-5 notebook-attribution">Catatan pelaku KREASI, 2025</div>
          </div>

          <!-- Torn paper accent note -->
          <div class="mt-8 reveal">
            <div class="about-accent-note bg-[#a05828] py-3.5 px-5 rotate-1 shadow-[3px_3px_10px_rgba(0,0,0,.5)] max-w-[320px] ml-auto relative">
              <div class="tape tr" style="width:50px; height:15px; right:15px; top:-8px;"></div>
              <p class="font-hand text-[.88rem] text-[#f8e0b0] leading-[1.65]">
                "Satu dekade, sebelas angkatan, satu cerita panjang yang sama. Ini baru halaman pertama." ✎
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom decorative elements -->
      <div class="flex justify-between items-end mt-16 flex-wrap gap-6 reveal">
        <!-- Ink blot -->
        
        <!-- Page number -->
        <!-- <div class="font-type text-[.7rem] text-tan opacity-40 tracking-[.15em]">
          — halaman 01 dari ∞ —
        </div> -->

        <!-- Small doodle -->
        <!-- <div class="font-hand text-[1rem] text-orange opacity-30 rotate-[5deg]">
          ♪ ★ ♫
        </div> -->
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
/* ── About section background ── */
.about-section {
  background: 
    radial-gradient(ellipse 80% 60% at 30% 40%, rgba(26, 23, 16, .95), transparent),
    linear-gradient(180deg, #0f0d08 0%, #1a1710 40%, #1a1710 60%, #0f0d08 100%);
}

/* ── Grain texture overlay ── */
.about-grain {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: .03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
}

/* ── Scratch marks overlay ── */
.about-scratches {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: .015;
  background-image:
    linear-gradient(45deg, transparent 48%, rgba(255,255,255,.4) 49%, rgba(255,255,255,.4) 51%, transparent 52%),
    linear-gradient(-30deg, transparent 48%, rgba(255,255,255,.3) 49%, rgba(255,255,255,.3) 51%, transparent 52%);
  background-size: 300px 300px, 250px 250px;
}

/* ── Torn paper effect ── */
.about-torn-paper {
  clip-path: polygon(
    0 8px, 3% 0, 6% 6px, 10% 2px, 14% 7px, 18% 0, 22% 5px, 
    28% 1px, 32% 6px, 38% 0, 42% 4px, 48% 1px, 52% 7px, 
    58% 0, 62% 5px, 68% 2px, 72% 6px, 78% 0, 82% 4px, 
    88% 1px, 92% 7px, 96% 0, 100% 5px,
    100% calc(100% - 5px), 97% 100%, 94% calc(100% - 4px), 
    90% 100%, 86% calc(100% - 6px), 82% 100%, 78% calc(100% - 3px),
    74% 100%, 70% calc(100% - 5px), 66% 100%, 62% calc(100% - 4px),
    58% 100%, 54% calc(100% - 6px), 50% 100%, 46% calc(100% - 3px),
    42% 100%, 38% calc(100% - 5px), 34% 100%, 30% calc(100% - 4px),
    26% 100%, 22% calc(100% - 6px), 18% 100%, 14% calc(100% - 3px),
    10% 100%, 6% calc(100% - 5px), 3% 100%, 0 calc(100% - 4px)
  );
}

/* ── Coffee stain ── */
.coffee-stain {
  position: absolute;
  bottom: 20px;
  right: 25px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: radial-gradient(circle, transparent 40%, rgba(139, 90, 40, .08) 50%, rgba(139, 90, 40, .12) 60%, transparent 70%);
  pointer-events: none;
}

/* ── Vintage stamp ── */
.about-stamp {
  border: 3px double rgba(192, 39, 10, .35);
  padding: 10px 18px;
  text-align: center;
  color: rgba(192, 39, 10, .4);
  position: relative;
}

.about-stamp::before {
  content: '';
  position: absolute;
  inset: 3px;
  border: 1px solid rgba(192, 39, 10, .2);
}

.stamp-inner {
  position: relative;
  z-index: 1;
}

/* ── Notebook (extends base .notebook) ── */
.about-notebook {
  background: #f8f0d8;
  padding: 2rem 1.75rem 2rem 1.75rem;
  position: relative;
  box-shadow: 3px 5px 18px rgba(0, 0, 0, .5), 0 0 0 1px rgba(0, 0, 0, .2);
  background-image:
    linear-gradient(#f8f0d8 29px, #c8b890 30px),
    linear-gradient(90deg, #e8935a 30px, transparent 30px);
  background-size: 100% 30px, 100% 100%;
}

@media (min-width: 768px) {
  .about-notebook {
    padding: 2rem 2.5rem 2rem 3.5rem;
  }
}

.about-notebook::before {
  content: '';
  position: absolute;
  left: 42px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #e8935a;
  opacity: .6;
  display: none;
}

@media (min-width: 768px) {
  .about-notebook::before {
    display: block;
  }
}

/* ── About block icon hover ── */
.about-icon {
  transition: transform .3s ease;
}

.about-block:hover .about-icon {
  transform: rotate(-8deg) scale(1.1);
}

/* ── Film strip decoration ── */
.about-filmstrip {
  position: absolute;
  left: 0;
  top: 10%;
  bottom: 10%;
  width: 28px;
  background: rgba(20, 15, 8, .9);
  z-index: 5;
  border-right: 2px solid rgba(139, 111, 58, .3);
}

.filmstrip-holes {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  padding: 8px 0;
}

.filmstrip-holes span {
  display: block;
  width: 12px;
  height: 8px;
  background: rgba(15, 13, 8, .95);
  border: 1px solid rgba(139, 111, 58, .2);
  border-radius: 1px;
}

/* ── Ink stamp ── */
.about-ink-stamp {
  position: absolute;
  bottom: -20px;
  left: 10px;
  transform: rotate(12deg);
  opacity: .6;
}

/* ── Floating doodles ── */
.about-doodle {
  position: absolute;
  z-index: 2;
  pointer-events: none;
  color: var(--color-orange);
  animation: aboutFloat 5s ease-in-out infinite;
}

@keyframes aboutFloat {
  0%, 100% { transform: translateY(0) rotate(var(--doodle-rot, 0deg)); }
  50% { transform: translateY(-8px) rotate(var(--doodle-rot, 0deg)); }
}

.ad-note1 {
  top: 8%;
  right: 12%;
  font-size: 2rem;
  opacity: .15;
  --doodle-rot: -15deg;
  animation-delay: 0s;
}

.ad-note2 {
  bottom: 15%;
  left: 8%;
  font-size: 1.6rem;
  opacity: .12;
  --doodle-rot: 10deg;
  animation-delay: 1.2s;
}

.ad-star1 {
  top: 20%;
  left: 5%;
  font-size: 1.2rem;
  opacity: .18;
  --doodle-rot: 5deg;
  animation-delay: 2.5s;
}

.ad-star2 {
  bottom: 25%;
  right: 6%;
  font-size: 1.8rem;
  opacity: .12;
  --doodle-rot: -8deg;
  animation-delay: .8s;
}

.ad-heart {
  top: 55%;
  right: 3%;
  font-size: 1.4rem;
  opacity: .1;
  --doodle-rot: 12deg;
  animation-delay: 1.8s;
}

.ad-arrow {
  bottom: 35%;
  left: 4%;
  font-size: 2.2rem;
  opacity: .08;
  --doodle-rot: -20deg;
  animation-delay: 3s;
}

/* ── Responsive ── */
@media (max-width: 600px) {
  .about-torn-paper {
    clip-path: none;
  }
}
</style>
