import { readdir, copyFile, rename, mkdir, stat } from 'fs/promises'
import { join, extname, basename } from 'path'
import { existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const ASSETS_DIR = join(__dirname, '..', 'src', 'assets')
const OPTIMIZED_DIR = join(__dirname, '..', 'src', 'assets-optimized')
const BACKUP_DIR = join(__dirname, '..', 'src', 'assets-backup')

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp']

async function main() {
  console.log('🔄 Applying Optimized Images')
  console.log('=' .repeat(50))
  
  // Check if optimized directory exists
  if (!existsSync(OPTIMIZED_DIR)) {
    console.log('❌ No optimized images found. Run npm run compress-images first.')
    return
  }
  
  // Create backup directory
  if (!existsSync(BACKUP_DIR)) {
    await mkdir(BACKUP_DIR, { recursive: true })
    console.log('📁 Created backup directory')
  }
  
  // Get all files from assets directory
  const assetFiles = await readdir(ASSETS_DIR)
  const optimizedFiles = await readdir(OPTIMIZED_DIR)
  
  let replaced = 0
  let totalSaved = 0
  
  for (const file of assetFiles) {
    const ext = extname(file).toLowerCase()
    if (!IMAGE_EXTENSIONS.includes(ext)) continue
    
    const originalPath = join(ASSETS_DIR, file)
    const fileStat = await stat(originalPath)
    if (fileStat.isDirectory()) continue
    
    // Find matching optimized file (case insensitive)
    const optimizedFile = optimizedFiles.find(
      f => f.toLowerCase() === file.toLowerCase()
    )
    
    if (optimizedFile) {
      const optimizedPath = join(OPTIMIZED_DIR, optimizedFile)
      const backupPath = join(BACKUP_DIR, file)
      
      // Get sizes for comparison
      const originalSize = fileStat.size
      const optimizedStats = await stat(optimizedPath)
      const optimizedSize = optimizedStats.size
      
      // Backup original
      await copyFile(originalPath, backupPath)
      
      // Replace with optimized
      await copyFile(optimizedPath, originalPath)
      
      const saved = originalSize - optimizedSize
      totalSaved += saved
      replaced++
      
      console.log(`✓ ${file}: saved ${(saved / 1024).toFixed(0)}KB`)
    }
  }
  
  console.log('\n' + '='.repeat(50))
  console.log(`✅ Replaced ${replaced} images`)
  console.log(`💾 Total saved: ${(totalSaved / 1024 / 1024).toFixed(2)}MB`)
  console.log(`📦 Backups stored in: src/assets-backup/`)
}

main().catch(console.error)

