import Snackbar from "material-ui/Snackbar"
import React, { FC, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { messages } from "../../../../../lib"

interface props {
  uploading: boolean
  onUpload: Function
}

const MultiUploader: FC<props> = (props: props) => {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    let form = new FormData()
    acceptedFiles.map(file => {
      form.append("file", file)
    })
    props.onUpload(form)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const { uploading } = props
  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      {/* <Dropzone
        onDrop={onDrop}
        multiple
        disableClick
        ref={dropzone}
        style={{}}
        className={style.dropzone + (uploading ? " " + style.uploading : "")}
        activeClassName={style.dropzoneActive}
        rejectClassName={style.dropzoneReject}
      >
        <div className={style.dropzoneEmpty}>
          {messages.help_dropHere}
          <Button
            className={style.button}
            onClick={() => {
              dropzone.current.open()
            }}
          >
            {messages.chooseImage}
          </Button>
        </div>
      </Dropzone> */}

      <Snackbar open={uploading} message={messages.messages_uploading} />
    </>
  )
}

export default MultiUploader
