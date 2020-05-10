import CustomIcon from './index.ios'

// Generate required css
import fontMaterialIcons from 'react-native-vector-icons/Fonts/MaterialIcons.ttf'
import fontMaterialCommunityIcons from 'react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf'
import fontIonicons from 'react-native-vector-icons/Fonts/Ionicons.ttf'

const fontStylesMaterialIcons = `@font-face { src: url(${fontMaterialIcons}); font-family: MaterialIcons; }`
const fontStylesMaterialCommunityIcons = `@font-face { src: url(${fontMaterialCommunityIcons}); font-family: MaterialCommunityIcons; }`
const fontStylesIonicons = `@font-face { src: url(${fontIonicons}); font-family: Ionicons; }`

const fonts = [fontStylesMaterialIcons, fontStylesMaterialCommunityIcons, fontStylesIonicons]

fonts.forEach((font, index) => {
  // Create stylesheet
  const style = document.createElement('style')
  style.id = 'fonticons_' + index
  style.type = 'text/css'
  if (style.styleSheet) {
    style.styleSheet.cssText = font
  } else {
    style.appendChild(document.createTextNode(font))
  }
  // Inject stylesheet
  document.head.appendChild(style)
})

export default CustomIcon
