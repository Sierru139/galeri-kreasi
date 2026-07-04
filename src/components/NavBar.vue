<template>
  <!-- NAV -->
  <nav id="nav" :class="{ on: navScrolled }" class="fixed inset-x-0 top-0 z-500 px-8 py-3.5 flex justify-between items-center transition-[background] duration-300">
    <div><img src="/assets/logo/kreasi.png" alt="KREASI" class="md:w-14 w-8"></div>
    <ul class="nav-links list-none flex gap-8">
      <li><a href="#hero" class="font-bold text-[.72rem] tracking-[.18em] uppercase text-cream opacity-75 transition-[opacity,color] duration-200 hover:opacity-100 hover:text-orange2">Beranda</a></li>
      <li><a href="#timeline" class="font-bold text-[.72rem] tracking-[.18em] uppercase text-cream opacity-75 transition-[opacity,color] duration-200 hover:opacity-100 hover:text-orange2">Timeline</a></li>
      <li><a href="#generation" class="font-bold text-[.72rem] tracking-[.18em] uppercase text-cream opacity-75 transition-[opacity,color] duration-200 hover:opacity-100 hover:text-orange2">Generasi</a></li>
      <li><a href="#gallery" class="font-bold text-[.72rem] tracking-[.18em] uppercase text-cream opacity-75 transition-[opacity,color] duration-200 hover:opacity-100 hover:text-orange2">Galeri</a></li>
      <li><a href="#featured" class="font-bold text-[.72rem] tracking-[.18em] uppercase text-cream opacity-75 transition-[opacity,color] duration-200 hover:opacity-100 hover:text-orange2">Tentang Kami</a></li>
      <li><a href="#closing" class="font-bold text-[.72rem] tracking-[.18em] uppercase text-cream opacity-75 transition-[opacity,color] duration-200 hover:opacity-100 hover:text-orange2">Kontak</a></li>
    </ul>
    <button class="ham hidden flex-col gap-[5px] cursor-pointer bg-transparent border-none p-1" :class="{ open: mobileOpen }" @click="toggleMobile">
      <span></span><span></span><span></span>
    </button>
  </nav>
  <div class="mobile-nav fixed inset-0 z-490 flex flex-col items-center justify-center gap-10 transition-opacity duration-300"
       :class="mobileOpen ? 'opacity-100 pointer-events-auto bg-[rgba(10,8,4,.98)]' : 'opacity-0 pointer-events-none bg-[rgba(10,8,4,.98)]'"
       @click.self="closeMnav">
    <a href="#hero" @click="closeMnav" class="font-bang text-[2.5rem] tracking-[.1em] text-cream transition-colors duration-200 hover:text-orange">BERANDA</a>
    <a href="#timeline" @click="closeMnav" class="font-bang text-[2.5rem] tracking-[.1em] text-cream transition-colors duration-200 hover:text-orange">TIMELINE</a>
    <a href="#generation" @click="closeMnav" class="font-bang text-[2.5rem] tracking-[.1em] text-cream transition-colors duration-200 hover:text-orange">LOGO</a>
    <a href="#gallery" @click="closeMnav" class="font-bang text-[2.5rem] tracking-[.1em] text-cream transition-colors duration-200 hover:text-orange">GALERI</a>
    <a href="#featured" @click="closeMnav" class="font-bang text-[2.5rem] tracking-[.1em] text-cream transition-colors duration-200 hover:text-orange">TENTANG</a>
    <a href="#closing" @click="closeMnav" class="font-bang text-[2.5rem] tracking-[.1em] text-cream transition-colors duration-200 hover:text-orange">KONTAK</a>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const navScrolled = ref(false)
const mobileOpen = ref(false)

function onScroll() {
  navScrolled.value = window.scrollY > 60
}

function toggleMobile() {
  mobileOpen.value = !mobileOpen.value
  document.body.style.overflow = mobileOpen.value ? 'hidden' : ''
}

function closeMnav() {
  mobileOpen.value = false
  document.body.style.overflow = ''
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>
