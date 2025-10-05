import React, { useState } from 'react';
import { Button, Box, Typography, Paper, Alert } from '@mui/material';
import { Data } from '@measured/puck';
import DropdownBlock from './DropdownBlock';
import RadioBlock from './RadioBlock';
import TextInput from './TextInput';
import { ComponentData } from '../layouts/punk/puck-config';

interface FormPreviewProps {
  data: Data;
}

const FormPreview: React.FC<FormPreviewProps> = ({ data }) => {
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [submissionResult, setSubmissionResult] = useState<Record<string, string> | null>(null);

  const handleFieldChange = (fieldId: string, value: string) => {
    setFormValues(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Collect all form values
    const result: Record<string, string> = {};
    
    data.content.forEach((item, index) => {
      const fieldId = `field-${index}`;
      const fieldValue = formValues[fieldId];
      
      if (item.type === 'DropdownBlock' || item.type === 'RadioBlock') {
        const props = item.props as ComponentData[keyof ComponentData];
        result[props.label] = fieldValue || props.defaultValue;
      } else if (item.type === 'TextInput') {
        const props = item.props as ComponentData['TextInput'];
        result[props.label] = fieldValue || props.defaultValue || '';
      }
    });

    setSubmissionResult(result);
    console.log('Form Submission Result:', result);
  };

  const renderFormField = (item: any, index: number) => {
    const fieldId = `field-${index}`;
    const fieldValue = formValues[fieldId];

    if (item.type === 'DropdownBlock') {
      const props = item.props as ComponentData['DropdownBlock'];
      // Convert array of objects to array of strings
      const optionStrings = Array.isArray(props.options) 
        ? props.options.map((opt: any) => typeof opt === 'string' ? opt : opt.option || opt)
        : ['Lựa chọn 1', 'Lựa chọn 2'];
      
      return (
        <DropdownBlock
          key={fieldId}
          label={props.label}
          options={optionStrings}
          defaultValue={props.defaultValue}
          value={fieldValue}
          onChange={(value) => handleFieldChange(fieldId, value)}
          name={fieldId}
        />
      );
    }

    if (item.type === 'RadioBlock') {
      const props = item.props as ComponentData['RadioBlock'];
      // Convert array of objects to array of strings
      const optionStrings = Array.isArray(props.options) 
        ? props.options.map((opt: any) => typeof opt === 'string' ? opt : opt.option || opt)
        : ['Lựa chọn 1', 'Lựa chọn 2'];
      
      return (
        <RadioBlock
          key={fieldId}
          label={props.label}
          options={optionStrings}
          defaultValue={props.defaultValue}
          value={fieldValue}
          onChange={(value) => handleFieldChange(fieldId, value)}
          name={fieldId}
        />
      );
    }

    if (item.type === 'TextInput') {
      const props = item.props as ComponentData['TextInput'];
      
      return (
        <TextInput
          key={fieldId}
          label={props.label}
          placeholder={props.placeholder}
          defaultValue={props.defaultValue}
          value={fieldValue}
          onChange={(value) => handleFieldChange(fieldId, value)}
          name={fieldId}
          required={props.required}
          multiline={props.multiline}
          rows={props.rows}
        />
      );
    }

    return null;
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        Form Preview
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 3 }}>
          {data.content.map((item, index) => renderFormField(item, index))}
        </Box>
        
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          size="large"
          disabled={data.content.length === 0}
        >
          Submit Form
        </Button>
      </form>

      {submissionResult && (
        <Alert severity="success" sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Form Submitted Successfully!
          </Typography>
          <Typography variant="body2" component="div">
            <strong>Submitted Values:</strong>
            <Box component="pre" sx={{ mt: 1, fontSize: '0.875rem' }}>
              {JSON.stringify(submissionResult, null, 2)}
            </Box>
          </Typography>
        </Alert>
      )}
    </Paper>
  );
};

export default FormPreview;
