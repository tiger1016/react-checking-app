// Libraries
import React from 'react'
import _ from 'lodash'

// Utils
import {
  browser
} from 'Utils'

// Components
import Loader from 'GlobalComponents/Loader'

// Styles
import './index.css'
const addonSort = (a, b) => {
  if ((a.addon_name || a.name).toLowerCase() < (b.addon_name || b.name).toLowerCase()) { return -1 }
  if ((a.addon_name || a.name).toLowerCase() > (b.addon_name || b.name).toLowerCase()) { return 1 }
  return 0
}
export default props => <div className='AddonsSection'>
  {props.loading && <Loader />}
  {!props.loading && <div className='AddonsSection-options'>
    <div className='AddonsSection-column one'>
      {props.addons.sort(addonSort).map((a, i) => {
        return (i % 2) < 1 ? <div key={`column-one-${i}`}>
          <label style={{ color: '#808080', fontWeight: 'normal' }}>
            <input
              name={`addon ${(a.addon_name || a.name)}`}
              className='AddonsSection-checkbox'
              type='checkbox'
              checked={_.indexOf(props.selectedAddons, a.id) > -1}
              value={a.id}
              onChange={e => {
                let value = Number(e.target.value)
                let selectedAddons = props.selectedAddons.slice()
                let index = _.indexOf(selectedAddons, value)
                if (index > -1) {
                  selectedAddons.splice(index, 1)
                } else {
                  selectedAddons.push(Number(value))
                }
                props.selectAddons(selectedAddons)
              }}
              style={{ top: browser.isLinux() ? '-1px' : null }}
            />
            <span>{(a.addon_name || a.name)}</span>
          </label>
        </div> : null
      })}
    </div>
    <div className='AddonsSection-column two'>
      {props.addons.map((a, i) => {
        return (i % 2) > 0 ? <div key={`column-two-${i}`}>
          <label style={{ color: '#808080', fontWeight: 'normal' }}>
            <input
              name={`addon ${(a.addon_name || a.name)}`}
              className='AddonsSection-checkbox'
              type='checkbox'
              checked={_.indexOf(props.selectedAddons, a.id) > -1}
              value={a.id}
              onChange={e => {
                let value = Number(e.target.value)
                let selectedAddons = props.selectedAddons.slice()
                let index = _.indexOf(selectedAddons, value)
                if (index > -1) {
                  selectedAddons.splice(index, 1)
                } else {
                  selectedAddons.push(Number(value))
                }
                props.selectAddons(selectedAddons)
              }}
            />
            <span style={{ marginLeft: '4px' }}>{(a.addon_name || a.name)}</span>
          </label>
        </div> : null
      })}
    </div>
  </div>}
</div>
