<template>
  <!-- NAV -->
  <nav id="nav" :class="{ on: navScrolled }">
    <div class="nav-logo"><img src="/assets/logo/kreasi.png" alt="KREASI" class="md:w-20 w-12 "></div>
    <ul class="nav-links">
      <li><a href="#hero">Beranda</a></li>
      <li><a href="#timeline">Timeline</a></li>
      <li><a href="#generation">Generasi</a></li>
      <li><a href="#gallery">Galeri</a></li>
      <li><a href="#featured">Tentang Kami</a></li>
      <li><a href="#closing">Kontak</a></li>
    </ul>
    <button class="ham" :class="{ open: mobileOpen }" @click="toggleMobile">
      <span></span><span></span><span></span>
    </button>
  </nav>
  <div class="mobile-nav" :class="{ open: mobileOpen }" @click.self="closeMnav">
    <a href="#hero" @click="closeMnav">BERANDA</a>
    <a href="#gallery" @click="closeMnav">GALERI</a>
    <a href="#timeline" @click="closeMnav">TIMELINE</a>
    <a href="#generation" @click="closeMnav">KENANGAN</a>
    <a href="#featured" @click="closeMnav">TENTANG</a>
    <a href="#closing" @click="closeMnav">KONTAK</a>
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
