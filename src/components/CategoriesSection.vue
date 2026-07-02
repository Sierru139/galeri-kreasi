<template>
  <section id="generation">
    <div class="sec-container" style="padding-top:3rem;padding-bottom:3rem;position:relative;z-index:2">
      <div class="sec-head">
        <div class="sec-eyebrow reveal">
          <svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 1l2.4 7.3H20l-6.2 4.5 2.4 7.3L10 15.6 3.8 20l2.4-7.3L0 8.3h7.6z"/></svg>
          Pilih Tahun Angkatanmu
        </div>
        <h2 class="sec-title reveal">PILIH <span>ANGKATAN</span></h2>
        <p class="sec-sub reveal">Setiap angkatan punya logo dan wajahnya sendiri. Klik untuk lihat kenangannya.</p>
      </div>

      <div class="angkatan-grid">
        <a
          v-for="y in angkatanData"
          :key="y.year"
          href="#gallery"
          class="angkatan-card"
          :data-year="y.year"
          @click.prevent="onCardClick(y.year)"
        >
          <div class="angkatan-logo-circle">
            <img
              :src="driveImgUrl(y.logo, 100)"
              :alt="'Logo ' + y.year"
              loading="lazy"
              referrerpolicy="no-referrer"
              @error="e => e.target.src = `https://drive.google.com/thumbnail?id=${y.logo}&sz=w100`"
            >
          </div>
          <div class="angkatan-year">{{ y.year }}</div>
          <div class="angkatan-count">{{ y.photo ? 'Ada foto' : 'Logo saja' }}</div>
        </a>
      </div>

      <p class="reveal" style="font-family:var(--f-hand);font-size:.85rem;color:var(--tan);opacity:.65;text-align:center;margin-top:2rem">
        Galeri ini terhubung langsung ke folder "Kreasi SI 2015-2025" di Google Drive. 
      </p>

      <!-- Quote strips -->
      <div style="display:flex;gap:1.5rem;margin-top:2.5rem;flex-wrap:wrap">
        <div style="background:#8b1a0a;padding:.5rem 1rem;font-family:var(--f-hand);font-size:.85rem;color:#f8d0a0;transform:rotate(-2deg);box-shadow:2px 2px 8px rgba(0,0,0,.5)">
          Kenangan tidak harus sempurna,<br>yang penting nyata. ♥
        </div>
        <div style="margin-left:auto;font-family:var(--f-hand);font-size:.85rem;color:var(--cream);opacity:.7;text-align:right;font-style:italic;align-self:center">
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
