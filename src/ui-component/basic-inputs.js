import {Button, Select} from '@mui/material';
import { useField, useFormikContext , } from 'formik';
import React from 'react';
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem';

export const CustomTextField = ({ name, fullWidth, ...other }) => {
  const [field, meta] = useField(name);
  const defaultConfiq = {
      ...field,
      ...other,
      variant: 'outlined',
      fullWidth: true || fullWidth
  };
  if (meta && meta.touched && meta.error) {
      defaultConfiq.error = true;
      defaultConfiq.helperText = meta.error;
  }
  return <TextField {...defaultConfiq} />;
};

// custom select box

export const CustomSelect = ({ name, options, vtplan, ...other }) => {
  const [field] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = (e) => {
    const selectedOption = options.find((x) => x._id === e.target.value);

    console.log('Selected', selectedOption);

    // Set the value to the entire selected option
    setFieldValue(name, selectedOption);
  };

  const value = field.value ? field.value._id : ''; // Use the unique identifier as the value

  return (
    <Select
      {...other}
      variant="outlined"
      fullWidth
      name={name}
      value={value}
      onChange={handleChange}
    >
      {options.map((option) => (
        <MenuItem key={option._id} value={option._id}>
          {JSON.stringify(option?.bundle)}
        </MenuItem>
      ))}
    </Select>
  );
};

//Custom

// Custom button
export const CustomButton = ({ children, fullWidth, disabled, ...others }) => {
  const { submitForm } = useFormikContext();
  const handleSubmit = () => {
      submitForm();
  };

  const defaultConfiq = {
      onClick: handleSubmit,
      variant: 'contained',
      color: 'primary',
      disabled: disabled,
      fullWidth: true || fullWidth
  };

  return <Button {...defaultConfiq}>{children}</Button>;
};