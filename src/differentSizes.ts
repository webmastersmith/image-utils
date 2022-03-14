import sharp, { FormatEnum } from 'sharp'

interface DifferentImageType {
  folderName: string
  picName: string
  width: number
  height: number
  alt: string
  nums: number[]
  exts: (keyof FormatEnum)[]
}
const differentImageSize = async ({
  folderName,
  picName,
  width,
  height,
  alt,
  nums,
  exts,
}: DifferentImageType): Promise<void> => {
  const source = []
  for (const ext of exts) {
    const files = []

    // create different file sizes
    for (const num of nums) {
      const fileName = `${folderName}/${picName}-${width * num}w${
        height * num
      }h.${ext}`
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

  // make pic exact width and height for img element.
  await sharp(`${folderName}/${picName}`)
    .resize(width, height)
    .toFile(`${folderName}/_${picName}`)

  //final print. make sure to add width and height to class, to prevent layout shift.
  console.log(
    `<picture className={styles.${folderName}Img}>
    ${source.join('\n\n')}

    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="${
      '/' + folderName + '/_' + picName
    }" alt="${alt}" width={${width}} height={${height}} />
    </picture>

    // css className
    .${folderName}Img {
      width: ${width};
      height: ${height};
    }
    `
  )
}
export default differentImageSize
