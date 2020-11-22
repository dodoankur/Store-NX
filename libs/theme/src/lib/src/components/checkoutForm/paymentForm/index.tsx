import React, { useEffect, useState } from "react"
import api from "../../../lib/api"
import LiqPay from "./LiqPay"
import PayPalCheckout from "./PayPalCheckout"
import StripeElements from "./StripeElements"

const PaymentForm = props => {
  const [formSettings, setFormSettings] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchFormSettings = () => {
    setLoading(true)

    api.ajax.paymentFormSettings
      .retrieve()
      .then(({ status, json }) => {
        setFormSettings(json)
        setLoading(false)
      })
      .catch(e => {
        setFormSettings(null)
        setLoading(false)
        console.log(e)
      })
  }

  useEffect(() => {
    fetchFormSettings()
  }, [])

  useEffect(() => {
    fetchFormSettings()
  }, [props.gateway, props.amount])

  // shouldComponentUpdate(nextProps, nextState) {
  //   return (
  //     nextProps.gateway !== props.gateway ||
  //     nextProps.amount !== props.amount ||
  //     state !== nextState
  //   )
  // }

  const { gateway, shopSettings, onPayment, onCreateToken } = props

  if (loading) {
    return null
  } else if (formSettings && gateway && gateway !== "") {
    switch (gateway) {
      case "paypal-checkout":
        return (
          <div className="payment-form">
            <PayPalCheckout
              formSettings={formSettings}
              shopSettings={shopSettings}
              onPayment={onPayment}
            />
          </div>
        )
      case "liqpay":
        return (
          <div className="payment-form">
            <LiqPay
              formSettings={formSettings}
              shopSettings={shopSettings}
              onPayment={onPayment}
            />
          </div>
        )
      case "stripe-elements":
        return (
          <div className="payment-form">
            <StripeElements
              formSettings={formSettings}
              shopSettings={shopSettings}
              onPayment={onPayment}
              onCreateToken={onCreateToken}
            />
          </div>
        )
      default:
        return (
          <div>
            Payment Gateway <b>{gateway}</b> not found!
          </div>
        )
    }
  } else {
    return null
  }
}

export default PaymentForm
