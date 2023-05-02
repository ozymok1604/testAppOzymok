import React from "react";

import TextField from "@material-ui/core/TextField";

export const Input = ({ name, onChange, label, defaultValue, value }) => {
  return (
    <TextField
      name={name}
      onChange={onChange}
      defaultValue={defaultValue}
      value={value}
      label={label}
      variant="outlined"
    />
  );
};
