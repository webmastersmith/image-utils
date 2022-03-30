import sharp, { FormatEnum } from 'sharp'

interface ResponsiveType {
  folderName: string
  picName: string
  sizes: number[]
  originalHeight: number
  originalWidth: number
  alt: string
  nums: number[]
  exts: (keyof FormatEnum)[]
}
const responsiveImageSizes = async ({
  folderName,
  picName,
  sizes,
  originalWidth,
  originalHeight,
  alt,
  nums,
  exts,
}: ResponsiveType): Promise<void> => {
  //inside loop
  //aspect ratio calculations.
  //const height = Math.round((originalHeight / originalWidth) * newWidth)
  //const width = Math.round((originalWidth / originalHeight) * newHeight)

  //this is needed to change basepath variable for github pages.
  const basePath = 'basePath'
  // push each source
  const source = []
  //loop widths
  let maxWidth = 0
  let maxHeight = 0
  for (const [i, width] of sizes.entries()) {
    // you know width you want image to be, find height to keep aspect ratio.
    const height = Math.round((originalHeight / originalWidth) * width)
    maxWidth = width
    maxHeight = height

    // loop extensions. Create different extension for each width.
    for (const ext of exts) {
      const srcSetSizes = []

      //loop size 1x, 2x, 3x..., multiplier to get sourceSet sizes
      for (const num of nums) {
        const fileName = `${folderName}/${picName.replace(/.\w{3,4}$/, '')}-${
          width * num
        }w${height * num}h.${ext}`

        await sharp(`${folderName}/${picName}`)
          .resize(width * num, height * num)
          .toFormat(ext)
          .toFile(fileName)

        // add filenames for console.log
        srcSetSizes.push(`\$\{${basePath}\}/${fileName} ${width * num}w`)
      } //end for num loop

      //media: true/false, if true, use these images.
      //sizes: true/false, tell browser how much of vw image will take up.
      //srcset: show image widths. Allow browser to choose correct image.
      // create source block.

      // check if last item in array, then make 'min-width' to cover all bigger sizes.
      source.push(
        `<source type="image/${ext}" media="(${
          i === sizes.length - 1
            ? `min-width: ${sizes[i - 1] + 1}px`
            : `max-width: ${width}px`
        })"
            srcSet={\`${srcSetSizes.join(', ')}\`}
          />`
      )
    } //end for exts loop
  } //end sizes loop

  //final print. make sure to add width and height to class, to prevent layout shift.
  console.log(
    `let basePath = '/next-territory-app'
    if (process.env.NEXT_PUBLIC_BUILD_TYPE === 'local') {
      basePath = ''
    }
  
    <picture>
    ${source.join('\n\n')}

    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={\`\$\{${basePath}\}/${folderName}/${picName.replace(
      /.\w{3,4}$/,
      ''
    )}-${maxWidth}w${maxHeight}h.jpg\`} alt="${alt}" className={styles.${folderName}Img} />
    </picture>

    // css className
    .${folderName}Img {
      object-fit: cover;
      object-position: bottom;
      //width: 500px;
      //height: 500px;  //must have width and height
}
    `
  )
}
export default responsiveImageSizes
