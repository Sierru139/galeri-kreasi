<template>
  <section id="gallery" class="py-20 relative bg-bg">
    <div class="max-w-[1200px] mx-auto px-6">
      <div class="mb-12 text-center">
        <div class="font-hand text-[.9rem] text-orange tracking-[.1em] flex items-center justify-center gap-2 reveal">
          <svg viewBox="0 0 20 20" fill="currentColor" class="w-[18px] h-[18px]"><path d="M10 1l2.4 7.3H20l-6.2 4.5 2.4 7.3L10 15.6 3.8 20l2.4-7.3L0 8.3h7.6z"/></svg>
          Buka Kotak Kenangan
          <svg viewBox="0 0 20 20" fill="currentColor" class="w-[18px] h-[18px]"><path d="M10 1l2.4 7.3H20l-6.2 4.5 2.4 7.3L10 15.6 3.8 20l2.4-7.3L0 8.3h7.6z"/></svg>
        </div>
        <h2 class="font-bang text-[clamp(2.2rem,7vw,4rem)] tracking-[.06em] leading-none text-cream2 [text-shadow:2px_2px_0_rgba(0,0,0,.8)] reveal">GALERI <span class="text-orange">KENANGAN</span></h2>
      </div>
      <p class="font-hand text-[1rem] text-tan italic text-center mb-8 reveal">Setiap foto menyimpan ribuan kata yang tak pernah terucap...</p>

      <!-- Filter bar -->
      <div class="flex gap-2.5 justify-center flex-wrap mb-8 reveal">
        <button
          v-for="f in filters"
          :key="f"
          :class="[
            'font-bold text-[.7rem] tracking-[.12em] uppercase cursor-pointer transition-all duration-200 rounded-[1px] py-2 px-[1.1rem]',
            activeFilter === f
              ? 'bg-orange border-[1.5px] border-orange text-black'
              : 'bg-transparent border-[1.5px] border-[rgba(176,128,60,.35)] text-tan hover:border-orange hover:text-orange2'
          ]"
          :data-filter="f"
          @click="setFilter(f)"
        >{{ f === 'all' ? 'Semua' : f }}</button>
      </div>

      <!-- Sync Loading Indicator -->
      <div v-if="isFetching" class="font-hand text-[1rem] text-tan opacity-60 text-center py-12 w-full">
        Sinkronisasi Google Drive... 🔄
      </div>

      <div v-else class="gallery-masonry columns-4 gap-x-5 reveal">
        <!-- With photo -->
        <div
          v-for="(item, i) in withPhoto"
          :key="'photo-' + item.year + '-' + i"
          :class="['gallery-item break-inside-avoid mb-5 relative block cursor-zoom-in', rotClasses[i % rotClasses.length]]"
        >
          <div class="g-polaroid bg-cream2 p-[8px_8px_32px] shadow-[2px_4px_14px_rgba(0,0,0,.7)] relative transition-[transform,box-shadow,z-index] duration-300">
            <div class="tape top"></div>
            <img
              class="g-photo w-full aspect-[4/3] object-cover sepia-[.3] contrast-[1.08] brightness-[.95] transition-[filter] duration-300"
              loading="lazy"
              :src="driveImgUrl(item.photoId, 700)"
              :alt="item.caption"
              referrerpolicy="no-referrer"
              @error="onPhotoError($event, item)"
            >
            <div class="g-overlay absolute inset-0 bg-[rgba(15,10,0,.75)] opacity-0 transition-opacity duration-300 flex flex-col items-center justify-center gap-1.5">
              <div class="font-bang text-[1.5rem] text-orange2">{{ item.year }}</div>
              <div class="font-hand text-[.8rem] text-cream2 opacity-85">{{ item.caption }}</div>
            </div>
            <div class="font-hand text-[.72rem] text-[#3a2a10] text-center pt-[5px] leading-[1.3]">{{ item.caption }}</div>
          </div>
        </div>

        <!-- Logo only -->
        <div
          v-for="(item, i) in logoOnly"
          :key="'logo-' + item.year + '-' + i"
          :class="['gallery-item break-inside-avoid mb-5 relative block cursor-zoom-in', rotClasses[i % rotClasses.length]]"
        >
          <div class="g-polaroid bg-cream2 p-[8px_8px_32px] shadow-[2px_4px_14px_rgba(0,0,0,.7)] relative transition-[transform,box-shadow,z-index] duration-300">
            <div class="tape top"></div>
            <img
              class="g-photo w-full aspect-[4/3] object-contain bg-[#211a0e] p-3.5 sepia-[.3] contrast-[1.08] brightness-[.95] transition-[filter] duration-300"
              loading="lazy"
              :src="driveImgUrl(item.logoId, 500)"
              :alt="item.caption"
              referrerpolicy="no-referrer"
              @error="e => e.target.src = `https://drive.google.com/thumbnail?id=${item.logoId}&sz=w500`"
            >
            <div class="g-overlay absolute inset-0 bg-[rgba(15,10,0,.75)] opacity-0 transition-opacity duration-300 flex flex-col items-center justify-center gap-1.5">
              <div class="font-bang text-[1.5rem] text-orange2">{{ item.year }}</div>
              <div class="font-hand text-[.8rem] text-cream2 opacity-85">Logo Angkatan</div>
            </div>
            <div class="font-hand text-[.72rem] text-[#3a2a10] text-center pt-[5px] leading-[1.3]">{{ item.caption }}</div>
          </div>
        </div>

        <!-- Loading state (hidden after data loads) -->
        <div v-if="withPhoto.length === 0 && logoOnly.length === 0" class="font-hand text-[1rem] text-tan opacity-60 text-center py-12 w-full">
          Memuat kenangan dari Drive… 📷
        </div>
      </div>

      <p
        v-if="!isFetching && filteredYears.length === 0"
        class="font-hand text-[.95rem] text-tan opacity-70 text-center mt-6"
      >
        Foto angkatan ini belum diunggah ke Drive — cek lagi nanti! 🗂️
      </p>

      <!-- Scrapbook quotes & player -->
      <div class="flex justify-between items-center flex-wrap gap-4 mt-10 mb-6">
        <div class="text-center font-marker text-[1.1rem] text-cream2 opacity-70">Setiap momen = berharga ♥</div>
      </div>

      <div class="text-center mt-10 reveal">
        <a href="https://drive.google.com/drive/folders/1gTgVNAbr2jKjuBePKkmwLk_ZRZe62iEq" target="_blank" rel="noopener" class="btn-see-more inline-block py-[.7rem] px-8 border-2 border-orange text-orange font-bold text-[.78rem] tracking-[.18em] uppercase shadow-[3px_3px_0_rgba(224,124,0,.3)] transition-[background,color,transform] duration-200 hover:bg-orange hover:text-black hover:-translate-x-0.5 hover:-translate-y-0.5">Lihat Semua di Drive</a>
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
  e.target.parentElement.innerHTML = `<div class="g-photo-fallback w-full aspect-[4/3] flex flex-col items-center justify-center gap-1.5 bg-[#2a2010] text-tan font-hand text-[.75rem] text-center p-4">📷 Gambar tak termuat<br><a href="https://drive.google.com/file/d/${item.photoId}/view" target="_blank" class="text-orange2 underline">Buka di Drive ↗</a></div>`
}
</script>
