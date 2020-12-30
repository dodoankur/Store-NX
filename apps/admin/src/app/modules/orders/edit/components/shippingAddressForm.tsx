import { Button } from "@material-ui/core"
import { TextField } from "mui-rff"
import PropTypes from "prop-types"
import React, { FC } from "react"
import { Form } from "react-final-form"
import { Field } from "redux-form"
import { helper, messages } from "../../../../lib"
import style from "./style.module.sass"

const validate = (values: {}) => {
  const errors = {}
  const requiredFields = []

  requiredFields.map(field => {
    if (values && !values[field]) {
      errors[field] = messages.errors_required
    }
  })

  return errors
}

const getShippingFieldLabel = ({
  label,
  key,
}: {
  label: string
  key: string
}) => {
  return label && label.length > 0 ? label : helper.getOrderFieldLabelByKey(key)
}

interface props {
  initialValues: {}
  onSubmit: Function
  onCancel: Function
  shippingMethod: { fields: { key: string; label: string }[] }
}

const ShippingAddressForm: FC<props> = (props: props) => {
  const { onSubmit, onCancel, shippingMethod } = props

  let shippingFields = null
  if (
    shippingMethod &&
    shippingMethod.fields &&
    shippingMethod.fields.length > 0
  ) {
    shippingFields = shippingMethod.fields.map((field, index) => {
      const fieldLabel = getShippingFieldLabel(field)

      return (
        <Field
          key={index}
          component={TextField}
          fullWidth
          name={field.key}
          floatingLabelText={fieldLabel}
        />
      )
    })
  }

  return (
    <Form
      onSubmit={values => onSubmit(values)}
      validate={validate}
      enableReinitialize
      render={({ handleSubmit, pristine, submitting }) => (
        <form onSubmit={handleSubmit}>
          <>
            {shippingFields}
            <TextField fullWidth name="city" label={messages.city} />
            <div className="row">
              <div className="col-xs-6">
                <TextField fullWidth name="state" label={messages.state} />
              </div>
              <div className="col-xs-6">
                <TextField
                  fullWidth
                  name="postal_code"
                  label={messages.postal_code}
                />
              </div>
            </div>
            <TextField fullWidth name="country" label={messages.country} />
          </>
          <div className={style.shippingButtons}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onCancel()}
            >
              {messages.cancel}
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ marginLeft: 12 }}
              disabled={pristine || submitting}
            >
              {messages.save}
            </Button>
          </div>
        </form>
      )}
    />
  )
}

ShippingAddressForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default ShippingAddressForm
