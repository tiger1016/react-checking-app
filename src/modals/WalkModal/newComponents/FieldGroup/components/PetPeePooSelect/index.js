// Libraries
import React from 'react'

// Components
import CheckBox from 'GlobalComponents/input/Checkbox'
import poo from '../../../../assets/poo.png'
import pee from '../../../../assets/pee.png'

// Styles
import './index.css'

export default props => <div className='PetPeePooSelect'>
  {props.endWalk && <CheckBox onChange={(e) => props.onChange({ type: 'pee', value: e.target.checked })} Checked={props.pee} />}{(props.endWalk || props.value.pee) && <span className='pee-poo-icon-container'><img style={{ height: '20px' }} src={pee} /></span>}
  {props.endWalk && <CheckBox onChange={(e) => props.onChange({ type: 'poo', value: e.target.checked })} Checked={props.poo} />}{(props.endWalk || props.value.poo) && <span className='pee-poo-icon-container'><img style={{ height: '20px' }} src={poo} /></span>}
</div>
