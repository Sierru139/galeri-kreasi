import { reactive } from 'vue'

// ── FALLBACK BACKUP ANGKATAN DATA ──
// Used as initial state and when the Google Drive API fetch is not active or fails.
export const fallbackAngkatanData = [
  { year: 2015, desc: 'Awal Perjalanan',     tooltip: 'Awal perjalanan KREASI dimulai',        logo: '1fWN8Wp4AnisnKC5lVm7qnLUXbT-JiV2U', photo: null },
  { year: 2016, desc: 'Langkah Baru',        tooltip: 'Langkah baru menuju yang lebih baik',   logo: '1WrkS_YJ46w7N-TSLV9FeZbESv82N8ni7', photo: '1w7bVYUY0DOHG-Y33rba99MW12IzkxKcU' },
  { year: 2017, desc: 'Tumbuh Bersama',      tooltip: 'Kami tumbuh bersama lebih kuat',        logo: '1Y9TU_9whwoeFnimYEw3knB-SmuTeq3_E', photo: '1WuJs3BXW0-Ym-8NXGci8RPNr5kWZC5UU' },
  { year: 2018, desc: 'Semakin Kuat',        tooltip: 'Semakin kuat, semakin solid',           logo: '1AR0qbs1uDeYCKTJlCOS8v_JHGRuPVSZ0', photo: null },
  { year: 2019, desc: 'Banyak Cerita',       tooltip: 'Banyak cerita baru tercipta',           logo: '1r2lxGdmP_FE6JF2FXuNmV2fnYxK4Bcru', photo: null },
  { year: 2020, desc: 'Bertahan & Belajar',  tooltip: 'Bertahan & belajar di masa sulit',      logo: '1wMv-m8Yg1i3D_wm5HJeHh1fR3baNuJEd', photo: '1RNvUlpizxwdlcpBUCoS08urUS7pMj-0L' },
  { year: 2021, desc: 'Bangkit Kembali',     tooltip: 'Bangkit kembali lebih bersemangat',     logo: '1WrgVeago4XbJAcIg4mhUG_oKqx1mmGS6', photo: '1xS4MwcBQCSj7spPARC1RjbyIyyjyX-cN' },
  { year: 2022, desc: 'Lebih Dari Biasanya', tooltip: 'Lebih dari biasanya, lebih bermakna',   logo: '1_kJguf2FXRxE0GllauHl6x-rkQTeynsJ', photo: '1CKqN100IpsQn3XDUoa5gFfgD9SoEETvz' },
  { year: 2023, desc: 'Penuh Warna',         tooltip: 'Tahun yang penuh warna dan cerita',     logo: '1NXhMgif8gaVE33wJad5SdIqkrHCZ5R7x', photo: '1JVbeyBbGCxJZvBkHm6xHu3ec40PWYZ3E' },
  { year: 2024, desc: 'Menuju 10 Tahun',     tooltip: 'Persiapan menyambut satu dekade',       logo: '12LIBf-7d63EWqeA7CdMGW7qgcMKhGdPc', photo: '14Go5GI-DdnUPAgxaYp8Y4E0ksaDIfmun' },
  { year: 2025, desc: '1 Dekade, 1 Cerita',  tooltip: '1 Dekade, 1 Rumah, 1 Cerita 🎉',         logo: '1MzTxTGCgseyWJIqt4aYIZLWOK_4bqzYk', photo: null, active: true },
]

// Reactive array exported for all components to consume directly
export const angkatanData = reactive(
  fallbackAngkatanData.map(item => ({
    ...item,
    photos: item.photo ? [item.photo] : []
  }))
)

export const rotClasses = ['gi-rot1', 'gi-rot2', 'gi-rot3', 'gi-rot4', 'gi-rot5', 'gi-rot6']

export function driveImgUrl(id, w) {
  return `https://lh3.googleusercontent.com/d/${id}=w${w || 600}`
}

// Helper to recursively fetch image files inside a folder (including inside any subfolders, e.g., 'koleksi_foto')
async function fetchImagesInFolder(folderId, apiKey) {
  try {
    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+trashed=false&fields=files(id,name,mimeType)&pageSize=1000&key=${apiKey}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Fetch failed for folder ${folderId}: ${res.statusText}`)
    const data = await res.json()
    const items = data.files || []

    const images = items.filter(item => item.mimeType.startsWith('image/'))
    const subfolders = items.filter(item => item.mimeType === 'application/vnd.google-apps.folder')

    // Recursively query subfolders (useful if images are placed in nested subfolders like 'koleksi_foto')
    const subfolderImagesPromises = subfolders.map(sub => fetchImagesInFolder(sub.id, apiKey))
    const subfolderImagesList = await Promise.all(subfolderImagesPromises)

    return [...images, ...subfolderImagesList.flat()]
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
      const logos = await fetchImagesInFolder(logoFolderId, apiKey)
      logos.forEach(file => {
        const match = file.name.match(/\d{4}/)
        if (match) {
          const yr = parseInt(match[0])
          yearLogoMap[yr] = file.id
        }
      })
    }

    // 3. Fetch images for each year in parallel (avoids 403 bulk query issue and queries recursively)
    const yearPromises = Object.entries(yearFolderMap).map(async ([yrStr, fId]) => {
      const yr = parseInt(yrStr)
      const photos = await fetchImagesInFolder(fId, apiKey)
      return {
        year: yr,
        photoIds: photos.map(img => img.id)
      }
    })

    const yearResults = await Promise.all(yearPromises)
    const yearPhotosMap = {}
    yearResults.forEach(res => {
      yearPhotosMap[res.year] = res.photoIds
    })

    // 4. Update reactive angkatanData list
    const updatedList = fallbackAngkatanData.map(item => {
      const year = item.year
      const photos = yearPhotosMap[year] || []
      const mainPhoto = photos.length > 0 ? photos[0] : null
      const logoId = yearLogoMap[year] || item.logo

      return {
        ...item,
        logo: logoId,
        photo: mainPhoto,
        photos: photos.length > 0 ? photos : (mainPhoto ? [mainPhoto] : [])
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
