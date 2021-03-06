import sharp, { FormatEnum } from 'sharp'

interface FixedFn {
  folderName: string
  picName: string
  originalWidth: number
  originalHeight: number
  width: number
  alt: string
  nums: number[]
  exts: (keyof FormatEnum)[]
}
const fixedSize = async ({
  folderName,
  picName,
  originalWidth,
  originalHeight,
  width,
  alt,
  nums,
  exts,
}: FixedFn): Promise<void> => {
  const source = []
  const height = Math.round((originalHeight / originalWidth) * width)

  // loop all extensions.
  for (const ext of exts) {
    const files = []

    // create different file sizes
    for (const num of nums) {
      const fileName = `${folderName}/${picName.replace(/.\w{3,4}$/, '')}-${
        width * num
      }w${height * num}h.${ext}`
      await sharp(`${folderName}/${picName}`)
        .resize(width * num, height * num)
        .toFormat(ext)
        .toFile(fileName)
      // add filenames for console.log
      files.push(`/${fileName} ${width * num}w`)
    }

    //media: true/false, if true, use these images.
    //sizes: true/false, tell browser how much of vw image will take up.
    //srcset: show image widths. Allow browser to choose correct image.
    source.push(
      `<source type="image/${ext}"
        srcSet="${files.join(', ')}"
      />`
    )
  } //end for loop

  //final print. make sure to add width and height to class, to prevent layout shift.
  console.log(
    `let basePath = '/next-territory-app'
    if (process.env.NEXT_PUBLIC_BUILD_TYPE === 'local') {
      basePath = ''
    }

    <picture>
    ${source.join('\n\n')}

    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/${folderName}/${picName.replace(
      /.\w{3,4}$/,
      ''
    )}-${width}w${height}h.jpg" alt="${alt}" className={styles.${folderName}Img} width={${width}} height={${height}} />
    </picture>

    // css className
    .${folderName}Img {
      width: ${width};
      height: ${height};
    }
    `
  )
}
export default fixedSize
