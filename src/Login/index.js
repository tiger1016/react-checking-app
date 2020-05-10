// Libraries
import React from 'react'

// Component Utils
import createLoadable from 'Web/utils/createLoadable'

// Components
import DesktopOnly from 'Shared/globalComponents/DesktopOnly'
import MobileAndTabletOnly from 'Shared/globalComponents/MobileAndTabletOnly'

const DesktopLoadable = createLoadable(() => import('./Login'), {
  noRouter: true
})

const MobileLoadable = createLoadable(() => import('Shared/Login'), {
  noRouter: true
})

export default () => [
  <DesktopOnly key='desktop'>
    <DesktopLoadable />
  </DesktopOnly>,
  <MobileAndTabletOnly key='mobile'>
    <MobileLoadable />
  </MobileAndTabletOnly>
]
