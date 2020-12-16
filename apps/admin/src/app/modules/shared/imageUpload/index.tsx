import { Paper } from "@material-ui/core"
import { CloudUpload, Delete, PhotoCamera } from "@material-ui/icons"
import IconButton from "material-ui/IconButton"
import Snackbar from "material-ui/Snackbar"
import React, { FC, useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { messages } from "../../../lib"
import style from "./style.module.sass"

interface props {
  imageUrl: string
  onDelete: Function
  onUpload: Function
  uploading: boolean
}

const ImageUpload: FC<props> = (props: props) => {
  const [imagePreview, setImagePreview] = useState(props.imageUrl)
  const { uploading } = props

  const onDelete = () => {
    setImagePreview(null)
    props.onDelete()
  }

  useEffect(() => {
    setImagePreview(props.imageUrl)
  }, [props.imageUrl])

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    let form = new FormData()
    form.append("file", acceptedFiles[0])
    props.onUpload(form)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const hasPreview = imagePreview !== null && imagePreview !== ""
  const previewIsFileUrl = hasPreview ? imagePreview.startsWith("http") : null

  let htmlPreview = (
    <div className={style.noImage}>
      <PhotoCamera style={{ fontSize: 90, color: "#cccccc" }} />
      <div className={style.dropText}>{messages.help_dropHere}</div>
    </div>
  )

  if (hasPreview && previewIsFileUrl) {
    htmlPreview = <img src={imagePreview} />
  } else if (hasPreview && !previewIsFileUrl) {
    htmlPreview = <img src={imagePreview} />
  }

  return (
    <Paper elevation={4} square style={{ width: 200 }}>
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
        multiple={false}
        disableClick={hasPreview}
        accept="image/*"
        ref={dropzone}
        style={{}}
        className={style.dropzone}
        activeClassName={style.dropzoneActive}
        rejectClassName={style.dropzoneReject}
      >
        <div className={style.preview}>{htmlPreview}</div>
      </Dropzone> */}

      <div className={style.footer}>
        <IconButton
          touch
          tooltip={messages.actions_upload}
          onClick={() => {
            // dropzone.current.open()
          }}
          tooltipPosition="top-right"
        >
          <CloudUpload htmlColor="rgba(0,0,0,0.5)" />
        </IconButton>
        {hasPreview && (
          <IconButton
            touch
            tooltip={messages.actions_delete}
            onClick={onDelete}
            tooltipPosition="top-right"
          >
            <Delete htmlColor="rgba(0,0,0,0.5)" />
          </IconButton>
        )}
      </div>
      <Snackbar open={uploading} message={messages.messages_uploading} />
    </Paper>
  )
}

export default ImageUpload
