import { Button, Paper } from "@material-ui/core"
import { TextField } from "mui-rff"
import React from "react"
import { Form } from "react-final-form"
import { messages } from "../../../../lib"
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

interface props {
  initialValues: { id: string }
  onSubmit: Function
  onCancel: Function
  isSaving: boolean
}

const CustomerForm = (props: props) => {
  const { initialValues, onSubmit, onCancel, isSaving } = props

  let groupId = null

  if (initialValues) {
    groupId = initialValues.id
  }

  return (
    <Paper className="paper-box" elevation={4}>
      <Form onSubmit={() => onSubmit} validat={validate} enableReinitialize>
        {({ handleSubmit, pristine, submitting }) => (
          <form onSubmit={handleSubmit}>
            <div className={style.innerBox}>
              <TextField
                name="name"
                label={messages.customerGroups_name + " *"}
                fullWidth
              />
              <br />
              <TextField
                name="description"
                label={messages.description}
                fullWidth
                multiline
                rows={2}
              />
            </div>
            <div className="buttons-box">
              <Button
                variant="contained"
                color="primary"
                className={style.button}
                onClick={() => onCancel}
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
                {groupId ? messages.save : messages.add}
              </Button>
            </div>
          </form>
        )}
      </Form>
    </Paper>
  )
}

export default CustomerForm
