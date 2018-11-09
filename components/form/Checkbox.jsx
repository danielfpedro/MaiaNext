import React from 'react'
import Switch from '@material-ui/core/Switch';

export default ({
  input: { checked, name, onChange, ...restInput },
  meta,
  ...rest
}) => (
  <Switch
    {...rest}
    name={name}
    inputProps={restInput}
    onChange={onChange}
    checked={!!checked}
  />
)
