import sharp, { FormatEnum } from 'sharp'

type Sizes = {
  mediaQuery: string
  width: number
}
interface ResponsiveType {
  folderName: string
  picName: string
  sizes: Sizes[]
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
  // aspect ratio calculations.
  //const height = Math.round((originalHeight / originalWidth) * newWidth)
  //const width = Math.round((originalWidth / originalHeight) * newHeight)

  //this is needed to change basepath variable for github pages.
  const basePath = 'basePath'
  // push each source
  const source = []
  //loop widths
  for (const { mediaQuery, width } of sizes) {
    // make sure you find the ratio of all pics: w/h = ratio.
    // may have to crop picture to get correct ratio, if using multiple pics
    // you know width you want image to be, find height to keep aspect ratio.
    const height = Math.round((originalHeight / originalWidth) * width)

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
      source.push(
        `<source type="image/${ext}" sizes="(${mediaQuery}) ${width}px"
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
    )}-400w600h.jpg\`} alt="${alt}" className={styles.${folderName}Img} />
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
