<template>
  <section id="generation" class="py-20 relative bg-bg2">
    <div class="max-w-[1200px] mx-auto px-6 pt-12 pb-12 relative z-2">
      <div class="mb-12">
        <div class="font-hand text-[.9rem] text-orange tracking-[.1em] flex items-center gap-2 reveal">
          <svg viewBox="0 0 20 20" fill="currentColor" class="w-[18px] h-[18px]"><path d="M10 1l2.4 7.3H20l-6.2 4.5 2.4 7.3L10 15.6 3.8 20l2.4-7.3L0 8.3h7.6z"/></svg>
          Tahun Angkatan
        </div>
        <h2 class="font-bang text-[clamp(2.2rem,7vw,4rem)] tracking-[.06em] leading-none text-cream2 [text-shadow:2px_2px_0_rgba(0,0,0,.8)] reveal">ANGKATAN</h2>
        <p class="font-hand text-[.9rem] text-tan opacity-80 mt-1.5 italic reveal">Setiap angkatan punya logo dan wajahnya sendiri. Klik untuk lihat kenangannya.</p>
      </div>

      <div class="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-4 relative z-2 max-w-[980px] mx-auto">
        <a
          v-for="y in angkatanData"
          :key="y.year"
          href="#gallery"
          class="angkatan-card group bg-paper p-4 text-center cursor-pointer block border border-[rgba(0,0,0,.2)] shadow-[3px_3px_10px_rgba(0,0,0,.5)] transition-[transform,box-shadow] duration-[.25s] ease-in-out hover:-translate-y-1.5 hover:-rotate-1 hover:shadow-[5px_8px_20px_rgba(0,0,0,.7)]"
          :data-year="y.year"
          @click.prevent="onCardClick(y.year)"
        >
          <div class="w-full aspect-square bg-white rounded flex items-center justify-center overflow-hidden border-2 border-[rgba(0,0,0,.15)] shadow-[inset_0_0_8px_rgba(0,0,0,0.08)] p-2 mb-2.5">
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
        </a>
      </div>

      <p class="reveal font-hand text-[.85rem] text-tan opacity-65 text-center mt-8">
        Galeri ini terhubung langsung ke folder "Kreasi SI 2015-2025" di Google Drive. 
      </p>

      <!-- Quote strips -->
      <div class="flex gap-6 mt-10 flex-wrap">
        <div class="bg-[#8b1a0a] py-2 px-4 font-hand text-[.85rem] text-[#f8d0a0] -rotate-2 shadow-[2px_2px_8px_rgba(0,0,0,.5)]">
          Kenangan tidak harus sempurna,<br>yang penting nyata. ♥
        </div>
        <div class="ml-auto font-hand text-[.85rem] text-cream opacity-70 text-right italic self-center">
          Bersama kita bisa,<br>bersama kita berarti.
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { angkatanData, driveImgUrl } from '../data.js'

const emit = defineEmits(['filter-year'])

function onCardClick(year) {
  emit('filter-year', String(year))
  setTimeout(() => {
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })
  }, 50)
}
</script>
