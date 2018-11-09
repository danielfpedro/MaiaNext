import React from "react";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";

const SelectInput = ({
  input: { name, value, onChange, ...restInput },
  meta,
  label,
  showError,
  formControlProps,
  options,
  ...rest
}) => {
  return (
    <FormControl
      {...formControlProps}
      error={showError}
      style={{
        minWidth: "100%"
      }}
    >
    <InputLabel shrink htmlFor="age-label-placeholder">
        {label}
    </InputLabel>
      <Select
        {...rest}
        displayEmpty
        name={name}
        onChange={onChange}
        inputProps={restInput}
        value={value}>

        <MenuItem value="">--</MenuItem>
        {options.map(value => 
            <MenuItem key={value} value={value}>{value}</MenuItem>
        )}

      </Select>
    </FormControl>
  );
};

export default SelectInput;