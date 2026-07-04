<template>
  <NavBar />
  <HeroSection />
  <FeaturedSection />
  <TimelineSection />
  <CategoriesSection @filter-year="onFilterYear" />
  <GallerySection 
    :activeFilter="activeFilter" 
    :isFetching="isFetching"
    @update:activeFilter="onFilterUpdate" 
  />
  <ClosingSection />
  <FooterSection />
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import FeaturedSection from './components/FeaturedSection.vue'
import TimelineSection from './components/TimelineSection.vue'
import CategoriesSection from './components/CategoriesSection.vue'
import GallerySection from './components/GallerySection.vue'
import ClosingSection from './components/ClosingSection.vue'
import FooterSection from './components/FooterSection.vue'
import { fetchDriveData } from './data.js'

const activeFilter = ref('all')
const isFetching = ref(false)

function onFilterYear(year) {
  activeFilter.value = year
}

function onFilterUpdate(val) {
  activeFilter.value = val
}

// Scroll reveal observer — identical to original HTML behavior
function initRevealObserver() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('on')
        obs.unobserve(e.target)
      }
    })
  }, { threshold: 0.07, rootMargin: '0px 0px -30px 0px' })

  document.querySelectorAll('.reveal, .rv-left, .rv-right').forEach(el => obs.observe(el))
}

onMounted(async () => {
  const apiKey = import.meta.env.VITE_GD_API_KEY
  if (apiKey) {
    isFetching.value = true
    await fetchDriveData(apiKey)
    isFetching.value = false
  }

  nextTick(() => {
    initRevealObserver()
  })
})

// Re-observe after filter changes to catch newly rendered elements
watch(activeFilter, () => {
  nextTick(() => {
    initRevealObserver()
  })
})
</script>
