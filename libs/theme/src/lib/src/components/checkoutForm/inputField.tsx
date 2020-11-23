import React, { FC } from "react"
import { InjectedFormProps } from "redux-form"

interface props {
  id
  label
  meta
  className
  input
  placeholder
  disabled
  type
}

const InputField: FC<props> = (field: props & InjectedFormProps) => (
  <div className={field.className}>
    <label htmlFor={field.id}>
      {field.label}
      {field.meta.touched && field.meta.error && (
        <span className="error">{field.meta.error}</span>
      )}
    </label>
    <input
      {...field.input}
      placeholder={field.placeholder}
      disabled={field.disabled}
      type={field.type}
      id={field.id}
      className={field.meta.touched && field.meta.error ? "invalid" : ""}
    />
  </div>
)

export default InputField
