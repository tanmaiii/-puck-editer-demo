import React from 'react';
import {
  Box,
  Paper,
  TextField,
  Typography,
  Divider,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

interface FormSettingsProps {
  title: string;
  description: string;
  status: 'draft' | 'published' | 'archived';
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onStatusChange: (status: 'draft' | 'published' | 'archived') => void;
}

const FormSettings: React.FC<FormSettingsProps> = ({
  title,
  description,
  status,
  onTitleChange,
  onDescriptionChange,
  onStatusChange,
}) => {
  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Form Settings
      </Typography>
      
      <Divider sx={{ mb: 3 }} />
      
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Form Title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          variant="outlined"
          margin="normal"
          required
        />
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Form Description"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          placeholder="Enter a description for your form..."
        />
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      <FormControl component="fieldset" sx={{ mb: 3 }}>
        <FormLabel component="legend">Form Status</FormLabel>
        <RadioGroup
          aria-label="form-status"
          value={status}
          onChange={(e) => onStatusChange(e.target.value as 'draft' | 'published' | 'archived')}
        >
          <FormControlLabel
            value="draft"
            control={<Radio />}
            label="Draft - Form is being edited"
          />
          <FormControlLabel
            value="published"
            control={<Radio />}
            label="Published - Form is live and accepting responses"
          />
          <FormControlLabel
            value="archived"
            control={<Radio />}
            label="Archived - Form is no longer accepting responses"
          />
        </RadioGroup>
      </FormControl>
      
      <Divider sx={{ my: 3 }} />
      
      <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
        <Typography variant="subtitle2" gutterBottom>
          Form Information
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Status: <strong>{status.charAt(0).toUpperCase() + status.slice(1)}</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Created: {new Date().toLocaleDateString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Last Modified: {new Date().toLocaleDateString()}
        </Typography>
      </Box>
    </Paper>
  );
};

export default FormSettings;
