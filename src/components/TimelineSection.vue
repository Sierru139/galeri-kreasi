<template>
  <section id="timeline" class="py-20 relative bg-[#0a0805]">
    <div class="max-w-[1200px] mx-auto px-6">
      <div class="mb-12">
        <div class="font-hand text-[.9rem] text-orange tracking-[.1em] flex items-center gap-2">
          <!-- <svg viewBox="0 0 20 20" fill="currentColor" class="w-[18px] h-[18px]"><path d="M10 1l2.4 7.3H20l-6.2 4.5 2.4 7.3L10 15.6 3.8 20l2.4-7.3L0 8.3h7.6z"/></svg> -->
          Jelajahi Setiap Tahun
        </div>
        <h2 class="font-bang text-[clamp(2.2rem,7vw,4rem)] tracking-[.06em] leading-none text-cream2 [text-shadow:2px_2px_0_rgba(0,0,0,.8)] reveal">PERJALANAN <span class="text-orange">KITA</span></h2>
        <p class="font-hand text-[.95rem] text-cream opacity-60 italic text-right mb-8 reveal">Setiap tahun punya cerita, dan setiap cerita punya kita.</p>
      </div>

      <div class="relative pt-[30px] reveal">
        <div class="tl-string"></div>
        <div class="tl-scroll">
          <div class="flex gap-6 w-max px-8 pt-2.5 pb-2.5 relative z-2">
            <div
              v-for="y in angkatanData"
              :key="y.year"
              :class="['tl-item flex flex-col items-center cursor-pointer relative transition-transform duration-300 min-w-[110px] hover:-translate-y-1.5 hover:-rotate-2 hover:scale-[1.06]', { active: y.active }]"
              @click="openTimelineModal(y)"
            >
              <div class="tl-tooltip absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 bg-[rgba(20,15,5,.95)] border border-[rgba(176,128,60,.4)] py-2 px-3 rounded-[2px] font-hand text-[.75rem] text-cream2 whitespace-nowrap pointer-events-none opacity-0 transition-opacity duration-200 z-30">{{ y.tooltip }}</div>
              <div class="tl-polaroid bg-cream2 p-[6px_6px_24px] shadow-[2px_4px_12px_rgba(0,0,0,.7),0_0_0_1px_rgba(0,0,0,.4)] -rotate-2 transition-[transform,box-shadow] duration-300">
                <img
                  :class="y.photo ? 'md:w-[190px] md:h-[170px] w-[150px] h-[120px] object-cover sepia-[.45] contrast-[1.1]' : 'w-[90px] h-[70px] object-contain bg-[#211a0e] p-2.5'"
                  loading="lazy"
                  :src="driveImgUrl(y.photo || y.logo, 180)"
                  :alt="String(y.year)"
                  referrerpolicy="no-referrer"
                  @error="e => e.target.src = `https://drive.google.com/thumbnail?id=${y.photo || y.logo}&sz=w180`"
                >
                <div v-if="y.photo" class="absolute bottom-[21px] right-px z-6 md:w-[50px] md:h-[50px] w-[40px] h-[40px] rounded-full bg-white shadow-[0_1px_5px_rgba(0,0,0,.6)] overflow-hidden">
                  <img
                    :src="driveImgUrl(y.logo, 80)"
                    :alt="'Logo ' + y.year"
                    referrerpolicy="no-referrer"
                    class="w-full h-full object-contain block"
                    @error="e => e.target.src = `https://drive.google.com/thumbnail?id=${y.logo}&sz=w80`"
                  >
                </div>
                <div class="font-bang text-[.95rem] tracking-[.04em] text-[#3a2a10] text-center pt-1 leading-[1.2] tl-year">{{ y.year }}</div>
                <!-- <div class="tl-desc font-hand text-[.65rem] text-[#5a4020] text-center leading-[1.3]">{{ y.desc }}</div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Fullscreen Timeline Photo Modal -->
  <Transition name="fade">
    <div 
      v-if="selectedTimeline" 
      class="fixed inset-0 z-[10000] bg-black/95 flex flex-col items-center justify-center p-4 md:p-8 backdrop-blur-sm"
      @click="closeTimelineModal"
    >
      <!-- Close Button -->
      <button 
        class="absolute top-4 right-4 md:top-6 md:right-6 text-cream/70 hover:text-white bg-black/40 hover:bg-black/70 p-2.5 rounded-full transition-colors cursor-pointer z-50 flex items-center justify-center border border-white/10"
        aria-label="Tutup Foto"
        @click.stop="closeTimelineModal"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Photo Wrapper -->
      <div class="relative max-w-full max-h-[80vh] flex items-center justify-center" @click.stop>
        <div class="relative max-w-full max-h-[80vh] inline-block">
          <!-- The Photo / Image -->
          <img 
            :src="driveImgUrl(selectedTimeline.photo || selectedTimeline.logo, 1200)" 
            :alt="'Foto Angkatan ' + selectedTimeline.year"
            class="max-w-full max-h-[80vh] object-contain rounded border border-white/10 shadow-2xl bg-black"
            @error="e => { if (selectedTimeline) e.target.src = `https://drive.google.com/thumbnail?id=${selectedTimeline.photo || selectedTimeline.logo}&sz=w1200` }"
          />

          <!-- Overlaid batch logo in bottom-right corner (designed like a printed logo stamp) -->
          <div 
            class="absolute bottom-4 right-4 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/90 border-2 border-white shadow-[0_2px_12px_rgba(0,0,0,0.6)] overflow-hidden flex items-center justify-center p-1.5 select-none pointer-events-none transition-transform duration-300 hover:scale-110"
          >
            <img 
              :src="driveImgUrl(selectedTimeline.logo, 160)" 
              :alt="'Logo ' + selectedTimeline.year"
              class="w-full h-full object-contain"
              @error="e => { if (selectedTimeline) e.target.src = `https://drive.google.com/thumbnail?id=${selectedTimeline.logo}&sz=w160` }"
            />
          </div>
        </div>
      </div>

      <!-- Caption / Details underneath -->
      <div class="mt-6 text-center max-w-2xl px-4" @click.stop>
        <span class="font-bang text-2xl md:text-3xl text-orange tracking-wider block mb-1 [text-shadow:1px_1px_0_rgba(0,0,0,0.8)]">
          ANGKATAN {{ selectedTimeline.year }}
        </span>
        <p class="font-hand text-lg md:text-xl text-cream2/90 leading-relaxed italic">
          {{ selectedTimeline.tooltip }}
        </p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'
import { angkatanData, driveImgUrl } from '../data.js'

const selectedTimeline = ref(null)

function openTimelineModal(y) {
  selectedTimeline.value = y
}

function closeTimelineModal() {
  selectedTimeline.value = null
}

const onKeyDown = (e) => {
  if (e.key === 'Escape') closeTimelineModal()
}

watch(selectedTimeline, (newVal) => {
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
