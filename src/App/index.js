// Libraries
import React from 'react'
import Loadable from 'react-loadable'

// Config
import loadableConfig from 'Config/loadable.config'

// Components
import LoadablePlaceholder from 'GlobalComponents/LoadablePlaceholder'

const loading = props => <LoadablePlaceholder {...props} />

const lC = {
  ...loadableConfig,
  loading,
  loader: () => import('./App')
}

export default Loadable(lC)
