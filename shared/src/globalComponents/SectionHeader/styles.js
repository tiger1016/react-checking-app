// Libraries
import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
  SectionHeader: {
    width: Dimensions.get('window').width
  },
  SectionHeader__inner_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20
  },

  SectionHeader_leftAction__inner_container: {
    justifyContent: 'flex-start'
  },
  SectionHeader__inner_container__left: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  SectionHeader__inner_container__left_text: {
    color: '#4d4d4d',
    fontSize: 30,
    fontWeight: '300',
    justifyContent: 'center',
    alignItems: 'center'
  },
  SectionHeader_leftAction__inner_container__left: {
    marginRight: 'auto'
  },
  SectionHeader__inner_container_align_left__left: {
    marginRight: '35px'
  },
  SectionHeader__inner_container_align_right__right: {
    marginLeft: '35px'
  },
  SectionHeader__inner_container_align_center__left: {
    marginRight: '17.5px'
  },
  SectionHeader__inner_container_align_center__right: {
    marginLeft: '17.5px'
  }
})

export default styles
