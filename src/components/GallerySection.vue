<template>
  <section id="gallery">
    <div class="sec-container">
      <div class="sec-head" style="text-align:center">
        <div class="sec-eyebrow reveal" style="justify-content:center">
          <svg viewBox="0 0 20 20" fill="currentColor" width="18"><path d="M10 1l2.4 7.3H20l-6.2 4.5 2.4 7.3L10 15.6 3.8 20l2.4-7.3L0 8.3h7.6z"/></svg>
          Buka Kotak Kenangan
          <svg viewBox="0 0 20 20" fill="currentColor" width="18"><path d="M10 1l2.4 7.3H20l-6.2 4.5 2.4 7.3L10 15.6 3.8 20l2.4-7.3L0 8.3h7.6z"/></svg>
        </div>
        <h2 class="sec-title reveal">GALERI <span>KENANGAN</span></h2>
      </div>
      <p class="gallery-intro reveal">Setiap foto menyimpan ribuan kata yang tak pernah terucap...</p>

      <!-- Filter bar -->
      <div class="gallery-filters reveal">
        <button
          v-for="f in filters"
          :key="f"
          :class="['gf-btn', { active: activeFilter === f }]"
          :data-filter="f"
          @click="setFilter(f)"
        >{{ f === 'all' ? 'Semua' : f }}</button>
      </div>

      <!-- Sync Loading Indicator -->
      <div v-if="isFetching" class="gallery-loading">
        Sinkronisasi Google Drive... 🔄
      </div>

      <div v-else class="gallery-masonry reveal">
        <!-- With photo -->
        <div
          v-for="(item, i) in withPhoto"
          :key="'photo-' + item.year + '-' + i"
          :class="['gallery-item', rotClasses[i % rotClasses.length]]"
        >
          <div class="g-polaroid">
            <div class="tape top"></div>
            <img
              class="g-photo"
              loading="lazy"
              :src="driveImgUrl(item.photoId, 700)"
              :alt="item.caption"
              referrerpolicy="no-referrer"
              @error="onPhotoError($event, item)"
            >
            <div class="g-overlay">
              <div class="go-year">{{ item.year }}</div>
              <div class="go-cat">{{ item.caption }}</div>
            </div>
            <div class="g-cap">{{ item.caption }}</div>
          </div>
        </div>

        <!-- Logo only -->
        <div
          v-for="(item, i) in logoOnly"
          :key="'logo-' + item.year + '-' + i"
          :class="['gallery-item', rotClasses[i % rotClasses.length]]"
        >
          <div class="g-polaroid">
            <div class="tape top"></div>
            <img
              class="g-photo"
              loading="lazy"
              style="object-fit:contain;background:#211a0e;padding:14px"
              :src="driveImgUrl(item.logoId, 500)"
              :alt="item.caption"
              referrerpolicy="no-referrer"
              @error="e => e.target.src = `https://drive.google.com/thumbnail?id=${item.logoId}&sz=w500`"
            >
            <div class="g-overlay">
              <div class="go-year">{{ item.year }}</div>
              <div class="go-cat">Logo Angkatan</div>
            </div>
            <div class="g-cap">{{ item.caption }}</div>
          </div>
        </div>

        <!-- Loading state (hidden after data loads) -->
        <div v-if="withPhoto.length === 0 && logoOnly.length === 0" class="gallery-loading">
          Memuat kenangan dari Drive… 📷
        </div>
      </div>

      <p
        v-if="!isFetching && filteredYears.length === 0"
        class="gallery-empty-note"
      >
        Foto angkatan ini belum diunggah ke Drive — cek lagi nanti! 🗂️
      </p>

      <!-- Scrapbook quotes & player -->
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;margin:2.5rem 0 1.5rem">
        <div class="gallery-quote" style="margin:0">Setiap momen = berharga ♥</div>
      </div>

      <div class="see-more reveal">
        <a href="https://drive.google.com/drive/folders/1gTgVNAbr2jKjuBePKkmwLk_ZRZe62iEq" target="_blank" rel="noopener" class="btn-see-more">Lihat Semua di Drive</a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { angkatanData, rotClasses, driveImgUrl } from '../data.js'

const props = defineProps({
  activeFilter: {
    type: String,
    default: 'all'
  },
  isFetching: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:activeFilter'])

const filters = computed(() => {
  return ['all', ...angkatanData.map(y => String(y.year))]
})

const filteredYears = computed(() => {
  if (props.activeFilter === 'all') return angkatanData
  return angkatanData.filter(y => String(y.year) === props.activeFilter)
})

const withPhoto = computed(() => {
  if (props.activeFilter === 'all') {
    return filteredYears.value
      .filter(y => y.photo)
      .map(y => ({
        year: y.year,
        photoId: y.photo,
        caption: `Angkatan ${y.year}`
      }))
  } else {
    const yearObj = filteredYears.value[0]
    if (!yearObj || !yearObj.photos || yearObj.photos.length === 0) return []
    return yearObj.photos.map((photoId, idx) => ({
      year: yearObj.year,
      photoId: photoId,
      caption: `Angkatan ${yearObj.year} · foto ${idx + 1}`
    }))
  }
})

const logoOnly = computed(() => {
  if (props.activeFilter === 'all') {
    return filteredYears.value
      .filter(y => !y.photo)
      .map(y => ({
        year: y.year,
        logoId: y.logo,
        caption: `Angkatan ${y.year} · foto belum diunggah`
      }))
  } else {
    const yearObj = filteredYears.value[0]
    if (yearObj && (!yearObj.photos || yearObj.photos.length === 0)) {
      return [{
        year: yearObj.year,
        logoId: yearObj.logo,
        caption: `Angkatan ${yearObj.year} · foto belum diunggah`
      }]
    }
    return []
  }
})

function setFilter(f) {
  emit('update:activeFilter', f)
}

function onPhotoError(e, item) {
  e.target.parentElement.innerHTML = `<div class="g-photo-fallback">📷 Gambar tak termuat<br><a href="https://drive.google.com/file/d/${item.photoId}/view" target="_blank">Buka di Drive ↗</a></div>`
}
</script>
