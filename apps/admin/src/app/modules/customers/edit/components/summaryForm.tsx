import { Button, Grid, MenuItem } from "@material-ui/core"
import { Select, TextField } from "mui-rff"
import React, { FC, useEffect, useState } from "react"
import { Form } from "react-final-form"
import { api, messages } from "../../../../lib"
import style from "./style.module.sass"

const validate = values => {
  const errors = {}
  const requiredFields = ["email", "full_name"]

  requiredFields.map(field => {
    if (values && !values[field]) {
      errors[field] = messages.errors_required
    }
  })

  return errors
}

interface props {
  initialValues: {
    total_spent: number
    full_name: string
    group_name: string
    email: string
    mobile: string
    note: string
  }
  onSubmit: Function
  onCancel: Function
}

const CustomerEditForm: FC<props> = (props: props) => {
  const [groups, setGroups] = useState([])

  const { initialValues, onSubmit, onCancel } = props

  useEffect(() => {
    ;(async () => {
      try {
        const { json } = await api.customerGroups.list()
        setGroups(json)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

  let groupItems = groups.map((item, index) => (
    <MenuItem key={index} value={item.id}>
      {item.name}
    </MenuItem>
  ))

  groupItems.push(
    <MenuItem key="none" value={null}>
      {messages.customers_noGroup}
    </MenuItem>
  )

  const formFields = [
    {
      field: <TextField fullWidth name="full_name" label={messages.fullName} />,
    },
    {
      field: (
        <Select fullWidth name="group_id" label={messages.group}>
          {groupItems}
        </Select>
      ),
    },
    {
      field: <TextField fullWidth name="email" label={messages.email} />,
    },
    {
      field: <TextField fullWidth name="mobile" label={messages.mobile} />,
    },
    {
      field: (
        <TextField fullWidth name="note" label={messages.note} multiline />
      ),
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

export default CustomerEditForm
