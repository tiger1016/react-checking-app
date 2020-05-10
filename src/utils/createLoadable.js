// Libraries
import React from 'react'
import Loadable from 'react-loadable'
import { withRouter } from 'react-router-dom'

// Config
import loadableConfig from 'Config/loadable.config'

// Components
import LoadablePlaceholder from 'GlobalComponents/LoadablePlaceholder'

const LoadingComponent = withRouter(props => {
  const { history, location } = props
  return <LoadablePlaceholder {...props} action={() => history.push(location.pathname)} />
})

const LoadingComponentNoRouter = props => <LoadablePlaceholder {...props} />

const lC = {
  ...loadableConfig,
  loading: LoadingComponent
}

export default (loader, options) => {
  if (options && options.noRouter) {
    lC.loading = LoadingComponentNoRouter
  }
  return Loadable({
    ...lC,
    loader
  })
}
