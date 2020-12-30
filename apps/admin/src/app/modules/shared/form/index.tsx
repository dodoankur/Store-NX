import Checkbox from "material-ui/Checkbox"
import { List, ListItem } from "material-ui/List"
import TextField from "material-ui/TextField"
import Toggle from "material-ui/Toggle"
import React, { useEffect, useState } from "react"

interface props {
  name?: string
  input?: any
  label: string
  fullWidth?: boolean
  className?: string
  disabled?: boolean
  style?: any
}

export const CustomToggle = (props: props) => {
  const { name, input, label, className = "", disabled = false, style } = props
  return (
    <Toggle
      label={label}
      toggled={input.value ? true : false}
      onToggle={(event, isInputChecked) => {
        input.onChange(isInputChecked)
      }}
      className={className}
      disabled={disabled}
      style={style}
    />
  )
}

export const NumberField = ({
  input,
  label,
  className = "",
  disabled = false,
  style,
}) => (
  <TextField
    floatingLabelText={label}
    fullWidth
    disabled={disabled}
    value={input.value}
    type="number"
    onChange={(event, value) => {
      let number = parseFloat(value)
      number = number ? number : 0
      input.onChange(number)
    }}
  />
)

export const ColorField = ({ input }) => <input {...input} type="color" />

export const MultiSelect = props => {
  const values = Array.isArray(props.input.value) ? props.input.value : []
  const [selectedItems, setSelectedItems] = useState(values)

  useEffect(() => {
    const values = Array.isArray(props.input.value) ? props.input.value : []
    if (values !== selectedItems) {
      setSelectedItems(values)
    }
  }, [props.input.value])

  const onCheckboxChecked = item => {
    let newSelectedItems = []
    if (selectedItems.includes(item)) {
      newSelectedItems = selectedItems.filter(i => i !== item)
    } else {
      newSelectedItems = [...selectedItems, item]
    }
    newSelectedItems.sort()
    setSelectedItems(newSelectedItems)
    props.input.onChange(newSelectedItems)
  }

  const isCheckboxChecked = item => {
    return selectedItems.includes(item)
  }

  const { items, disabled, columns = 2 } = props
  const columnsClass = 12 / columns

  const elements = items.map((item, index) => (
    <div className={`col-xs-12 col-sm-${columnsClass}`} key={index}>
      {item && item !== "" && (
        <ListItem
          leftCheckbox={
            <Checkbox
              checked={isCheckboxChecked(item)}
              disabled={disabled}
              onCheck={(e, isChecked) => {
                onCheckboxChecked(item)
              }}
            />
          }
          primaryText={item}
        />
      )}
    </div>
  ))

  return (
    <List>
      <div className="row">{elements}</div>
    </List>
  )
}
