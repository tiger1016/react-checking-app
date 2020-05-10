// Libraries
import React from 'react'
import MediaQuery from 'react-responsive'

// Controllers
import { appController } from 'Controllers/appController'

export default (props) => <MediaQuery maxWidth={appController.constants.MOBILE_BREAKPOINT}>
  <div
    className={props.fullWidth ? 'MobileOnly MobileOnly-fullWidthResponsive' : 'MobileOnly'}
    style={{
      ...props.style,
      width: (props.fullWidth ? '100%' : 'auto')
    }}
  >
    {props.children}
  </div>
</MediaQuery>
