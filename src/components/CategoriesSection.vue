<template>
  <section id="generation" class="py-20 relative bg-bg2">
    <div class="max-w-[1200px] mx-auto px-6 pt-12 pb-12 relative z-2">
      <div class="mb-12">
        <div class="font-hand text-[.9rem] text-orange tracking-[.1em] flex items-center gap-2 reveal">
          <!-- <svg viewBox="0 0 20 20" fill="currentColor" class="w-[18px] h-[18px]"><path d="M10 1l2.4 7.3H20l-6.2 4.5 2.4 7.3L10 15.6 3.8 20l2.4-7.3L0 8.3h7.6z"/></svg> -->
          Tahun Angkatan
        </div>
        <h2 class="font-bang text-[clamp(2.2rem,7vw,4rem)] tracking-[.06em] leading-none text-cream2 [text-shadow:2px_2px_0_rgba(0,0,0,.8)] reveal">LOGO <span class="text-orange">KREASI</span></h2>
        <p class="font-hand text-[.9rem] text-tan opacity-80 mt-1.5 italic reveal">Setiap angkatan kreasi punya logo dan wajahnya sendiri. Klik untuk melihat filosofi logonya.</p>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 relative z-2 max-w-[980px] mx-auto">
        <div
          v-for="y in angkatanData"
          :key="y.year"
          class="angkatan-card group bg-paper p-4 text-center cursor-pointer block border border-[rgba(0,0,0,.2)] shadow-[3px_3px_10px_rgba(0,0,0,.5)] transition-[transform,box-shadow] duration-[.25s] ease-in-out hover:-translate-y-1.5 hover:-rotate-1 hover:shadow-[5px_8px_20px_rgba(0,0,0,.7)]"
          :data-year="y.year"
          @click="openLogoModal(y)"
        >
          <div class="w-full aspect-square bg-white rounded flex items-center justify-center overflow-hidden mb-2.5">
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
        </div>
      </div>

      <p class="reveal font-hand text-[.85rem] text-tan opacity-65 text-center mt-8">
        Galeri ini terhubung langsung ke folder "Kreasi SI 2015-2025" di Google Drive. 
      </p>

      <!-- Quote strips -->
      <div class="flex gap-6 mt-10 flex-wrap">
        <div class="bg-[#8b1a0a] py-2 px-4 font-hand text-[.85rem] text-[#f8d0a0] -rotate-2 shadow-[2px_2px_8px_rgba(0,0,0,.5)]">
          Kenangan tidak harus sempurna,<br>yang penting nyata.
        </div>
        <div class="ml-auto font-hand text-[.85rem] text-cream opacity-70 text-right italic self-center">
          Bersama kita bisa,<br>bersama kita berarti.
        </div>
      </div>
    </div>
  </section>

  <!-- Fullscreen Logo Detail Modal -->
  <Transition name="fade">
    <div 
      v-if="selectedLogo" 
      class="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
      @click="closeLogoModal"
    >
      <!-- Close Button -->
      <button 
        class="absolute top-4 right-4 md:top-6 md:right-6 text-cream/70 hover:text-white bg-black/40 hover:bg-black/70 p-2.5 rounded-full transition-colors cursor-pointer z-50 flex items-center justify-center border border-white/10"
        aria-label="Tutup Detail"
        @click.stop="closeLogoModal"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Modal Content Box -->
      <div 
        class="bg-[#1a140b] border border-[rgba(176,128,60,0.3)] shadow-[0_15px_50px_rgba(0,0,0,0.9)] rounded-[2px] max-w-4xl w-full max-h-[90vh] md:max-h-[80vh] overflow-y-auto relative flex flex-col md:flex-row animate-in fade-in zoom-in duration-300"
        @click.stop
      >
        <!-- Left Side: Large Logo View -->
        <div class="flex-1 bg-[#110c06] p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-[rgba(176,128,60,0.15)] min-h-[250px] md:min-h-[400px]">
          <img 
            :src="driveImgUrl(selectedLogo.logo, 800)" 
            :alt="'Logo ' + selectedLogo.year"
            class="max-w-full max-h-[300px] md:max-h-[400px] object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]"
            @error="e => { if (selectedLogo) e.target.src = `https://drive.google.com/thumbnail?id=${selectedLogo.logo}&sz=w800` }"
          />
        </div>

        <!-- Right Side: Details / Philosophy -->
        <div class="flex-1 p-6 md:p-8 flex flex-col justify-center">
          <div class="font-bang text-[2.5rem] md:text-[3.5rem] tracking-[.06em] leading-none text-orange mb-1.5 [text-shadow:2px_2px_0_rgba(0,0,0,.8)]">
            ANGKATAN {{ selectedLogo.year }}
          </div>
          <div class="font-hand text-[1.1rem] md:text-[1.3rem] text-cream opacity-95 italic mb-6 border-b border-[rgba(176,128,60,0.25)] pb-3">
            "{{ selectedLogo.desc }}"
          </div>

          <div>
            <div class="font-bold text-[0.7rem] tracking-[0.18em] uppercase text-orange mb-2">Filosofi & Deskripsi Logo</div>
            <p class="font-hand text-base md:text-lg text-cream2/90 leading-relaxed italic">
              {{ getPhilosophy(selectedLogo.year) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'
import { angkatanData, driveImgUrl } from '../data.js'

// Philosophies / descriptions for each batch logo
const philosophies = {
  2015: "-",
  2016: "-",
  2017: "Pohon: POHON KAMI PILIH KARENA POHON MEMILIKI BANYAK MANFAAT, BAIK ITU BAGI MANUSIA DAN LINGKUNGANNYA SENDIRI \n Akar: MAKNA 2 AKAR SEBAGAI SIMBOL 2 KREASI TERDAHULU, DIMANA AKAR DI LAMBANGKAN SEBAGAI PONDASI UTAMA",
  2018: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias reiciendis itaque, error laborum minus necessitatibus id ducimus voluptate perferendis ratione, cupiditate, praesentium optio corporis suscipit hic. Culpa earum quas dolores voluptas laboriosam perspiciatis maiores, natus blanditiis accusamus? Nisi illo totam, neque sequi recusandae explicabo eos a laboriosam culpa tempora laudantium ipsam accusantium in quod facere possimus iste, magni quam. Delectus quis temporibus dignissimos at odit, magni maiores",
  2019: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias reiciendis itaque, error laborum minus necessitatibus id ducimus voluptate perferendis ratione, cupiditate, praesentium optio corporis suscipit hic. Culpa earum quas dolores voluptas laboriosam perspiciatis maiores, natus blanditiis accusamus? Nisi illo totam, neque sequi recusandae explicabo eos a laboriosam culpa tempora laudantium ipsam accusantium in quod facere possimus iste, magni quam. Delectus quis temporibus dignissimos at odit, magni maiores",
  2020: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias reiciendis itaque, error laborum minus necessitatibus id ducimus voluptate perferendis ratione, cupiditate, praesentium optio corporis suscipit hic. Culpa earum quas dolores voluptas laboriosam perspiciatis maiores, natus blanditiis accusamus? Nisi illo totam, neque sequi recusandae explicabo eos a laboriosam culpa tempora laudantium ipsam accusantium in quod facere possimus iste, magni quam. Delectus quis temporibus dignissimos at odit, magni maiores",
  2021: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias reiciendis itaque, error laborum minus necessitatibus id ducimus voluptate perferendis ratione, cupiditate, praesentium optio corporis suscipit hic. Culpa earum quas dolores voluptas laboriosam perspiciatis maiores, natus blanditiis accusamus? Nisi illo totam, neque sequi recusandae explicabo eos a laboriosam culpa tempora laudantium ipsam accusantium in quod facere possimus iste, magni quam. Delectus quis temporibus dignissimos at odit, magni maiores",
  2022: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias reiciendis itaque, error laborum minus necessitatibus id ducimus voluptate perferendis ratione, cupiditate, praesentium optio corporis suscipit hic. Culpa earum quas dolores voluptas laboriosam perspiciatis maiores, natus blanditiis accusamus? Nisi illo totam, neque sequi recusandae explicabo eos a laboriosam culpa tempora laudantium ipsam accusantium in quod facere possimus iste, magni quam. Delectus quis temporibus dignissimos at odit, magni maiores",
  2023: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias reiciendis itaque, error laborum minus necessitatibus id ducimus voluptate perferendis ratione, cupiditate, praesentium optio corporis suscipit hic. Culpa earum quas dolores voluptas laboriosam perspiciatis maiores, natus blanditiis accusamus? Nisi illo totam, neque sequi recusandae explicabo eos a laboriosam culpa tempora laudantium ipsam accusantium in quod facere possimus iste, magni quam. Delectus quis temporibus dignissimos at odit, magni maiores",
  2024: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias reiciendis itaque, error laborum minus necessitatibus id ducimus voluptate perferendis ratione, cupiditate, praesentium optio corporis suscipit hic. Culpa earum quas dolores voluptas laboriosam perspiciatis maiores, natus blanditiis accusamus? Nisi illo totam, neque sequi recusandae explicabo eos a laboriosam culpa tempora laudantium ipsam accusantium in quod facere possimus iste, magni quam. Delectus quis temporibus dignissimos at odit, magni maiores",
  2025: "Coming soon"
}

function getPhilosophy(year) {
  return philosophies[year] || "Deskripsi filosofi logo kreasi untuk angkatan ini belum diunggah."
}

const selectedLogo = ref(null)

function openLogoModal(y) {
  selectedLogo.value = y
}

function closeLogoModal() {
  selectedLogo.value = null
}

const onKeyDown = (e) => {
  if (e.key === 'Escape') closeLogoModal()
}

watch(selectedLogo, (newVal) => {
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
