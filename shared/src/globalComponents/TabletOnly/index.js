// Libraries
import React from 'react'
import MediaQuery from 'react-responsive'

// Constants
import { appController } from '../../../controllers'

export default (props) => <MediaQuery minWidth={appController.constants.MOBILE_BREAKPOINT + 1} maxWidth={appController.constants.TABLET_BREAKPOINT}>
  <div
    className={props.fullWidth ? 'TabletOnly TabletOnly-fullWidthResponsive' : 'TabletOnly'}
    style={{
      ...props.style,
      width: (props.fullWidth ? '100%' : 'auto')
    }}
  >
    {props.children}
  </div>
</MediaQuery>
