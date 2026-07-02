<template>
  <section id="featured" style="background:var(--bg2)">
    <div class="sec-container">
      <div class="featured-label reveal">★ KENANGAN TERFAVORIT</div>
      <div class="featured-grid">

        <!-- Left: Image -->
        <div class="feat-img-wrap rv-left">
          <div class="pushpin" style="top:-12px;left:50%;transform:translateX(-50%)"></div>
          <div class="feat-polaroid">
            <img src="https://lh3.googleusercontent.com/d/14Go5GI-DdnUPAgxaYp8Y4E0ksaDIfmun=w900" alt="Angkatan 2024"
                 referrerpolicy="no-referrer"
                 @error="e => e.target.src='https://drive.google.com/thumbnail?id=14Go5GI-DdnUPAgxaYp8Y4E0ksaDIfmun&sz=w900'">
            <div class="feat-caption">Angkatan 2024</div>
          </div>

          <div class="feat-secondary">
            <div class="tape tl"></div>
            <img src="https://lh3.googleusercontent.com/d/1w7bVYUY0DOHG-Y33rba99MW12IzkxKcU=w300" alt="Angkatan 2016"
                 referrerpolicy="no-referrer"
                 @error="e => e.target.src='https://drive.google.com/thumbnail?id=1w7bVYUY0DOHG-Y33rba99MW12IzkxKcU&sz=w300'">
            <div class="caption">2016 ✨</div>
          </div>
        </div>

        <!-- Right: Notebook -->
        <div class="rv-right">
          <div class="notebook">
            <div class="notebook-holes">
              <div class="hole"></div><div class="hole"></div><div class="hole"></div>
              <div class="hole"></div><div class="hole"></div><div class="hole"></div>
            </div>
            <div class="notebook-tag">
              KREASI SI — 2015 / 2025
              <span class="feat-star">★</span>
            </div>
            <div class="notebook-title">Dari Angkatan<br>ke Angkatan</div>
            <p class="notebook-body">
              Sepuluh tahun, sebelas angkatan, satu identitas yang sama: KREASI. Setiap tahun datang dengan wajah barunya sendiri — logo baru, wajah-wajah baru, cerita baru — tapi rumahnya selalu sama.
              <br><br>
              Dari angkatan 2016 hingga 2024, jejak yang tersimpan di Drive ini adalah bukti bahwa satu rumah bisa menampung sepuluh cerita yang berbeda, namun tetap menyatu jadi satu perjalanan panjang.
            </p>
            <div class="notebook-quote">
              "Beda angkatan, beda logo, beda wajah — tapi tetap satu rumah yang sama."
            </div>
            <div class="notebook-attribution">Catatan Tim KREASI SI</div>
          </div>

          <!-- Torn paper side note -->
          <div style="margin-top:1.5rem;background:#a05828;padding:.75rem 1rem;transform:rotate(1deg);box-shadow:3px 3px 10px rgba(0,0,0,.5);max-width:280px;margin-left:auto">
            <p style="font-family:var(--f-hand);font-size:.82rem;color:#f8e0b0;line-height:1.6">
              "Satu dekade, sebelas logo, satu cerita panjang yang sama."
            </p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
</script>
