// Libraries
import React from 'react'
import MediaQuery from 'react-responsive'

// Controllers
import { appController } from 'Controllers/appController'

export default (props) => <MediaQuery minWidth={appController.constants.MOBILE_BREAKPOINT + 1}>
  <div
    className={props.fullWidth ? 'desktopAndTabletOnly desktopAndTabletOnly-fullWidthResponsive' : 'desktopAndTabletOnly'}
    style={{
      ...props.style,
      width: (props.fullWidth ? '100%' : 'auto')
    }}
  >
    {props.children}
  </div>
</MediaQuery>
