// Libraries
import React from 'react'
import MediaQuery from 'react-responsive'

// Constants
import { appController } from 'Controllers/appController'

export default (props) => <MediaQuery minWidth={appController.constants.TABLET_BREAKPOINT + 1}>
  <div className={props.fullWidth ? 'desktopOnly desktopOnly-fullWidthResponsive' : 'desktopOnly'}
    style={{ ...props.style }}>
    {props.children}
  </div>
</MediaQuery>
