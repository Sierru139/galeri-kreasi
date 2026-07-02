<template>
  <section id="timeline">
    <div class="sec-container">
      <div class="sec-head">
        <div class="sec-eyebrow">
          <svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 1l2.4 7.3H20l-6.2 4.5 2.4 7.3L10 15.6 3.8 20l2.4-7.3L0 8.3h7.6z"/></svg>
          Jelajahi Setiap Tahun
        </div>
        <h2 class="sec-title reveal">PERJALANAN <span>KITA</span></h2>
        <p class="tl-note reveal">Setiap tahun punya cerita, dan setiap cerita punya kita. ↓</p>
      </div>

      <div class="tl-string-wrap reveal">
        <div class="tl-string"></div>
        <div class="tl-scroll">
          <div class="tl-track">
            <div
              v-for="y in angkatanData"
              :key="y.year"
              :class="['tl-item', { active: y.active }]"
            >
              <div class="tl-tooltip">{{ y.tooltip }}</div>
              <div class="tl-polaroid">
                <img
                  :class="y.photo ? 'tl-photo' : 'tl-photo logo-only'"
                  loading="lazy"
                  :src="driveImgUrl(y.photo || y.logo, 180)"
                  :alt="String(y.year)"
                  referrerpolicy="no-referrer"
                  @error="e => e.target.src = `https://drive.google.com/thumbnail?id=${y.photo || y.logo}&sz=w180`"
                >
                <div v-if="y.photo" class="tl-logo-badge">
                  <img
                    :src="driveImgUrl(y.logo, 80)"
                    :alt="'Logo ' + y.year"
                    referrerpolicy="no-referrer"
                    @error="e => e.target.src = `https://drive.google.com/thumbnail?id=${y.logo}&sz=w80`"
                  >
                </div>
                <div class="tl-year">{{ y.year }}</div>
                <!-- <div class="tl-desc">{{ y.desc }}</div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { angkatanData, driveImgUrl } from '../data.js'
</script>
