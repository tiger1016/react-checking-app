// Libraries
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create(
  {
    DataDisplay_edit: {
      alignItems: 'stretch',
      flexDirection: 'column',
      justifyContent: 'flex-start'
    },
    DataDisplay_default: {
      alignItems: 'stretch',
      flexDirection: 'column',
      justifyContent: 'flex-start'
    },
    DataDisplay_row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5
    },
    DataDisplay_column_label: {
      paddingVertical: 10

    },
    DataDisplay_column_label_text: {
      width: 138,
      color: '#808080',
      fontSize: 12
    },
    DataDisplay_column_label_headingText: {
      color: '#808080',
      fontSize: 16,
      paddingVertical: 20
    },
    DataDisplay_column_value_default: {
      paddingVertical: 10,
      flex: 1
    },
    DataDisplay_column_value_edit: {
      flex: 1
    },
    DataDisplay_row__break: {
      flex: 1,
      height: 40
    },
    DataDisplay_row__message: {
      color: '#c4c4c4',
      fontFamily: 'Roboto',
      fontSize: 12,
      lineHeight: 15,
      padding: 10
    },
    DataDisplay_edit__DataDisplay_row__DataDisplay_column: {
      padding: 0
    },
    DataDisplay_row__DataDisplay_column_value_column: {
      flex: 1
    },
    DataDisplay_row__DataDisplay_column__image: {
      height: 80,
      width: 80
    },
    DataDisplay_row__DataDisplay_column__label: {
      color: '#808080',
      width: 138
    },
    DataDisplay_row__DataDisplay_column__label_heading: {
      color: '#808080',
      fontSize: 16,
      padding: 20
    },
    value: {
      color: '#B3B3B3',
      fontSize: 12
    }
  }
)

export default styles
