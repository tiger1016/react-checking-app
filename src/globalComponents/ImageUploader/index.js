// Libraries
import React from 'react'
import Dropzone from 'react-dropzone'

// Utils
import { utility } from 'Utils/utility'

// Components
import ButtonGroup from '../ButtonGroup'

// Styles
import './index.css'

// Assets
import placeholder from 'Assets/camplaceholder.jpg'

export default class ImageUploader extends React.Component {
  state = {
    files: [],
    filesSrcs: []
  }

  dropzoneRef = React.createRef()

  onDropAccepted = uploadedFiles => {
    const {
      multiple,
      onChange
    } = this.props

    const {
      files,
      filesSrcs
    } = this.state

    let clonedFiles = []
    let clonedFilesSrcs = []

    if (multiple !== false) {
      clonedFiles = [ ...files ]
      clonedFilesSrcs = [ ...filesSrcs ]
    }

    uploadedFiles.forEach(file => {
      const reader = new window.FileReader()

      reader.onload = e => {
        clonedFiles.push(file)
        clonedFilesSrcs.push(reader.result)
        this.setState({ files: clonedFiles, filesSrcs: clonedFilesSrcs },
          () => {
            const { files, filesSrcs } = this.state
            if (utility.isAFunction(onChange)) onChange(files, filesSrcs)
          })
      }

      reader.readAsDataURL(file)
    })
  }

  removeFile = index => {
    const { onChange } = this.props

    const files = this.state.files.filter((f, i) => i !== index)
    const filesSrcs = this.state.filesSrcs.filter((f, i) => i !== index)

    this.setState({ files, filesSrcs }, () => {
      const { files, filesSrcs } = this.state
      if (utility.isAFunction(onChange)) onChange(files, filesSrcs)
    })
  }

  openDropZone = () => {
    if (this.dropzoneRef.current) {
      this.dropzoneRef.current.open()
    }
  }

  render () {
    const {
      multiple,
      uploadBtn,
      sizeInfo,
      image
    } = this.props

    let {
      filesSrcs,
      hovering
    } = this.state

    const somethingLoaded = filesSrcs.length

    if (!somethingLoaded) {
      filesSrcs = [ (image || placeholder) ]
    }

    return <div className='ImageUploader t-image-uploader'>
      <Dropzone
        accept='image/*'
        ref={this.dropzoneRef}
        multiple={!!multiple}
        onDropAccepted={this.onDropAccepted}
        style={{
          borderColor: '#dcdcdc',
          borderRadius: '2px',
          borderStyle: 'solid',
          borderWidth: '2px',
          height: 'auto',
          width: 'auto'
        }}>
        {({
          getRootProps,
          getInputProps
        }) => <div className='DropZone' {...getRootProps()}
          onMouseEnter={() => this.setState({ hovering: true })}
          onMouseLeave={() => this.setState({ hovering: false })}>
          <input {...getInputProps()} />
          {filesSrcs.map((src, i) => <div className='image-container' key={i}>
            <img src={src} />
            {somethingLoaded && hovering ? <div className='delete'>
              <ButtonGroup buttons={[{
                iconOnly: 'ion-android-delete',
                size: 'lg',
                onClick: e => {
                  e.stopPropagation()
                  this.removeFile(i)
                },
                textOnly: true
              }]} />
            </div> : null}
          </div>)}
          {uploadBtn && <a onClick={this.openDropZone} className='upload-btn'>Upload New</a>}
          {sizeInfo && <span className='file-size-info'>{sizeInfo}</span>}
        </div>}
      </Dropzone>
    </div>
  }
}
