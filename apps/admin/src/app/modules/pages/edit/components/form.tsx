import { Button, Paper } from "@material-ui/core"
import { TextField } from "mui-rff"
import React, { FC, useEffect } from "react"
import { Form } from "react-final-form"
import TagsInput from "react-tagsinput"
import { api, messages } from "../../../../lib"
import Editor from "../../../shared/editor"
import { CustomToggle } from "../../../shared/form"
import style from "./style.module.sass"

interface TagsFieldProps {
  input?
  placeholder?
  name?
}

const TagsField: FC<TagsFieldProps> = (props: TagsFieldProps) => {
  const { input, placeholder, name } = props
  const tagsArray = input.value && Array.isArray(input.value) ? input.value : []
  return (
    <TagsInput
      value={tagsArray}
      inputProps={{ placeholder: placeholder }}
      onChange={tags => {
        input.onChange(tags)
      }}
    />
  )
}

const validate = (values: { is_system: boolean }) => {
  const errors = {}
  const requiredFields = ["slug", "meta_title"]

  requiredFields.map(field => {
    if (!values.is_system && values && !values[field]) {
      errors[field] = messages.errors_required
    }
  })

  return errors
}

const asyncValidate = (values /*, dispatch */) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!values.slug && values.is_system) {
        resolve(200)
      } else {
        const { status, json } = await api.sitemap.retrieve({
          path: values.slug,
        })
        if (status === 404) {
          resolve(404)
        } else {
          if (json && !Object.is(json.resource, values.id)) {
            reject({ slug: messages.errors_urlTaken })
          } else {
            resolve(404)
          }
        }
      }
    } catch (error) {
      console.error(error)
    }
  })
}

interface props {
  initialValues: { is_system: boolean }
  onSubmit: Function
  pageId: string
  onLoad: Function
  eraseData: Function
}

const EditPageForm: FC<props> = (props: props) => {
  const { onSubmit, initialValues, pageId, onLoad, eraseData } = props

  useEffect(() => {
    onLoad()
    return () => eraseData()
  }, [])

  const isAdd = pageId === null || pageId === undefined

  if (initialValues) {
    return (
      <Form
        onSubmit={() => onSubmit}
        validate={validate}
        asyncValidate
        asyncBlurFields={["slug"]}
        enableReinitialize
      >
        {({ handleSubmit, pristine, submitting }) => (
          <form onSubmit={handleSubmit}>
            <Paper className="paper-box" elevation={4}>
              <div className={style.innerBox}>
                <TextField
                  name="meta_title"
                  label={messages.pageTitle}
                  fullWidth
                />
                <br />
                <TextField
                  name="slug"
                  label={messages.slug}
                  fullWidth
                  disabled={initialValues.is_system}
                />
                <p className="field-hint">{messages.help_slug}</p>
                <TextField
                  name="meta_description"
                  label={messages.metaDescription}
                  fullWidth
                />
                <div className="field-hint" style={{ marginTop: 40 }}>
                  {messages.content}
                </div>
                <div style={{ marginBottom: 50 }}>
                  <Editor name="content" />
                </div>
                {messages.tags}
                <TagsField name="tags" placeholder={messages.newTag} />
                <div style={{ maxWidth: 256 }}>
                  <CustomToggle
                    name="enabled"
                    label={messages.enabled}
                    style={{ paddingTop: 16, paddingBottom: 16 }}
                    disabled={initialValues.is_system}
                  />
                </div>
              </div>
              <div
                className={
                  "buttons-box " +
                  (pristine && !isAdd
                    ? "buttons-box-pristine"
                    : "buttons-box-show")
                }
              >
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={style.button}
                  disabled={pristine || submitting}
                >
                  {isAdd ? messages.add : messages.save}
                </Button>
              </div>
            </Paper>
          </form>
        )}
      </Form>
    )
  } else {
    return null
  }
}

export default EditPageForm
