export default (number, extension) => {
  if (process && process.env && process.env.PLATFORM_ENV && process.env.PLATFORM_ENV === 'web') {
    return `${number}${extension}`
  }
  return number
}
