export const getHeight = (
  originalHeight: number,
  originalWidth: number,
  width: number
) => {
  //ratio = w/h  //all pics should have the same ratio.
  //w = h * ratio
  //h = w / ratio
  return Math.round((originalHeight / originalWidth) * width)
}
