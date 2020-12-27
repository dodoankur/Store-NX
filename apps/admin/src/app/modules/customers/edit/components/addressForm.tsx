import { Button, Grid } from "@material-ui/core"
import { TextField } from "mui-rff"
import React, { FC } from "react"
import { Form } from "react-final-form"
import { messages } from "../../../../lib"
import style from "./style.module.sass"

const validate = (values: {}) => {
  const errors = {}
  const requiredFields = ["city"]

  requiredFields.map(field => {
    if (values && !values[field]) {
      errors[field] = messages.errors_required
    }
  })

  return errors
}

interface props {
  initialValues: {}
  onSubmit: Function
  onCancel: Function
}

const CustomerAddressForm: FC<props> = (props: props) => {
  const { initialValues, onSubmit, onCancel } = props

  const formFields = [
    {
      field: <TextField fullWidth name="full_name" label={messages.fullName} />,
    },
    {
      field: <TextField fullWidth name="company" label={messages.company} />,
    },
    {
      field: <TextField fullWidth name="address1" label={messages.address1} />,
    },
    {
      field: <TextField fullWidth name="address2" label={messages.address2} />,
    },
    {
      field: <TextField fullWidth name="city" label={messages.city} />,
    },
    {
      field: <TextField fullWidth name="state" label={messages.state} />,
    },
    {
      field: (
        <TextField fullWidth name="postal_code" label={messages.postal_code} />
      ),
    },
    {
      field: <TextField fullWidth name="country" label={messages.country} />,
    },
    {
      field: <TextField fullWidth name="phone" label={messages.phone} />,
    },
  ]

  return (
    <Form
      onSubmit={() => onSubmit}
      initialValues={initialValues}
      validate={validate}
      enableReinitialize
    >
      {({ handleSubmit, pristine, submitting }) => (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "initial",
            width: "100%",
          }}
        >
          <Grid container alignItems="flex-start" spacing={2}>
            {formFields.map((item, index) => (
              <Grid item xs={6} key={index}>
                {item.field}
              </Grid>
            ))}

            <div className={style.shippingButtons}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => onCancel}
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
          </Grid>
        </form>
      )}
    </Form>
  )
}

export default CustomerAddressForm
