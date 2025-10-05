import React from 'react';
import { TextField } from '@mui/material';

export interface TextInputProps {
  label: string;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  defaultValue = '',
  value,
  onChange,
  name,
  required = false,
  multiline = false,
  rows = 1,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <TextField
      fullWidth
      label={label}
      placeholder={placeholder}
      value={value || defaultValue}
      onChange={handleChange}
      name={name}
      required={required}
      multiline={multiline}
      rows={multiline ? rows : undefined}
      margin="normal"
      variant="outlined"
    />
  );
};

export default TextInput;
