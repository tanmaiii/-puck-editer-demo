import React from 'react';
import { 
  FormControl, 
  FormLabel, 
  RadioGroup, 
  FormControlLabel, 
  Radio 
} from '@mui/material';

export interface RadioBlockProps {
  label: string;
  options: string[];
  defaultValue: string;
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
}

const RadioBlock: React.FC<RadioBlockProps> = ({
  label,
  options,
  defaultValue,
  value,
  onChange,
  name
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <FormControl component="fieldset" margin="normal" fullWidth>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup
        aria-label={label}
        name={name}
        value={value || defaultValue}
        onChange={handleChange}
      >
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            value={option}
            control={<Radio />}
            label={option}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioBlock;
