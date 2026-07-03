<template>
  <section id="hero" class="relative min-h-svh overflow-hidden flex flex-col justify-center items-center text-center px-4 pt-20 pb-15 bg-bg">
    <div class="hero-lines"></div>
    <div class="absolute left-0 right-0 top-0 z-5 flex gap-[7px] px-6">
      <span class="block h-[11px] bg-red w-[58px]"></span>
      <span class="block h-[11px] bg-red w-[58px]"></span>
      <span class="block h-[11px] bg-red w-[58px]"></span>
      <span class="block h-[11px] bg-red w-[58px]"></span>
    </div>

    <!-- Corner scrapbook photos -->
    <!-- <div class="hero-photo hp-tl">
      <div class="polaroid">
        <div class="tape top"></div>
        <img src="https://lh3.googleusercontent.com/d/1WuJs3BXW0-Ym-8NXGci8RPNr5kWZC5UU=w240" alt="Angkatan 2017"
             referrerpolicy="no-referrer"
             @error="e => e.target.src='https://drive.google.com/thumbnail?id=1WuJs3BXW0-Ym-8NXGci8RPNr5kWZC5UU&sz=w240'">
        <div class="caption">Angkatan<br>2017</div>
      </div>
    </div>
    <div class="hero-photo hp-tr">
      <div class="polaroid">
        <div class="tape top"></div>
        <img src="https://lh3.googleusercontent.com/d/1xS4MwcBQCSj7spPARC1RjbyIyyjyX-cN=w240" alt="Angkatan 2021"
             referrerpolicy="no-referrer"
             @error="e => e.target.src='https://drive.google.com/thumbnail?id=1xS4MwcBQCSj7spPARC1RjbyIyyjyX-cN&sz=w240'">
        <div class="caption">Angkatan<br>2021</div>
      </div>
    </div>
    <div class="hero-photo hp-ml">
      <div class="polaroid">
        <div class="tape top"></div>
        <img src="https://lh3.googleusercontent.com/d/1RNvUlpizxwdlcpBUCoS08urUS7pMj-0L=w200" alt="Angkatan 2020"
             referrerpolicy="no-referrer"
             @error="e => e.target.src='https://drive.google.com/thumbnail?id=1RNvUlpizxwdlcpBUCoS08urUS7pMj-0L&sz=w200'">
        <div class="caption">Angkatan<br>2020</div>
      </div>
    </div>
    <div class="hero-photo hp-mr">
      <div class="polaroid">
        <div class="tape top"></div>
        <img src="https://lh3.googleusercontent.com/d/1CKqN100IpsQn3XDUoa5gFfgD9SoEETvz=w200" alt="Angkatan 2022"
             referrerpolicy="no-referrer"
             @error="e => e.target.src='https://drive.google.com/thumbnail?id=1CKqN100IpsQn3XDUoa5gFfgD9SoEETvz&sz=w200'">
        <div class="caption">Angkatan<br>2022</div>
      </div>
    </div>
    <div class="hero-photo hp-bl">
      <div class="polaroid">
        <div class="tape tl"></div>
        <img src="https://lh3.googleusercontent.com/d/1JVbeyBbGCxJZvBkHm6xHu3ec40PWYZ3E=w220" alt="Angkatan 2023"
             referrerpolicy="no-referrer"
             @error="e => e.target.src='https://drive.google.com/thumbnail?id=1JVbeyBbGCxJZvBkHm6xHu3ec40PWYZ3E&sz=w220'">
        <div class="caption">Angkatan<br>2023</div>
      </div>
    </div>
    <div class="hero-photo hp-br">
      <div class="polaroid">
        <div class="tape tr"></div>
        <img src="https://lh3.googleusercontent.com/d/1w7bVYUY0DOHG-Y33rba99MW12IzkxKcU=w220" alt="Angkatan 2016"
             referrerpolicy="no-referrer"
             @error="e => e.target.src='https://drive.google.com/thumbnail?id=1w7bVYUY0DOHG-Y33rba99MW12IzkxKcU&sz=w220'">
        <div class="caption">Angkatan<br>2016</div>
      </div>
    </div> -->

    <!-- Stamp -->
    <!-- <div class="hero-stamp stamp-left">
      <span class="big">10</span>
      YEARS<br>OF<br>MEMORIES
    </div>
    <div class="since-badge">SINCE 2015</div> -->

    <!-- Doodles -->
    <div class="absolute z-2 pointer-events-none text-orange opacity-22 top-[14%] left-[16%] text-[2rem] -rotate-[20deg]">♪</div>
    <div class="absolute z-2 pointer-events-none text-orange opacity-22 top-[20%] right-[20%] text-[1.4rem] rotate-[15deg]">♫</div>
    <div class="absolute z-2 pointer-events-none text-orange opacity-22 bottom-[26%] left-[12%] text-[1.8rem] -rotate-[10deg]">✎</div>
    <div class="absolute z-2 pointer-events-none text-orange opacity-22 bottom-[20%] right-[14%] text-[2.2rem] rotate-[20deg]">♬</div>
    <div class="absolute z-2 pointer-events-none text-orange opacity-30 top-[55%] left-[18%] text-[1.2rem]">★</div>
    <div class="absolute z-2 pointer-events-none text-orange opacity-30 top-[60%] right-[18%] text-[1.5rem]">✦</div>

    <!-- Stars -->
    <div class="hstar hs1">✦</div>
    <div class="hstar hs2">✦</div>
    <div class="hstar hs3">✦</div>
    <div class="hstar hs4">✦</div>
    <div class="hstar hs5">✦</div>
    <div class="hstar hs6">✦</div>

    <div class="relative z-6 flex flex-col items-center">
      <!-- <div class="hero-kreasi">KREASI</div>
      <div class="hero-year">2025</div> -->
      <div><img src="/assets/logo/kreasi.png" alt=""></div>
      <div class="font-bold text-[clamp(.85rem,4vw,1.4rem)] tracking-[.22em] uppercase text-cream opacity-90 mt-4 mb-2 border-t border-b border-[rgba(176,128,60,.3)] py-2 px-8 inline-block">1 Dekade, 1 Rumah, 1 Cerita</div>
      <p class="font-hand text-[clamp(.8rem,2.5vw,1rem)] text-cream opacity-65 max-w-[460px] mx-auto mt-3.5 mb-7 leading-[1.75]">Sepuluh tahun perjalanan penuh makna, tawa, lelah, perjuangan, kebersamaan, dan ribuan kenangan yang membentuk kita menjadi satu keluarga.</p>
      <a href="#timeline" class="btn-cta inline-block py-3.5 px-10 bg-red text-cream font-bold text-[.88rem] tracking-[.18em] uppercase border-2 border-black shadow-[4px_4px_0_#000] transition-[transform,box-shadow,background] duration-200 relative hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#000] hover:bg-[#d42e0f]">Mulai Menjelajahi Kenangan</a>
    </div>

    <div class="absolute left-0 right-0 bottom-0 z-5 flex gap-[7px] px-6">
      <span class="block h-[11px] bg-red w-[58px]"></span>
      <span class="block h-[11px] bg-red w-[58px]"></span>
      <span class="block h-[11px] bg-red w-[58px]"></span>
      <span class="block h-[11px] bg-red w-[58px]"></span>
    </div>
  </section>
</template>

<script setup>
</script>
