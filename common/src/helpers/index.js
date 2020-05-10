import { Platform } from 'react-native'

export const isWeb = Platform.OS === 'web'
export const isNative = !isWeb
export const isIos = Platform.OS === 'ios'
export const isAndroid = Platform.OS === 'android'
export const isDesktop = isWeb && typeof matchMedia !== 'undefined' && matchMedia('(min-width: 768px)').matches // eslint-disable-line
