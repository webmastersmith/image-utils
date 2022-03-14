import sharp from 'sharp'
import fixedSize from './src/fixedSize'
import responsiveImage100vw from './src/responsive100vw'
import responsiveImageSizes from './src/responsiveSizes'
import {
  generatePlaceholderImageWithText,
  generatePlaceholderImage,
  ph,
} from './src/placeholder'
import fs from 'fs'
import path from 'path'
import { getPlaiceholder } from 'plaiceholder'

//run baby run!
;(async () => {
  // const metadata = await sharp('./heroCard.png').metadata()
  // console.log(metadata)

  //create placeholder
  const fileName = './p.jpeg'
  await generatePlaceholderImage(fileName, 100, 50)

  //Creates different extensions in different sizes.
  // make folder and store image into it.
  // await fixedSize({
  //   folderName: 'hero', //this will be folder name inside public folder.
  //   picName: 'heroCard.png',
  //   width: 300,
  //   height: 459,
  //   alt: 'territory card',
  //   nums: [1, 2, 3], //this is the multiplier for image size.
  //   exts: ['avif', 'webp', 'jpg'], //avif then webp should come first
  // })

  // //responsive Image sizes="100vw"
  // responsiveImage100vw({
  //   folderName: 'coffeeLetter',
  //   alt: 'image of coffee with man writing letter',
  //   picName: 'coffeeLetter.jpg',
  //   originalWidth: 4608,
  //   originalHeight: 3456,
  //   widths: [245, 290, 400],
  //   nums: [1, 2, 3], //this is the multiplier for image size.
  //   exts: ['avif', 'webp', 'jpg'], //avif then webp should come first
  // })

  //responsive Image sizes="(max-width: 768px) 245px, 400px" //can be px or vw. -not percentage.
  responsiveImageSizes({
    folderName: 'coffeeLetter',
    alt: 'image of man writing letter',
    picName: 'coffeeLetter.jpg',
    originalWidth: 2754,
    originalHeight: 4000,
    sizes: [
      { mediaQuery: 'max-width: 424px', width: 290 },
      { mediaQuery: 'max-width: 768px', width: 400 },
      { mediaQuery: 'min-width: 769px', width: 245 },
    ],
    nums: [1, 2, 3], //this is the multiplier for image size.
    exts: ['avif', 'webp', 'jpg'], //avif then webp should come first
  })
})()
