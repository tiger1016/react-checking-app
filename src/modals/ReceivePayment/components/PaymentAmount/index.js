// Libraries
import React from 'react'
import moment from 'moment'

// Components
import CenteredTextNotify from 'GlobalComponents/CenteredTextNotify'
import Checkbox from 'GlobalComponents/input/Checkbox'
import CurrencyInput from 'GlobalComponents/input/CurrencyInput'
import CustomersSelect from 'GlobalComponents/input/CustomersSelect'
import CustomTable from 'GlobalComponents/CustomTable'
import ModalTemplateField from 'GlobalComponents/ModalTemplate/components/ModalTemplateField'

class PaymentAmount extends React.Component {
  columns = ({ isChecked, toggleCheckbox }) => [
    {
      accessor: ({ id }) => <Checkbox
        checked={isChecked(id)}
        onChange={e => toggleCheckbox(e, id)}
      />,
      id: 'checkbox',
      label: '',
      maxWidth: 60
    },
    {
      accessor: 'invoice_id',
      className: 'text',
      label: 'Invoice'
    },
    {
      accessor: d => moment(d.ts).format('MM/DD/YYYY'),
      id: 'due_date',
      className: 'text',
      label: 'Due Date'
    },
    {
      accessor: 'status',
      className: 'text',
      label: 'Status'
    },
    {
      accessor: d => '$' + parseFloat(d.owed).toFixed(2),
      id: 'payment_amount',
      className: 'text',
      label: 'Amount Due'
    },
    {
      accessor: ({ id, outstanding }) => <div className={`outstanding${isChecked(id) ? ' selected' : ''}`}>
        {'$' + parseFloat(outstanding).toFixed(2)}
      </div>,
      id: 'paid',
      className: 'text',
      label: 'Outstanding'
    }
  ]

  render () {
    const {
      amount,
      changeAmount,
      customer,
      customerSelectDisabled,
      customerSelectError,
      customerSelectOnChange,
      customerSelectValue,
      invoices,
      isChecked,
      loading,
      toggleCheckbox
    } = this.props

    return <div className='tab-container'>
      <div className='div-container'>
        <ModalTemplateField
          label='Customer:'
          input={<CustomersSelect
            disabled={customerSelectDisabled}
            error={customerSelectError}
            onChange={customerSelectOnChange}
            value={customerSelectValue}
          />}
        />
        <ModalTemplateField
          label='Enter Amount:'
          input={<CurrencyInput
            onChange={changeAmount}
            value={amount}
            clearOnFocus
          />}
        />

      </div>
      {customer && <div className={invoices.length > 3 ? 'tab-container paddedHeader' : 'tab-container'}>
        <span className='span-label'>Select Invoice to apply amount to:</span>
        {(loading || (invoices && invoices.length > 0)) && <CustomTable
          columns={[{ columns: this.columns({ isChecked, toggleCheckbox }) }]}
          data={invoices}
          loading={loading}
          minRows={0}
          showPagination={false}
          pageSize={invoices.length}
          style={{
            height: '200px' // This will force the table body to overflow and scroll, since there is not enough room
          }}
        />}
        {!loading && invoices.length === 0 && <div className='empty'>
          <CenteredTextNotify icon='ion-ios-checkmark' text={`There are no invoices to display.`} />
        </div>}
      </div>}
    </div>
  }
}

export default PaymentAmount
