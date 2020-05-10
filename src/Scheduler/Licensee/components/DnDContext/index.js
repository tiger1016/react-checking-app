/*
* DnDprovider/index.js
* React Drag N Drop required element that provides the framework that allows browser drag and drop
*/

// Libraries
import React from 'react'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

// Styles
import './index.css'

export default props => <DndProvider backend={HTML5Backend}>
  <div className='DnDContext'>
    {props.children}
  </div>
</DndProvider>
