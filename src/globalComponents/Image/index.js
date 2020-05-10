// Libraries
import React from 'react'

export default class Image extends React.Component {
  constructor () {
    super()
    this.state = {
      hasError: false
    }
  }
  onError = () => this.setState({ hasError: true })
  render () {
    if (this.state.hasError) {
      return this.props.onErrorComponent || <div>Image Error</div>
    }
    return <img
      alt={this.props.alt}
      className={this.props.className}
      onError={this.onError}
      src={this.props.src}
      srcSet={this.props.srcSet}
    />
  }
}
