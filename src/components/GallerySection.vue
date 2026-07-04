<template>
  <section id="gallery" class="py-20 relative bg-bg">
    <div class="max-w-[1200px] mx-auto px-6">
      <div class="mb-12 text-center">
        <div class="font-hand text-[.9rem] text-orange tracking-[.1em] flex items-center justify-center gap-2 reveal">
          <!-- <svg viewBox="0 0 20 20" fill="currentColor" class="w-[18px] h-[18px]"><path d="M10 1l2.4 7.3H20l-6.2 4.5 2.4 7.3L10 15.6 3.8 20l2.4-7.3L0 8.3h7.6z"/></svg> -->
          Buka Kotak Kenangan
          <!-- <svg viewBox="0 0 20 20" fill="currentColor" class="w-[18px] h-[18px]"><path d="M10 1l2.4 7.3H20l-6.2 4.5 2.4 7.3L10 15.6 3.8 20l2.4-7.3L0 8.3h7.6z"/></svg> -->
        </div>
        <h2 class="font-bang text-[clamp(2.2rem,7vw,4rem)] tracking-[.06em] leading-none text-cream2 [text-shadow:2px_2px_0_rgba(0,0,0,.8)] reveal">GALERI <span class="text-orange">KENANGAN</span></h2>
      </div>
      <p class="font-hand text-[1rem] text-tan italic text-center mb-8 reveal">Setiap foto menyimpan ribuan kata yang tak pernah terucap...</p>

      <!-- Filter bar -->
      <div class="flex gap-2.5 justify-start sm:justify-center flex-nowrap sm:flex-wrap overflow-x-auto pb-2 mb-8 reveal -mx-6 px-6 sm:mx-0 sm:px-0 scrollbar-hide">
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
        Sinkronisasi... 
      </div>

      <div v-else class="gallery-masonry grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-5 reveal">
        <div
          v-for="(item, i) in galleryItems"
          :key="item.type + '-' + item.year + '-' + i"
          :class="['gallery-item break-inside-avoid mb-5 relative block cursor-zoom-in', rotClasses[i % rotClasses.length]]"
          @click="openLightbox(item, item.type)"
        >
          <div class="g-polaroid bg-cream2 p-[8px_8px_32px] shadow-[2px_4px_14px_rgba(0,0,0,.7)] relative transition-[transform,box-shadow,z-index] duration-300">
            <div class="tape top"></div>
            
            <!-- Logo image wrapper (uses contain with custom background) -->
            <img
              v-if="item.type === 'logo'"
              class="g-photo w-full aspect-[4/3] object-contain bg-[#211a0e] p-3.5 sepia-[.3] contrast-[1.08] brightness-[.95] transition-[filter] duration-300"
              loading="lazy"
              :src="driveImgUrl(item.id, 500)"
              :alt="item.caption"
              referrerpolicy="no-referrer"
              @error="e => e.target.src = `https://drive.google.com/thumbnail?id=${item.id}&sz=w500`"
            />
            
            <!-- Video image wrapper (uses cover with video icon overlay) -->
            <div v-else-if="item.type === 'video'" class="relative w-full aspect-[4/3] bg-black overflow-hidden">
              <img
                class="g-photo w-full h-full object-cover sepia-[.3] contrast-[1.08] brightness-[.85] transition-[filter] duration-300"
                loading="lazy"
                :src="driveImgUrl(item.id, 500)"
                :alt="item.caption"
                referrerpolicy="no-referrer"
                @error="e => e.target.src = `https://drive.google.com/thumbnail?id=${item.id}&sz=w500`"
              />
              <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <div class="w-12 h-12 rounded-full bg-orange/95 text-black flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                  <svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 ml-0.5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <!-- Photo image wrapper (uses cover) -->
            <img
              v-else
              class="g-photo w-full aspect-[4/3] object-cover sepia-[.3] contrast-[1.08] brightness-[.95] transition-[filter] duration-300"
              loading="lazy"
              :src="driveImgUrl(item.id, 700)"
              :alt="item.caption"
              referrerpolicy="no-referrer"
              @error="onPhotoError($event, item)"
            />

            <div class="g-overlay absolute inset-0 bg-[rgba(15,10,0,.75)] opacity-0 transition-opacity duration-300 flex flex-col items-center justify-center gap-1.5 z-20">
              <div class="font-bang text-[1.5rem] text-orange2">{{ item.year }}</div>
              <div class="font-hand text-[.8rem] text-cream2 opacity-85">
                {{ item.type === 'logo' ? 'Logo Angkatan' : (item.type === 'video' ? 'Video Kenangan' : item.caption) }}
              </div>
            </div>
            <div class="font-hand text-[.72rem] text-[#3a2a10] text-center pt-[5px] leading-[1.3]">
              {{ item.caption }}
            </div>
          </div>
        </div>

        <!-- Loading state (hidden after data loads) -->
        <div v-if="galleryItems.length === 0" class="font-hand text-[1rem] text-tan opacity-60 text-center py-12 w-full">
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
        <div class="text-center font-marker text-[1.1rem] text-cream2 opacity-70">Setiap momen = berharga</div>
      </div>

      <div class="text-center mt-10 reveal">
        <a href="https://drive.google.com/drive/folders/1gTgVNAbr2jKjuBePKkmwLk_ZRZe62iEq" target="_blank" rel="noopener" class="btn-see-more inline-block py-[.7rem] px-8 border-2 border-orange text-orange font-bold text-[.78rem] tracking-[.18em] uppercase shadow-[3px_3px_0_rgba(224,124,0,.3)] transition-[background,color,transform] duration-200 hover:bg-orange hover:text-black hover:-translate-x-0.5 hover:-translate-y-0.5">Lihat Semua di Drive</a>
      </div>
    </div>
  </section>

  <!-- Fullscreen Lightbox Modal -->
  <Transition name="fade">
    <div 
      v-if="selectedImage" 
      class="fixed inset-0 z-[9999] bg-black/95 flex flex-col items-center justify-center p-4 md:p-8 backdrop-blur-sm"
      @click="closeLightbox"
    >
      <!-- Close Button -->
      <button 
        class="absolute top-4 right-4 md:top-6 md:right-6 text-cream/70 hover:text-white bg-black/40 hover:bg-black/70 p-2.5 rounded-full transition-colors cursor-pointer z-110 flex items-center justify-center border border-white/10"
        aria-label="Close Preview"
        @click.stop="closeLightbox"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Image/Video Wrapper -->
      <div class="relative max-w-full max-h-[75vh] md:max-h-[80vh] flex items-center justify-center" @click.stop>
        <!-- Video Player -->
        <div v-if="selectedImage.type === 'video'" class="flex flex-col items-center gap-3">
          <iframe 
            class="w-[90vw] aspect-video md:w-[75vw] lg:w-[65vw] max-w-4xl max-h-[60vh] rounded border border-white/10 shadow-2xl bg-black"
            :src="`https://drive.google.com/file/d/${selectedImage.id}/preview`"
            allow="autoplay; fullscreen"
            allowfullscreen
          ></iframe>
          <a 
            :href="`https://drive.google.com/file/d/${selectedImage.id}/view`" 
            target="_blank" 
            rel="noopener" 
            class="text-[0.8rem] font-hand text-orange hover:text-orange2 underline transition-colors cursor-pointer"
          >
            Buka di Google Drive di tab baru ↗
          </a>
        </div>

        <!-- Image Player -->
        <img 
          v-else
          :src="selectedImage.src" 
          :alt="selectedImage.alt"
          class="max-w-full max-h-[75vh] md:max-h-[80vh] object-contain rounded border border-white/10 shadow-2xl"
          @error="e => { if (selectedImage) e.target.src = `https://drive.google.com/thumbnail?id=${selectedImage.id}&sz=w1200` }"
        />
      </div>

      <!-- Caption -->
      <div class="mt-6 text-center max-w-2xl px-4" @click.stop>
        <span class="font-bang text-xl md:text-3xl text-orange tracking-wider block mb-1.5 [text-shadow:1px_1px_0_rgba(0,0,0,0.8)]">
          ANGKATAN {{ selectedImage.year }}
        </span>
        <p class="font-hand text-base md:text-lg text-cream2/90 leading-relaxed italic">
          {{ selectedImage.caption }}
        </p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'
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

// Lightbox state
const selectedImage = ref(null)

function openLightbox(item, type) {
  selectedImage.value = {
    type: type,
    src: driveImgUrl(item.id, 1200),
    alt: item.caption,
    caption: item.caption,
    year: item.year,
    id: item.id
  }
}

function closeLightbox() {
  selectedImage.value = null
}

const onKeyDown = (e) => {
  if (e.key === 'Escape') closeLightbox()
}

watch(selectedImage, (newVal) => {
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

const filters = computed(() => {
  return ['all', ...angkatanData.map(y => String(y.year))]
})

const filteredYears = computed(() => {
  if (props.activeFilter === 'all') return angkatanData
  return angkatanData.filter(y => String(y.year) === props.activeFilter)
})

const galleryItems = computed(() => {
  if (props.activeFilter === 'all') {
    const items = []
    filteredYears.value.forEach(y => {
      // Add the main image/logo
      if (y.photo) {
        items.push({
          type: 'photo',
          year: y.year,
          id: y.photo,
          caption: `Angkatan ${y.year}`
        })
      } else {
        items.push({
          type: 'logo',
          year: y.year,
          id: y.logo,
          caption: `Angkatan ${y.year} · foto belum diunggah`
        })
      }
      // Add all videos for this batch
      if (y.videos && y.videos.length > 0) {
        y.videos.forEach((vid, idx) => {
          items.push({
            type: 'video',
            year: y.year,
            id: vid.id,
            caption: vid.name || `Angkatan ${y.year} · video ${idx + 1}`
          })
        })
      }
    })
    return items
  } else {
    const yearObj = filteredYears.value[0]
    if (!yearObj) return []

    const items = []
    // 1. First add the batch's logo
    items.push({
      type: 'logo',
      year: yearObj.year,
      id: yearObj.logo,
      caption: `Angkatan ${yearObj.year} · Logo Angkatan`
    })

    // 2. Add all batch videos
    if (yearObj.videos && yearObj.videos.length > 0) {
      yearObj.videos.forEach((vid, idx) => {
        items.push({
          type: 'video',
          year: yearObj.year,
          id: vid.id,
          caption: vid.name || `Angkatan ${yearObj.year} · video ${idx + 1}`
        })
      })
    }

    // 3. Add all batch photos
    if (yearObj.photos && yearObj.photos.length > 0) {
      yearObj.photos.forEach((photoId, idx) => {
        items.push({
          type: 'photo',
          year: yearObj.year,
          id: photoId,
          caption: `Angkatan ${yearObj.year} · foto ${idx + 1}`
        })
      })
    }

    return items
  }
})

function setFilter(f) {
  emit('update:activeFilter', f)
}

function onPhotoError(e, item) {
  e.target.parentElement.innerHTML = `<div class="g-photo-fallback w-full aspect-[4/3] flex flex-col items-center justify-center gap-1.5 bg-[#2a2010] text-tan font-hand text-[.75rem] text-center p-4">📷 Gambar tak termuat<br><a href="https://drive.google.com/file/d/${item.id}/view" target="_blank" class="text-orange2 underline">Buka di Drive ↗</a></div>`
}
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
