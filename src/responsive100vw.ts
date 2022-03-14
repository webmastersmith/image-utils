import sharp, { FormatEnum } from 'sharp'

interface ResponsiveType {
  folderName: string
  picName: string
  widths: number[]
  originalHeight: number
  originalWidth: number
  alt: string
  nums: number[]
  exts: (keyof FormatEnum)[]
}
const responsiveImage100vw = async ({
  folderName,
  picName,
  widths,
  originalWidth,
  originalHeight,
  alt,
  nums,
  exts,
}: ResponsiveType): Promise<void> => {
  //inside loop
  // aspect ratio calculations.
  // const height = Math.round((originalHeight / originalWidth) * newWidth)
  //const width = Math.round((originalWidth / originalHeight) * newHeight)

  // push each source
  const source = []
  //loop widths
  for (const width of widths) {
    const height = Math.round((originalHeight / originalWidth) * width)

    // loop extensions
    for (const ext of exts) {
      const srcSetSizes = []

      //loop size multiplier to get sourceSet sizes
      for (const num of nums) {
        const fileName = `${folderName}/${picName.replace(/.\w{3,4}$/, '')}-${
          width * num
        }w${height * num}h.${ext}`
        await sharp(`${folderName}/${picName}`)
          .resize(width * num, height * num)
          .toFormat(ext)
          .toFile(fileName)
        // add filenames for console.log
        srcSetSizes.push(`/${fileName} ${width * num}w`)
      } //end for num loop

      //media: true/false, if true, use these images.
      //sizes: true/false, tell browser how much of vw image will take up.
      //srcset: show image widths. Allow browser to choose correct image.
      // with media because pic takes 100% of viewport.
      source.push(
        `<source media="(max-width: ${width}px)" type="image/${ext}"
          srcSet="${srcSetSizes.join(', ')}"
        />`
      )
    } //end for exts loop
  } //end for widths loop

  //final print. make sure to add width and height to class, to prevent layout shift.
  console.log(
    `<picture>
    ${source.join('\n\n')}

    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/${folderName}/${picName.replace(
      /.\w{3,4}$/,
      ''
    )}-400w600h.jpg" alt="${alt}" className={styles.${folderName}Img} />
    </picture>

    // css className
    .${folderName}Img {
      object-fit: cover;
      object-position: bottom;
}
    `
  )
}
export default responsiveImage100vw
