// Libraries
import React from 'react'
import Loadable from 'react-loadable'

// Config
import loadableConfig from 'Config/loadable.config'

const LoadingComponent = props => <div />

const _loadableConfig = {
  ...loadableConfig,
  loading: LoadingComponent
}

export default Loadable({
  ..._loadableConfig,
  loader: () => import('./MobileAndTabletOnly')
})
