import { Button, Paper } from "@material-ui/core"
import { TextField } from "mui-rff"
import React from "react"
import { Form } from "react-final-form"
import { api, messages } from "../../../../lib"
import Editor from "../../../shared/editor"
import { CustomToggle } from "../../../shared/form"
import ImageUpload from "../../../shared/imageUpload"
import style from "./style.module.sass"

const validate = (values: {}) => {
  const errors = {}
  const requiredFields = ["name"]

  requiredFields.forEach(field => {
    if (values && !values[field]) {
      errors[field] = messages.errors_required
    }
  })

  return errors
}

const asyncValidate = (values: { id: string; slug: string }) => {
  return new Promise<void>(async (resolve, reject) => {
    if (values.slug && values.slug.length > 0) {
      try {
        const { status, json } = await api.sitemap.retrieve({
          path: "/" + values.slug,
        })
        if (status === 404) {
          resolve()
        } else {
          if (json && !Object.is(json.resource, values.id)) {
            reject({ slug: messages.errors_urlTaken })
          } else {
            resolve()
          }
        }
      } catch (error) {
        console.error(error)
      }
    } else {
      resolve()
    }
  })
}

interface props {
  initialValues: { id: string; image: string }
  uploadingImage
  onSubmit: Function
  onImageUpload: Function
  onImageDelete: Function
  isSaving: boolean
}

const ProductCategoryEditForm = (props: props) => {
  const {
    initialValues,
    uploadingImage,
    onSubmit,
    onImageUpload,
    onImageDelete,
    isSaving,
  } = props
  let imageUrl = null
  let categoryId = null

  if (initialValues) {
    categoryId = initialValues.id
    imageUrl = initialValues.image
  }

  if (categoryId) {
    return (
      <Paper className="paper-box" elevation={4}>
        <Form
          onSubmit={() => onSubmit}
          initialValues={initialValues}
          validate={validate}
          asyncValidate
          asyncBlurFields={["slug"]}
          enableReinitialize
        >
          {({ handleSubmit, pristine, submitting, form }) => (
            <form onSubmit={handleSubmit}>
              <div className={style.innerBox}>
                <TextField
                  name="name"
                  label={messages.productCategories_name + " *"}
                  fullWidth
                />
                <div className="field-hint" style={{ marginTop: 40 }}>
                  {messages.description}
                </div>
                <Editor name="description" entityId={categoryId} />
                <div className={style.shortBox}>
                  <CustomToggle
                    name="enabled"
                    label={messages.enabled}
                    className={style.toggle}
                  />
                  <ImageUpload
                    uploading={uploadingImage}
                    imageUrl={imageUrl}
                    onDelete={onImageDelete}
                    onUpload={onImageUpload}
                  />
                </div>
                <div className="blue-title">{messages.seo}</div>
                <TextField name="slug" label={messages.slug} fullWidth />
                <p className="field-hint">{messages.help_slug}</p>
                <TextField
                  name="meta_title"
                  label={messages.pageTitle}
                  fullWidth
                />
                <TextField
                  name="meta_description"
                  label={messages.metaDescription}
                  fullWidth
                />
              </div>
              <div
                className={
                  "buttons-box " +
                  (pristine ? "buttons-box-pristine" : "buttons-box-show")
                }
              >
                <Button
                  variant="contained"
                  color="primary"
                  className={style.button}
                  onClick={() => form.reset}
                  disabled={pristine || submitting}
                >
                  {messages.cancel}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={style.button}
                  disabled={pristine || submitting || isSaving}
                >
                  {messages.save}
                </Button>
              </div>
            </form>
          )}
        </Form>
      </Paper>
    )
  } else {
    return null
  }
}

export default ProductCategoryEditForm
