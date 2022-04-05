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
// import { getPlaiceholder } from 'plaiceholder'

//run baby run!
;(async () => {
  // const metadata = await sharp('./heroCard.png').metadata()
  // console.log(metadata)

  //create placeholder
  // const fileName = './p.jpeg'
  // await generatePlaceholderImage(fileName, 100, 50)

  //Fixed Size
  //Creates different extensions in different sizes, 1x, 2x, 3x.
  // make folder and store image into it.
  // await fixedSize({
  //   folderName: 'hero', //this will be folder name inside public folder.
  //   picName: 'heroCard.png',
  //   originalWidth: 1251,
  //   originalHeight: 1912,
  //   width: 300,
  //   alt: 'territory card',
  //   nums: [1, 2, 3], //this is the multiplier for image size.
  //   exts: ['avif', 'webp', 'jpg'], //avif then webp should come first
  // })

  //Responsive Images - 100vw
  //same as fixedSize, create images with a 'sizes' attribute of 100vw.
  //responsive Image sizes="100vw"
  // responsiveImage100vw({
  //   folderName: 'pen',
  //   alt: 'pen with letter',
  //   picName: 'pen.jpg',
  //   originalWidth: 4608,
  //   originalHeight: 3456,
  //   sizes: [375, 768, 1440],
  //   nums: [1, 2, 3], //this is the multiplier for image size.
  //   exts: ['avif', 'webp', 'jpg'], //avif then webp should come first
  // })

  //Responsive Images - multiple widths
  //create fixedSizes for different media queries.
  //responsive Image sizes="(max-width: 768px) 245px, 400px" //can be px or vw. -not percentage.
  // make sure you find the ratio of all pics: w/h = ratio.
  // may have to crop picture to get correct ratio, if using multiple pics
  responsiveImageSizes({
    folderName: 'girl',
    alt: 'girl writing letter in quiet spot',
    picName: 'girl.jpg',
    originalWidth: 2754,
    originalHeight: 4000,
    sizes: [
      { mediaQuery: 'max-width: 424px', width: 290 }, //0 - 424px
      { mediaQuery: 'max-width: 768px', width: 400 }, //425xp - 768px
      { mediaQuery: 'min-width: 769px', width: 245 }, //769px - ~
    ],
    nums: [1, 2, 3], //this is the multiplier for image size.
    exts: ['avif', 'webp', 'jpg'], //avif then webp should come first
  })
})()
