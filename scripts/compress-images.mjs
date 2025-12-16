import sharp from 'sharp'
import { readdir, stat, mkdir } from 'fs/promises'
import { join, extname, basename } from 'path'
import { existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const ASSETS_DIR = join(__dirname, '..', 'src', 'assets')
const OUTPUT_DIR = join(__dirname, '..', 'src', 'assets-optimized')

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG']

// Compression settings for different use cases
const COMPRESSION_SETTINGS = {
  // For hero images and large displays
  large: { width: 1920, quality: 80 },
  // For card images and thumbnails
  medium: { width: 800, quality: 75 },
  // For small thumbnails
  small: { width: 400, quality: 70 }
}

async function getImageFiles(dir) {
  const files = await readdir(dir)
  const imageFiles = []
  
  for (const file of files) {
    const filePath = join(dir, file)
    const fileStat = await stat(filePath)
    
    if (fileStat.isDirectory()) {
      // Skip the magazine subdirectory and other subdirs
      continue
    }
    
    const ext = extname(file)
    if (IMAGE_EXTENSIONS.includes(ext)) {
      imageFiles.push(filePath)
    }
  }
  
  return imageFiles
}

async function compressImage(inputPath, outputPath) {
  const ext = extname(inputPath).toLowerCase()
  const fileName = basename(inputPath)
  
  try {
    const inputStats = await stat(inputPath)
    const inputSizeKB = (inputStats.size / 1024).toFixed(2)
    
    let sharpInstance = sharp(inputPath)
    const metadata = await sharpInstance.metadata()
    
    // Determine target size based on original dimensions
    let targetWidth = metadata.width
    if (metadata.width > 1920) {
      targetWidth = 1920
    } else if (metadata.width > 1200) {
      targetWidth = 1200
    } else if (metadata.width > 800) {
      targetWidth = 800
    }
    
    // Resize if necessary
    if (targetWidth < metadata.width) {
      sharpInstance = sharpInstance.resize(targetWidth, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
    }
    
    // Apply compression based on format
    if (ext === '.png') {
      await sharpInstance
        .png({ quality: 80, compressionLevel: 9 })
        .toFile(outputPath)
    } else {
      // Convert JPEG/JPG to optimized JPEG with WebP also generated
      await sharpInstance
        .jpeg({ quality: 75, progressive: true, mozjpeg: true })
        .toFile(outputPath)
        
      // Also generate WebP version
      const webpPath = outputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp')
      await sharp(inputPath)
        .resize(targetWidth, null, { withoutEnlargement: true, fit: 'inside' })
        .webp({ quality: 75 })
        .toFile(webpPath)
    }
    
    const outputStats = await stat(outputPath)
    const outputSizeKB = (outputStats.size / 1024).toFixed(2)
    const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1)
    
    console.log(`✓ ${fileName}: ${inputSizeKB}KB → ${outputSizeKB}KB (${savings}% smaller)`)
    
  } catch (error) {
    console.error(`✗ Error compressing ${fileName}:`, error.message)
  }
}

async function main() {
  console.log('🖼️  Image Compression Script')
  console.log('=' .repeat(50))
  console.log(`Input directory: ${ASSETS_DIR}`)
  console.log(`Output directory: ${OUTPUT_DIR}`)
  console.log('')
  
  // Create output directory if it doesn't exist
  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true })
  }
  
  // Get all image files
  const imageFiles = await getImageFiles(ASSETS_DIR)
  console.log(`Found ${imageFiles.length} images to compress\n`)
  
  let totalInputSize = 0
  let totalOutputSize = 0
  
  for (const inputPath of imageFiles) {
    const fileName = basename(inputPath)
    const outputPath = join(OUTPUT_DIR, fileName.toLowerCase())
    
    const inputStats = await stat(inputPath)
    totalInputSize += inputStats.size
    
    await compressImage(inputPath, outputPath)
    
    try {
      const outputStats = await stat(outputPath)
      totalOutputSize += outputStats.size
    } catch {
      // Output file might not exist if compression failed
    }
  }
  
  console.log('\n' + '='.repeat(50))
  console.log(`Total: ${(totalInputSize / 1024 / 1024).toFixed(2)}MB → ${(totalOutputSize / 1024 / 1024).toFixed(2)}MB`)
  console.log(`Total savings: ${((1 - totalOutputSize / totalInputSize) * 100).toFixed(1)}%`)
  console.log('\n📝 Next steps:')
  console.log('1. Review the optimized images in src/assets-optimized/')
  console.log('2. If satisfied, replace the originals with the optimized versions')
  console.log('3. Update imports if filenames changed')
}

main().catch(console.error)

