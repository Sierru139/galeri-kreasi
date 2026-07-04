<template>
  <footer class="bg-[#080604] border-t-4 border-red p-0 overflow-hidden">
    <div class="ticket-footer grid grid-cols-[auto_1fr_auto] items-stretch border-t-2 border-b-2 border-dashed border-[rgba(176,128,60,.3)]">
      <div class="tf-left p-6 px-7 border-r-2 border-dashed border-[rgba(176,128,60,.25)] flex flex-col justify-center gap-2">
        <div class="font-bang text-[2rem] tracking-[.08em] text-orange [text-shadow:-2px_2px_0_#000,2px_2px_0_#000] leading-none">KREASI</div>
        <div class="font-hand text-[.7rem] text-tan tracking-[.1em]">est. 2015</div>
      </div>
      <div class="p-6 px-8 flex flex-col justify-center gap-1.5">
        <div class="font-type text-[.85rem] text-cream opacity-90 italic mb-1">"10 TAHUN PERJALANAN, 10 TAHUN CERITA"</div>
        <div class="font-hand text-[.75rem] text-tan opacity-70">Satu rumah, seribu kenangan, selamanya KREASI.</div>
        <div class="flex items-center gap-4 mt-2.5 flex-wrap">
          <span class="text-[.6rem] tracking-[.12em] uppercase text-tan opacity-50">FOLLOW US</span>
          <div class="flex gap-5 mt-0">
            <a href="#" class="inline-flex items-center gap-1.5 font-bold text-[.65rem] tracking-[.15em] uppercase text-tan opacity-60 transition-[opacity,color] duration-200 hover:opacity-100 hover:text-orange2">
              Instagram <FontAwesomeIcon :icon="byPrefixAndName.fab['instagram']" />
            </a>
            <a href="#" class="inline-flex items-center gap-1.5 font-bold text-[.65rem] tracking-[.15em] uppercase text-tan opacity-60 transition-[opacity,color] duration-200 hover:opacity-100 hover:text-orange2">
              YouTube <FontAwesomeIcon :icon="byPrefixAndName.fab['youtube']" />
            </a>
            <a href="#" class="inline-flex items-center gap-1.5 font-bold text-[.65rem] tracking-[.15em] uppercase text-tan opacity-60 transition-[opacity,color] duration-200 hover:opacity-100 hover:text-orange2">
              TikTok <FontAwesomeIcon :icon="byPrefixAndName.fab['tiktok']" />
            </a>
          </div>
        </div>
      </div>
      <div class="tf-right p-6 px-7 border-l-2 border-dashed border-[rgba(176,128,60,.25)] flex flex-col justify-center items-center gap-2">
        <!-- Barcode SVG -->
        <!-- <svg class="opacity-50" width="100" height="55" viewBox="0 0 100 55">
          <rect width="100" height="55" fill="none"/>
          <rect x="2" y="2" width="2" height="42" fill="var(--color-cream)"/>
          <rect x="6" y="2" width="1" height="42" fill="var(--color-cream)"/>
          <rect x="9" y="2" width="3" height="42" fill="var(--color-cream)"/>
          <rect x="14" y="2" width="1" height="42" fill="var(--color-cream)"/>
          <rect x="17" y="2" width="2" height="42" fill="var(--color-cream)"/>
          <rect x="21" y="2" width="1" height="42" fill="var(--color-cream)"/>
          <rect x="24" y="2" width="3" height="42" fill="var(--color-cream)"/>
          <rect x="29" y="2" width="2" height="42" fill="var(--color-cream)"/>
          <rect x="33" y="2" width="1" height="42" fill="var(--color-cream)"/>
          <rect x="36" y="2" width="2" height="42" fill="var(--color-cream)"/>
          <rect x="40" y="2" width="3" height="42" fill="var(--color-cream)"/>
          <rect x="45" y="2" width="1" height="42" fill="var(--color-cream)"/>
          <rect x="48" y="2" width="2" height="42" fill="var(--color-cream)"/>
          <rect x="52" y="2" width="1" height="42" fill="var(--color-cream)"/>
          <rect x="55" y="2" width="3" height="42" fill="var(--color-cream)"/>
          <rect x="60" y="2" width="2" height="42" fill="var(--color-cream)"/>
          <rect x="64" y="2" width="1" height="42" fill="var(--color-cream)"/>
          <rect x="67" y="2" width="2" height="42" fill="var(--color-cream)"/>
          <rect x="71" y="2" width="3" height="42" fill="var(--color-cream)"/>
          <rect x="76" y="2" width="1" height="42" fill="var(--color-cream)"/>
          <rect x="79" y="2" width="2" height="42" fill="var(--color-cream)"/>
          <rect x="83" y="2" width="1" height="42" fill="var(--color-cream)"/>
          <rect x="86" y="2" width="3" height="42" fill="var(--color-cream)"/>
          <rect x="91" y="2" width="2" height="42" fill="var(--color-cream)"/>
          <rect x="95" y="2" width="1" height="42" fill="var(--color-cream)"/>
          <rect x="98" y="2" width="2" height="42" fill="var(--color-cream)"/>
          <text x="50" y="53" text-anchor="middle" fill="var(--color-cream)" font-size="7" font-family="monospace" opacity=".7">KREASI 2025 ← 1 DEKADE →</text>
        </svg> -->
        <div class="font-type text-[.55rem] tracking-[.2em] uppercase text-tan opacity-60">1 DEKADE, 1 RUMAH, 1 CERITA</div>
      </div>
    </div>
    <div class="py-3 px-8 text-center font-type text-[.65rem] text-tan opacity-45 tracking-[.08em]">
      © 2025 KREASI SISFO — Sistem Informasi FST UIN Alauddin Makassar · #1Dekade1Rumah1Cerita
    </div>
  </footer>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faInstagram, faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons'

const byPrefixAndName = {
  fas: {
    house: faHouse
  },
  fab: {
    instagram: faInstagram,
    youtube: faYoutube,
    tiktok: faTiktok
  }
}
</script>
