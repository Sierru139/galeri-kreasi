import { reactive } from 'vue'

// ── FALLBACK BACKUP ANGKATAN DATA ──
// Used as initial state and when the Google Drive API fetch is not active or fails.
// Note: You can manually override the timeline Polaroid image by adding: timelinePhoto: 'GOOGLE_DRIVE_FILE_ID'
export const fallbackAngkatanData = [
  { year: 2015, desc: 'CERITA LAMA MELENGKAPI CERITA CERITA YANG PERNAH ADA', tooltip: 'Awal perjalanan KREASI dimulai', logo: '1fWN8Wp4AnisnKC5lVm7qnLUXbT-JiV2U', photo: null, timelinePhoto: '1CWBHUcUQ3iJEgCKYXa5o_edDVZ0EYl_r' },
  { year: 2016, desc: 'MENYATUKAN CERITA DALAM DEBAR HARMONI', tooltip: 'Langkah baru menuju yang lebih baik', logo: '1WrkS_YJ46w7N-TSLV9FeZbESv82N8ni7', photo: '1w7bVYUY0DOHG-Y33rba99MW12IzkxKcU' },
  { year: 2017, desc: 'ALEA JACTA EST', tooltip: 'Kami tumbuh bersama lebih kuat', logo: '1Y9TU_9whwoeFnimYEw3knB-SmuTeq3_E', photo: '1WuJs3BXW0-Ym-8NXGci8RPNr5kWZC5UU', },
  { year: 2018, desc: 'KUMPULAN CERITA TERKESAN CANGGIH DALAM BINGKAI PERSAUDARAAN', tooltip: 'Semakin kuat, semakin solid', logo: '1AR0qbs1uDeYCKTJlCOS8v_JHGRuPVSZ0', photo: null, timelinePhoto: '1CWBHUcUQ3iJEgCKYXa5o_edDVZ0EYl_r' },
  { year: 2019, desc: 'SATUKAN PERBEDAAN ABADIKAN KEBERSAMAAN', tooltip: 'Banyak cerita baru tercipta', logo: '1r2lxGdmP_FE6JF2FXuNmV2fnYxK4Bcru', photo: null, timelinePhoto: '1bE5YB3ug-KYpb9YVTPb_h1eidyBcn2dJ' },
  { year: 2020, desc: 'MERAJUT TALI PERSAUDARAAN MELALUI KISAH KLASIK', tooltip: 'Bertahan & belajar di masa sulit', logo: '1wMv-m8Yg1i3D_wm5HJeHh1fR3baNuJEd', photo: '1RNvUlpizxwdlcpBUCoS08urUS7pMj-0L' },
  { year: 2021, desc: 'MY STORY YOUR STORY OUR STORY', tooltip: 'Bangkit kembali lebih bersemangat', logo: '1WrgVeago4XbJAcIg4mhUG_oKqx1mmGS6', photo: '1xS4MwcBQCSj7spPARC1RjbyIyyjyX-cN' },
  { year: 2022, desc: 'MELANGKAH, MENYATU, DALAM KEBERANIAN', tooltip: 'Lebih dari biasanya, lebih bermakna', logo: '1_kJguf2FXRxE0GllauHl6x-rkQTeynsJ', photo: '1CKqN100IpsQn3XDUoa5gFfgD9SoEETvz' },
  { year: 2023, desc: 'MENYATUKAN SEMUA CAHAYA DEMI MIMPI BERASAMA', tooltip: 'Tahun yang penuh warna dan cerita', logo: '1NXhMgif8gaVE33wJad5SdIqkrHCZ5R7x', photo: '1JVbeyBbGCxJZvBkHm6xHu3ec40PWYZ3E' },
  { year: 2024, desc: 'TERIKAT DALAM SATU ARAH', tooltip: 'Persiapan menyambut satu dekade', logo: '12LIBf-7d63EWqeA7CdMGW7qgcMKhGdPc', photo: '14Go5GI-DdnUPAgxaYp8Y4E0ksaDIfmun' },
  { year: 2025, desc: '1 DEKADE, 1 RUMAH, 1 CERITA', tooltip: '1 Dekade, 1 Rumah, 1 Cerita', logo: '1MzTxTGCgseyWJIqt4aYIZLWOK_4bqzYk', photo: '17iZ9FCOJTgFmBrx2JKaZdND8PvYmFj9P', timelinePhoto: '17iZ9FCOJTgFmBrx2JKaZdND8PvYmFj9P', active: true, fallbackVideos: [{ id: '1MzTxTGCgseyWJIqt4aYIZLWOK_4bqzYk', name: 'Closing KREASI 2025.mp4', mimeType: 'video/mp4' }] },
]

// Reactive array exported for all components to consume directly
export const angkatanData = reactive(
  fallbackAngkatanData.map(item => ({
    ...item,
    photos: item.photo ? [item.photo] : [],
    videos: item.fallbackVideos || []
  }))
)

export const rotClasses = ['gi-rot1', 'gi-rot2', 'gi-rot3', 'gi-rot4', 'gi-rot5', 'gi-rot6']

export function driveImgUrl(id, w) {
  return `https://lh3.googleusercontent.com/d/${id}=w${w || 600}`
}

// Helper to recursively fetch image and video files inside a folder
async function fetchMediaInFolder(folderId, apiKey) {
  try {
    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+trashed=false&fields=files(id,name,mimeType)&pageSize=1000&key=${apiKey}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Fetch failed for folder ${folderId}: ${res.statusText}`)
    const data = await res.json()
    const items = data.files || []

    const media = items.filter(item => item.mimeType.startsWith('image/') || item.mimeType.startsWith('video/'))
    const subfolders = items.filter(item => item.mimeType === 'application/vnd.google-apps.folder')

    // Recursively query subfolders (useful if images/videos are placed in nested subfolders like 'koleksi_foto' or 'koleksi_video')
    const subfolderPromises = subfolders.map(sub => fetchMediaInFolder(sub.id, apiKey))
    const subfolderResults = await Promise.all(subfolderPromises)

    return [...media, ...subfolderResults.flat()]
  } catch (err) {
    console.error(`Error listing folder ${folderId} files:`, err)
    return []
  }
}

// ── DYNAMIC DRIVE INTEGRATION (Option B) ──
export async function fetchDriveData(apiKey) {
  if (!apiKey) {
    console.warn("VITE_GD_API_KEY is not defined. Using hardcoded backup data.")
    return
  }

  const rootFolderId = '1gTgVNAbr2jKjuBePKkmwLk_ZRZe62iEq'
  try {
    // 1. Get all subfolders directly under root folder
    const folderUrl = `https://www.googleapis.com/drive/v3/files?q='${rootFolderId}'+in+parents+and+mimeType='application/vnd.google-apps.folder'+and+trashed=false&fields=files(id,name)&key=${apiKey}`
    const folderRes = await fetch(folderUrl)
    if (!folderRes.ok) throw new Error(`Folder listing failed: ${folderRes.statusText}`)
    const folderData = await folderRes.json()
    const folders = folderData.files || []

    const yearFolderMap = {}
    let logoFolderId = null

    folders.forEach(f => {
      const cleanName = f.name.trim().toLowerCase()
      if (cleanName.includes('logo')) {
        logoFolderId = f.id
      } else {
        const yearInt = parseInt(cleanName)
        if (!isNaN(yearInt)) {
          yearFolderMap[yearInt] = f.id
        }
      }
    })

    // 2. Fetch logos in the logo folder
    const yearLogoMap = {}
    if (logoFolderId) {
      const logos = await fetchMediaInFolder(logoFolderId, apiKey)
      logos.forEach(file => {
        const match = file.name.match(/\d{4}/)
        if (match) {
          const yr = parseInt(match[0])
          yearLogoMap[yr] = file.id
        }
      })
    }

    // 3. Fetch media (photos and videos) for each year in parallel
    const yearPromises = Object.entries(yearFolderMap).map(async ([yrStr, fId]) => {
      const yr = parseInt(yrStr)
      const media = await fetchMediaInFolder(fId, apiKey)

      const photos = media.filter(item => item.mimeType.startsWith('image/'))
      const videos = media.filter(item => item.mimeType.startsWith('video/'))

      return {
        year: yr,
        photoIds: photos.map(img => img.id),
        videos: videos.map(vid => ({
          id: vid.id,
          name: vid.name,
          mimeType: vid.mimeType
        }))
      }
    })

    const yearResults = await Promise.all(yearPromises)
    const yearPhotosMap = {}
    const yearVideosMap = {}
    yearResults.forEach(res => {
      yearPhotosMap[res.year] = res.photoIds
      yearVideosMap[res.year] = res.videos
    })

    // 4. Update reactive angkatanData list
    const updatedList = fallbackAngkatanData.map(item => {
      const year = item.year
      const photos = yearPhotosMap[year] || []
      const videos = yearVideosMap[year] || []
      const logoId = yearLogoMap[year] || item.logo
      const finalPhoto = photos.length > 0 ? photos[0] : item.photo

      return {
        ...item,
        logo: logoId,
        photo: finalPhoto,
        photos: photos.length > 0 ? photos : (finalPhoto ? [finalPhoto] : []),
        videos: videos.length > 0 ? videos : (item.fallbackVideos || [])
      }
    })

    // Mutate the array reactively in-place
    angkatanData.length = 0
    angkatanData.push(...updatedList)

    console.log("Successfully synchronized with Google Drive dynamic folders:", updatedList)
  } catch (err) {
    console.error("Google Drive synchronization failed, keeping fallback data:", err)
  }
}
