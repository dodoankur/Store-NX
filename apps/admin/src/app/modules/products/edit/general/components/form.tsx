import { Button, Paper } from "@material-ui/core"
import { TextField } from "mui-rff"
import PropTypes from "prop-types"
import React, { FC } from "react"
import { Field, Form } from "react-final-form"
import { api, messages } from "../../../../../lib"
import Editor from "../../../../shared/editor"
import style from "./style.module.sass"

const validate = (values: {}) => {
  const errors = {}
  const requiredFields = ["name"]

  requiredFields.map(field => {
    if (values && !values[field]) {
      errors[field] = messages.errors_required
    }
  })

  return errors
}

const slugExists = async values => {
  if (values.slug && values.slug.length > 0) {
    try {
      const response = await api.products.slugExists(values.id, values.slug)
      return response.status === 200
    } catch (error) {
      console.error(error)
    }
  } else {
    return Promise.resolve(false)
  }
}

const asyncValidate = values => {
  return Promise.all([slugExists(values)]).then(([isSlugExists]) => {
    let errors: { slug?: string } = {}

    if (isSlugExists) {
      errors.slug = messages.errors_urlTaken
    }

    if (Object.keys(errors).length > 0) {
      return Promise.reject(errors)
    } else {
      return Promise.resolve()
    }
  })
}

interface props {
  initialValues: Partial<any>
  onSubmit: Function
}

const ProductGeneralForm: FC<props> = (props: props) => {
  const { initialValues, onSubmit } = props
  if (initialValues) {
    return (
      <Form
        initialValues={initialValues}
        onSubmit={values => onSubmit(values)}
        validate={validate}
        asyncValidate={asyncValidate}
        asyncBlurFields={["slug"]}
        enableReinitialize
        render={({ handleSubmit, pristine, submitting, form }) => (
          <form onSubmit={handleSubmit}>
            <Paper className="paper-box" elevation={4}>
              <div className={style.innerBox}>
                <TextField
                  name="name"
                  label={messages.products_name + " *"}
                  fullWidth
                />
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
                <div className="field-hint" style={{ marginTop: 40 }}>
                  {messages.description}
                </div>
                <Field component={Editor} name="description" />
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
                  onClick={() => form.reset()}
                  disabled={pristine || submitting}
                >
                  {messages.cancel}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={style.button}
                  disabled={pristine || submitting}
                >
                  {messages.save}
                </Button>
              </div>
            </Paper>
          </form>
        )}
      />
    )
  } else {
    return null
  }
}

ProductGeneralForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default ProductGeneralForm
