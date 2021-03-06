import { TextField, IIconProps } from '@fluentui/react'
import React, { useState, useEffect } from 'react'

import { parse, stringify } from '@/utils/mongo-shell-data'

export function FilterInput<T extends string | object | undefined>(props: {
  autoFocus?: boolean
  disabled?: boolean
  prefix?: string
  iconProps?: IIconProps
  value?: T
  onChange(value: T): void
}) {
  const [errorMessage, setErrorMessage] = useState<string>()
  const [value, setValue] = useState('')
  useEffect(() => {
    setValue(stringify(props.value))
  }, [props.value])

  return (
    <TextField
      autoFocus={props.autoFocus}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      autoSave="off"
      spellCheck={false}
      styles={{
        root: { flex: 1 },
        prefix: { userSelect: 'none', cursor: 'default' },
      }}
      disabled={props.disabled}
      prefix={props.prefix}
      iconProps={props.iconProps}
      errorMessage={errorMessage}
      value={value}
      onChange={(_ev, newValue) => {
        setValue(newValue || '')
        if (!newValue) {
          props.onChange(undefined as T)
          setErrorMessage(undefined)
          return
        }
        try {
          props.onChange(parse(newValue) as T)
          setErrorMessage(undefined)
        } catch (err) {
          setErrorMessage(' ')
        }
      }}
    />
  )
}
