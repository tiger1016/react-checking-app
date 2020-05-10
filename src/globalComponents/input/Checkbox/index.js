// Libraries
import React from 'react'
import classNames from 'classnames'
import { Field } from 'redux-form'

// Components
import LabelText from '../LabelText'

// Styles
import './index.css'

/**
 * Redux Form checkbox
 * @param  {Object}     props  [description]
 * @return {Component}         [description]
 */
const reduxFormCheckbox = props => <label>
  <Field id={props.id} name={props.name} component='input' type='checkbox' checked={props.checked} />
  <div />
  <LabelText text={props.label} />
</label>

/**
 * Regular checkbox
 * @param  {Object}     props  [description]
 * @return {Component}         [description]
 */
const regularCheckbox = props => <label>
  <input id={props.id} type='checkbox' name={props.name} checked={props.checked} onChange={props.onChange} />
  <div />
  <LabelText text={props.label} />
</label>

/**
 * [description]
 * @param  {[type]} props [description]
 * @return {[type]}       [description]
 */
const containerClassNames = props => {
  let {
    child,
    parentOf,
    small
  } = props
  return classNames({
    'checkbox-input': true,
    'child': child,
    'parent': parentOf,
    'small': small
  })
}

/**
 * Main render
 * @param  {Object}     props  [description]
 * @return {Component}         [description]
 */
export default props => <div className={containerClassNames(props)}>
  {props.reduxForm ? reduxFormCheckbox(props) : regularCheckbox(props)}
</div>
