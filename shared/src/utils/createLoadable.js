// Libraries
import React from 'react'
import Loadable from 'react-loadable'

// Config
import loadableConfig from '../../config/loadable.config'

const LoadingComponent = props => <div>Loading</div>

const lC = {
  ...loadableConfig,
  loading: LoadingComponent
}

export default (loader, options) => {
  return Loadable({
    ...lC,
    loader
  })
}
