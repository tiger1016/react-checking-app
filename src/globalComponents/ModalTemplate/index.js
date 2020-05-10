// Libraries
import React from 'react'
import PropTypes from 'prop-types'

// Utils
import { utility } from 'Utils/utility'

// Controllers
import { appController } from 'Controllers/appController'

// Components
import Button from '../Button'
import ButtonGroup from '../ButtonGroup'

// Styles
import './index.css'

const ModalTemplate = props => (
  <div className={`ModalTemplate ${props.className}`}>
    {!props.noHeader && <div className='ModalTemplate-header'>
      <div className='title'>{props.title}</div>
      <div className='close'>
        <Button
          iconOnly='ion-close'
          onClick={() => { appController.closeModal() }}
          size='small'
          textOnly
        />
      </div>
    </div>}
    <div className='ModalTemplate-body'>
      {props.children || (utility.isAFunction(props.body) ? props.body() : props.body)}
    </div>
    {props.actions && !!props.actions.length && <div className='ModalTemplate-actions'>
      <ButtonGroup buttons={props.actions} />
    </div>}
  </div>
)

ModalTemplate.propTypes = {
  className: PropTypes.string,
  noHeader: PropTypes.bool,
  title: PropTypes.string,
  actions: PropTypes.array,
  children: PropTypes.node,
  body: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node
  ])
}

ModalTemplate.defaultProps = {
  className: '',
  noHeader: false,
  actions: [],
  children: null
}

export default ModalTemplate
