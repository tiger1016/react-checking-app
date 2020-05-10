// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import DataDisplay from './index'

storiesOf('DataDisplay  - web', module)
  .add('default', () => (
    <div style={{ padding: '10px' }}>
      <DataDisplay items={[{ label: 'Name', name: 'name', required: true }, { label: 'Type', name: 'type' }, { label: 'Breed', name: 'breed_id', type: 'petBreed-select' }, { label: 'Gender', name: 'gender', type: 'gender' }, { label: 'Color', name: 'color' }, { label: 'Weight', name: 'weight', type: 'number' }, { label: 'Energy level', name: 'energy_level', type: 'pet-energy' }, { label: 'Energy with Dogs', name: 'aggression_towards_dogs', type: 'pet-aggresssion' }, { label: 'Energy with Humans', name: 'aggression_towards_humans', type: 'pet-aggresssion' }, { label: 'Birthday', name: 'birthday', type: 'date-picker' }, { label: 'Collar info', name: 'collar_info', type: 'textarea' }, { label: 'Notes', name: 'notes', type: 'textarea' }]} />
    </div>
  ))
  .add('edit mode', () => (
    <div style={{ padding: '10px' }}>
      <DataDisplay edit items={[{ label: 'Name', name: 'name', required: true }, { label: 'Type', name: 'type' }, { label: 'Gender', name: 'gender', type: 'gender' }, { label: 'Color', name: 'color' }, { label: 'Weight', name: 'weight', type: 'number' }, { label: 'Energy level', name: 'energy_level', type: 'pet-energy' }, { label: 'Energy with Dogs', name: 'aggression_towards_dogs', type: 'pet-aggresssion' }, { label: 'Energy with Humans', name: 'aggression_towards_humans', type: 'pet-aggresssion' }, { label: 'Birthday', name: 'birthday', type: 'date-picker' }, { label: 'Collar info', name: 'collar_info', type: 'textarea' }, { label: 'Notes', name: 'notes', type: 'textarea' }]} />
    </div>
  ))
