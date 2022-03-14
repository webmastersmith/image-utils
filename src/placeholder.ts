import sharp, { FormatEnum } from 'sharp'
import { getPlaiceholder } from 'plaiceholder'

export const generatePlaceholderImageWithText = async (
  width: number,
  height: number,
  message: string
) => {
  const overlay = `<svg width="${width - 20}" height="${height - 20}">
    <text x="50%" y="50%" font-family="sans-serif" font-size="16" text-anchor="middle">${message}</text>
  </svg>`

  return await sharp({
    create: {
      width: width,
      height: height,
      channels: 4,
      background: { r: 230, g: 230, b: 230, alpha: 1 },
    },
  })
    .composite([
      {
        input: Buffer.from(overlay),
        gravity: 'center',
      },
    ])
    .jpeg()
    // .toBuffer();
    .toFile('./placeholder-text.jpeg')
}

export const generatePlaceholderImage = async (
  fileName: string,
  width: number,
  height: number
) => {
  const buf = await sharp('./' + fileName)
    .resize(width, height)
    .toFormat('jpg')
    .toFile('./placeholder.jpg')
}

export const ph = async (fileName: string) => {
  try {
    const b64 = await getPlaiceholder(fileName)
    console.log(b64)
  } catch (e) {
    console.log(e)
  }
}
