<template>
  <section id="featured" class="py-20 relative bg-bg2">
    <div class="max-w-[1200px] mx-auto px-6">
      <div class="featured-label inline-block bg-red text-cream2 font-bang text-[1.1rem] tracking-[.08em] py-1.5 px-3.5 -rotate-3 shadow-[3px_3px_0_#000] mb-10 relative reveal">★ KENANGAN TERFAVORIT</div>
      <div class="featured-grid grid grid-cols-2 gap-12 items-start">

        <!-- Left: Image -->
        <div class="relative rv-left">
          <div class="pushpin" style="top:-12px;left:50%;transform:translateX(-50%)"></div>
          <div class="bg-cream2 p-[12px_12px_50px] -rotate-3 shadow-[4px_8px_24px_rgba(0,0,0,.8),0_0_0_1px_rgba(0,0,0,.4)]">
            <img src="https://drive.google.com/thumbnail?id=17iZ9FCOJTgFmBrx2JKaZdND8PvYmFj9P&sz=w900" alt="Kreasi"
                 referrerpolicy="no-referrer"
                 class="w-full aspect-[4/3] object-cover sepia-[.4] contrast-[1.1]"
                 @error="e => e.target.src='https://drive.google.com/thumbnail?id=17iZ9FCOJTgFmBrx2JKaZdND8PvYmFj9P&sz=w900'">
            <div class="font-hand text-[1.1rem] text-[#3a2a10] text-center pt-2">Satu rumah, Satu cerita</div>
          </div>

          <div class="feat-secondary absolute -bottom-[30px] -right-[25px] bg-cream2 p-[6px_6px_30px] rotate-[8deg] shadow-[3px_6px_16px_rgba(0,0,0,.7)] w-[120px]">
            <div class="tape tl"></div>
            <img src="https://drive.google.com/thumbnail?id=1WUO7ykjpa5Eb9v-mKXcX5CHeSqYB-ALN&sz=w300&sz=w300" alt="Angkatan 2016"
                 referrerpolicy="no-referrer"
                 class="w-full aspect-square object-cover sepia-[.5]"
                 @error="e => e.target.src='https://drive.google.com/thumbnail?id=https://drive.google.com/thumbnail?id=1w7bVYUY0DOHG-Y33rba99MW12IzkxKcU&sz=w300&sz=w300'">
            <!-- <div class="font-hand text-[.65rem] text-[#3a2a10] text-center pt-1">2025 ✨</div> -->
          </div>
        </div>

        <!-- Right: Notebook -->
        <div class="rv-right">
          <div class="notebook">
            <div class="absolute left-[14px] top-0 bottom-0 flex flex-col justify-evenly items-center w-5">
              <div class="w-3.5 h-3.5 rounded-full bg-bg shadow-[inset_0_1px_3px_rgba(0,0,0,.5)]"></div>
              <div class="w-3.5 h-3.5 rounded-full bg-bg shadow-[inset_0_1px_3px_rgba(0,0,0,.5)]"></div>
              <div class="w-3.5 h-3.5 rounded-full bg-bg shadow-[inset_0_1px_3px_rgba(0,0,0,.5)]"></div>
              <div class="w-3.5 h-3.5 rounded-full bg-bg shadow-[inset_0_1px_3px_rgba(0,0,0,.5)]"></div>
              <div class="w-3.5 h-3.5 rounded-full bg-bg shadow-[inset_0_1px_3px_rgba(0,0,0,.5)]"></div>
              <div class="w-3.5 h-3.5 rounded-full bg-bg shadow-[inset_0_1px_3px_rgba(0,0,0,.5)]"></div>
            </div>
            <div class="notebook-tag font-type text-[.68rem] tracking-[.12em] uppercase text-[#6a4020] mb-1 flex items-center gap-1.5">
              KREASI SI — 2015 / 2025
              <span class="text-red text-[.9rem]">★</span>
            </div>
            <div class="font-marker text-[clamp(1.4rem,3vw,1.9rem)] text-[#2a1200] leading-[1.25] mt-2 mb-4">Dari Angkatan<br>ke Angkatan</div>
            <p class="font-type text-[.82rem] text-[#3a2a10] leading-[1.95] mb-5">
              Sepuluh tahun, sebelas angkatan, satu identitas yang sama: KREASI. Setiap tahun datang dengan wajah barunya sendiri — logo baru, wajah-wajah baru, cerita baru — tapi rumahnya selalu sama.
              <br><br>
              Dari angkatan 2015 hingga saat ini, jejak yang tersimpan ini adalah bukti bahwa satu rumah bisa menampung cerita yang berbeda, namun tetap menyatu jadi satu perjalanan panjang.
            </p>
            <div class="border-l-[3px] border-red pl-3.5 font-hand text-[.88rem] text-[#5a3a10] italic leading-[1.6] mb-2">
              "Beda angkatan, beda logo, beda wajah — tapi tetap satu rumah yang sama."
            </div>
            <div class="notebook-attribution font-hand text-[.75rem] text-[#8a6040] pl-5">Catatan pelaku KREASI</div>
          </div>

          <!-- Torn paper side note -->
          <div class="mt-6 bg-[#a05828] py-3 px-4 rotate-1 shadow-[3px_3px_10px_rgba(0,0,0,.5)] max-w-[280px] ml-auto">
            <p class="font-hand text-[.82rem] text-[#f8e0b0] leading-[1.6]">
              "Satu dekade, sebelas angkatan, satu cerita panjang yang sama."
            </p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
</script>
