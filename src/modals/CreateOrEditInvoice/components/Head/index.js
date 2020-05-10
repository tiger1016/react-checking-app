// Libraries
import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'moment'

// Components
import CustomersSelect from 'GlobalComponents/input/CustomersSelect'
import DatePickerInput from 'GlobalComponents/input/DatePicker'
import InvoiceTermsSelect from 'GlobalComponents/input/InvoiceTermsSelect'
import TextBox from 'GlobalComponents/input/TextBox'

const Head = (props) => {
  const {
    customerId,
    comments,
    disableCustomerSelect,
    onChangeComments,
    onChangeDueDate,
    onChangeStartDate,
    onChangeEndDate,
    onChangeTerms,
    onChangeCustomerName,
    invoiceTerm,
    invoiceTerms,
    isTouched,
    dueDate,
    startDate,
    endDate,
    billingTiming
  } = props

  return (
    <div className='invoices-profile-div'>
      <div className='left'>
        <div className='input-container'>
          <span className='input-label'>Customer: </span>
          <CustomersSelect
            disabled={disableCustomerSelect}
            error={!!(isTouched && (!customerId || isNaN(customerId)))}
            clearable={false}
            onChange={onChangeCustomerName}
            value={customerId}
          />
        </div>
        <div className='input-container'>
          <span className='input-label'>Due Date: </span>
          <DatePickerInput value={dueDate} onChange={onChangeDueDate} />
        </div>
        { billingTiming === 'prepay' && <React.Fragment>
          <div className='input-container'>
            <span className='input-label'>Start Date: </span>
            <DatePickerInput value={startDate} onChange={onChangeStartDate} />
          </div>
          <div className='input-container'>
            <span className='input-label'>End Date: </span>
            <DatePickerInput value={endDate} onChange={onChangeEndDate} />
          </div>
        </React.Fragment>}

        <div className='input-container'>
          <span className='input-label'>Terms: </span>
          <InvoiceTermsSelect
            clearable={false}
            onChange={onChangeTerms}
            error={!!(isTouched && !invoiceTerms)}
            value={invoiceTerms}
          />
          {invoiceTerm}
        </div>
      </div>
      <div className='right'>
        <div className='input-container'>
          <span className='input-label'>Memo: </span>
          <div className='memo-container'>
            <TextBox rows={8} maxRows={8} value={comments} onChange={onChangeComments} />
            <span className='info'>(visible to customers)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

Head.propTypes = {
  customerId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  comments: PropTypes.string,
  disableCustomerSelect: PropTypes.bool,
  onChangeCustomerName: PropTypes.func,
  onChangeComments: PropTypes.func,
  onChangeDueDate: PropTypes.func,
  onChangeStartDate: PropTypes.func,
  onChangeEndDate: PropTypes.func,
  onChangeTerms: PropTypes.func,
  invoiceTerm: PropTypes.string,
  invoiceTerms: PropTypes.string,
  isTouched: PropTypes.bool,
  startDate: PropTypes.instanceOf(Moment),
  endDate: PropTypes.instanceOf(Moment),
  billingTiming: PropTypes.string.isRequired
}

Head.defaultProps = {
  customerId: null,
  comments: '',
  disableCustomerSelect: false,
  onChangeCustomerName: () => {},
  onChangeComments: () => {},
  onChangeDueDate: () => {},
  onChangeStartDate: () => {},
  onChangeEndDate: () => {},
  onChangeTerms: () => {},
  invoiceTerm: '',
  invoiceTerms: '',
  isTouched: false,
  startDate: null,
  endDate: null
}

export default Head
