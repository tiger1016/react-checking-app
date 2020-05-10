import { Dimensions, StyleSheet } from 'react-native'
const window = Dimensions.get('window')
const { width, height, scale } = window

export const Color = {
  disableColor: '#eaeaea',
  main: '#40cca2'
}

export const IMG = {
  closeIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABnElEQVRYR8WXy1HDMBCG/734Sjoh6QAqgBKgg/gij29wtC4uAegAKoASXEJKCFfPeMTIYxn5IVmvTHJM4v0+rbS7MuHKH7oyH6NAXde7tm3fpBARvTLGmpRynPM9gD4+gGcVfxTgnH8CeBj+cAZwn0pigH8D2A3xG8bYoV+sWuVMQH6dRGIFLmN/McYe5wJ7IcQPEd1oqY+SWIMLIX6J6G6xBRIqH0gl4QKfZEDbimgJV/iqQGwmfOBGgVAJX7hVwFciBL4p4CoRCncS2JIYDq/eZDAvNVtHdZ4FlhKV8VWH84I7Z2CjRMcF+qxcPeScgS2JELh3BtR5ADDZ85gB5pUBw2DRz5j37HAWMJVan8aIAeYkYKtzKRAzwDYFXJpMzBS1CrjAY6eoUcAHHiOxKhACD5VYCMTAQyQmAingvhL6rVje24On2trEM1VH13WHsixPk1ZcVVVDRLcqUGhvn4sYJJbXcl0gFdy0HUKIj6IoniYZGEzfiUj282OqtyJdAsCLEOKcZdkxz3PJ+X8zst1aLvnbZiu+JFzG/gPiB7Awgm9hrgAAAABJRU5ErkJggg==',
  addIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAEJQTFRFbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxs////HqkE2AAAABR0Uk5TAAExTUtz8/j3EJ39nBqysSjDJyPxQBI5AAAAAWJLR0QV5dj5owAAAD5JREFUCNdjYCASMDIxswABMxMjiMfKxs7Bwc7GCpbi5OIWEeHm4YQo5OUTEeHnhWkTEBQUQhgiLEysdSAAAHL1AYAHhhy9AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTA5LTA3VDE3OjMzOjE0KzAyOjAw4MXKTQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0wOS0wN1QxNzozMzoxNCswMjowMJGYcvEAAAAASUVORK5CYII='
}

export default StyleSheet.create({
  selectedView: {
    flex: 1
  },
  selectedItem: {
    margin: 4,
    borderWidth: 2 / scale,
    borderRadius: 6,
    borderColor: '#aaa',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#f6f6f6'
  },
  select: {
    flex: 1,
    flexDirection: 'row'
  },
  selectLabel: {
    flex: 1,
    flexDirection: 'row'
  },
  disableColor: {
    backgroundColor: Color.disableColor
  },
  labelText: {
    padding: 6,
    fontSize: 14,
    lineHeight: 14,
    maxWidth: 300
  },
  closeContainer: {
    padding: 8,
    borderLeftWidth: 2 / scale,
    borderLeftColor: '#c8c8c8'
  },
  closeIcon: {
    width: 10,
    height: 10
  },
  addIcon: {
    width: 12,
    height: 12,
    padding: 8,
    margin: 10
  },
  modalMask: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#00000077'
  },
  modalContainer: {},
  modal: {
    height: height * 0.6,
    width: width,
    overflow: 'hidden',
    borderRadius: 0,
    backgroundColor: '#fff'
  },
  title: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 2 / scale,
    borderBottomColor: '#bbb'
  },
  titleText: {
    fontSize: 18,
    lineHeight: 20
  },
  scrollView: {
    height: height * 0.6 - 80
  },
  buttonView: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  modalButton: {
    height: 40,
    width: width * 0.3,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.main
  },
  modalItem: {
    height: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2 / scale,
    borderBottomColor: '#bbb'
  },
  modalText: {
    fontSize: 16,
    width: width * 0.6 - 70
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  },
  confirmButton: {
    borderLeftWidth: 2 / scale,
    borderLeftColor: '#fff'
  },
  outerCircle: {
    borderWidth: 2 / scale,
    borderColor: '#888',
    width: 20,
    height: 20,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  enableCircle: {
    borderColor: Color.main
  },
  innerCircle: {
    backgroundColor: Color.main,
    width: 16,
    height: 16,
    borderRadius: 8,
    overflow: 'hidden'
  },
  disableText: {
    color: '#999'
  },
  noOptions: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  noOptionsText: {
    color: '#808080',
    fontSize: 14
  },
  selectedLabel: {
    flexDirection: 'row',
    paddingLeft: 15,
    alignItems: 'center'
  },
  selectedLabelText: {
    color: '#808080',
    fontSize: 14
  }
})
