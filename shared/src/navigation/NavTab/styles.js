// Libraries
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  NavTab: {
    display: 'flex',
    flexDirection: 'row',
    fontWeight: '500',
    fontFamily: 'Roboto',
    position: 'relative'
  },
  NavTab_padding_bottom: {
    marginBottom: 24
  },
  NavTab__bottom_line: {
    backgroundColor: '#F5F5F5',
    height: 2,
    position: 'absolute',
    bottom: '0',
    right: '0',
    left: '0',
    width: '100%'
  },
  NavTab__nav_tab_link: {
    borderBottom: '2px solid #F5F5F5',
    color: '#999999',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    padding: '10px 11px 10px',
    position: 'relative',
    overflow: 'hidden',
    textDecoration: 'none',
    textOverflow: 'ellipsis'
  },
  NavTab__nav_tab_link_doNotOverflowLinkUnderline: {
    padding: '10px 0 10px',
    margin: '0 11px'
  },
  NavTab__nav_tab_link_span: {
    fontSize: '12.8px',
    whiteSpace: 'nowrap'
  },
  NavTab__nav_tab_link_selected: {
    borderBottom: '2px solid #1875F0',
    color: '#1875F0',
    zIndex: '1'
  }
})

export default styles
