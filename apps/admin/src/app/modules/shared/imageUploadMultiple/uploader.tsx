import { Button } from "@material-ui/core"
import Snackbar from "material-ui/Snackbar"
import React, { FC, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { messages } from "../../../lib"

interface props {
  uploading: boolean
  onUpload: Function
  children: Node
}

const MultiUploader: FC<props> = (props: props) => {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    let form = new FormData()
    acceptedFiles.map(file => {
      form.append("file", file)
    })

    console.log(acceptedFiles)

    console.log(form)

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
        accept="image/*"
        ref={dropzone}
        style={{}}
        className={style.dropzone}
        activeClassName={style.dropzoneActive}
        rejectClassName={style.dropzoneReject}
      >
        {props.children}
        {!props.children && (
          <div className={style.dropzoneEmpty}>{messages.help_dropHere}</div>
        )}
      </Dropzone> */}

      {!uploading && (
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: 20, marginTop: 10 }}
          onClick={() => {
            // dropzone.current.open()
          }}
        >
          {messages.chooseImage}
        </Button>
      )}

      <Snackbar open={uploading} message={messages.messages_uploading} />
    </>
  )
}

export default MultiUploader
