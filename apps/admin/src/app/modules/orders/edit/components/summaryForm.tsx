import { Button, Grid, MenuItem } from "@material-ui/core"
import { Select, TextField } from "mui-rff"
import PropTypes from "prop-types"
import React, { FC, useEffect, useState } from "react"
import { Form } from "react-final-form"
import { api, messages } from "../../../../lib"
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

interface props {
  initialValues: { id: string }
  onSubmit: Function
  onCancel: Function
}

const SummaryForm: FC<props> = (props: props) => {
  const [shippingMethods, setShippingMethods] = useState([])
  const [paymentMethods, setPaymentMethods] = useState([])
  const [orderStatuses, setOrderStatuses] = useState([])

  const { initialValues, onSubmit, onCancel } = props

  useEffect(() => {
    fetchData(initialValues.id)
  }, [])

  const fetchData = async (orderId: string) => {
    const filter = {
      order_id: orderId,
    }

    try {
      const orderList = await api.orderStatuses.list()
      setOrderStatuses(orderList.json)

      const shippingList = await api.shippingMethods.list(filter)
      setShippingMethods(shippingList.json)

      const paymentList = await api.paymentMethods.list(filter)
      setPaymentMethods(paymentList.json)
    } catch (error) {
      console.error(error)
    }
  }

  const statusItems = orderStatuses.map((item, index) => (
    <MenuItem key={index} value={item.id}>
      {item.name}
    </MenuItem>
  ))
  const shippingItems = shippingMethods.map((item, index) => (
    <MenuItem key={index} value={item.id}>
      {item.name}
    </MenuItem>
  ))
  const paymentItems = paymentMethods.map((item, index) => (
    <MenuItem key={index} value={item.id}>
      {item.name}
    </MenuItem>
  ))

  statusItems.push(
    <MenuItem key="none" value={null}>
      {messages.noOrderStatus}
    </MenuItem>
  )

  const formFields = [
    {
      field: (
        <Select fullWidth name="status_id" label={messages.orderStatus}>
          {statusItems}
        </Select>
      ),
    },
    {
      field: (
        <TextField
          fullWidth
          name="tracking_number"
          label={messages.trackingNumber}
        />
      ),
    },
    {
      field: (
        <Select
          fullWidth
          name="shipping_method_id"
          label={messages.shippingMethod}
        >
          {shippingItems}
        </Select>
      ),
    },
    {
      field: (
        <Select
          fullWidth
          name="payment_method_id"
          label={messages.paymentsMethod}
        >
          {paymentItems}
        </Select>
      ),
    },
    {
      field: (
        <TextField fullWidth name="comments" label={messages.customerComment} />
      ),
    },
    {
      field: <TextField fullWidth name="note" label={messages.note} />,
    },
    {
      field: <TextField fullWidth name="email" label={messages.email} />,
    },
    {
      field: <TextField fullWidth name="mobile" label={messages.mobile} />,
    },
  ]

  return (
    <Form
      onSubmit={order => onSubmit(order)}
      initialValues={initialValues}
      validate={validate}
      enableReinitialize
      render={({ handleSubmit, pristine, submitting }) => (
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
          </Grid>
        </form>
      )}
    />
  )
}

SummaryForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default SummaryForm
