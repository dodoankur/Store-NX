import React, { useEffect, useState } from "react"
import { text } from "../../lib/settings"

const Quantity = props => {
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (quantity > props.maxQuantity) {
      setQuantities(props.maxQuantity)
    }
  }, [quantity > props.maxQuantity])

  const handleChange = event => {
    setQuantities(event.target.value)
  }

  const setQuantities = quantity => {
    const intQuantity = parseInt(quantity)
    if (intQuantity > 0 && intQuantity <= props.maxQuantity) {
      setQuantity(intQuantity)
      props.onChange(intQuantity)
    }
  }

  const increment = () => {
    const newQuantity = quantity + 1
    setQuantities(newQuantity)
  }

  const decrement = () => {
    const newQuantity = quantity - 1
    setQuantities(newQuantity)
  }

  const { maxQuantity } = props
  const disabled = maxQuantity === 0
  const value = disabled ? 0 : quantity

  return (
    <>
      <p>{text.qty}</p>
      <div className="product-quantity">
        <a className="decrement" onClick={decrement} />
        <input
          value={value}
          onChange={handleChange}
          maxLength={3}
          type="number"
          pattern="\d*"
          disabled={disabled}
        />
        <a className="increment" onClick={increment} />
      </div>
    </>
  )
}

export default Quantity
