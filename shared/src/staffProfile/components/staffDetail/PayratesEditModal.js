// Libraries
import React from 'react'
import ReactModal from 'react-modal'

// Helpers

export default props => <ReactModal
  className='ReactModal__Content ReactModal__Content_Mobile--after-open'
  contentLabel='Payroll Detail'
  isOpen={props.isPayrateEditModalOpen}
  onAfterOpen={() => console.log('PayrollDetail modal after close')}
  onRequestClose={() => props.togglePayrateEdit()}>
  <div className='modal-main-container'>
    <div className='modal-header-container'>
      <div className='modal-header'>
        <span>{props.title}</span>
        <div>
          <button className='close-modal' onClick={() => props.togglePayrateEdit()}>X</button>
        </div>
      </div>
    </div>

    <div className='contact-container'>
      <div className='row-scroll ratespopup-row-scroll' >
        <div className='PayrollRates-container'>
          {props.Payrates ? props.Payrates.map(payrate =>
            <div className='item'><span className='name'>{props.title === 'Payroll Services' ? payrate.dropdown_description : payrate.name}</span><br />
              <div className='cfix' />
              <input type='text' onChange={props.handleInputChange} class='search-placeholder' data-type={props.title} name={payrate.id} value={props.title === 'Payroll Services' ? payrate.cost : payrate.addon_price} /></div>
          ) : ''}

        </div>
      </div>
    </div>
    <div className='Modal-Foter' >
      <button onClick={() => props.SavePayrate()} action='submit' className='add-service-button' style={{ backgroundColor: '#3DA647' }}>
        <div style={{ fontSize: '10px', fontWeight: '900', letterSpacing: '1px', lineHeight: '11px', paddingTop: '2px', paddingLeft: '10px' }}>SAVE </div>
      </button>
      <button onClick={() => props.togglePayrateEdit()} className='add-service-button' style={{ marginLeft: 20, backgroundColor: '#7D7D7D' }}>
        <div style={{ fontSize: '10px', fontWeight: '900', letterSpacing: '1px', lineHeight: '11px', paddingTop: '2px', paddingLeft: '10px' }}>CANCEL</div>
      </button>
    </div>
  </div>
</ReactModal>
