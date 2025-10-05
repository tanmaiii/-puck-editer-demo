import React from 'react';
import { Box, Typography, Stack } from '@mui/material';

interface QuestionTitleSectionProps {
  title: string;
  description?: string;
  required?: boolean;
  children: React.ReactNode;
}

const QuestionTitleSection: React.FC<QuestionTitleSectionProps> = ({
  title,
  description,
  required = false,
  children,
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Stack spacing={1} sx={{ mb: 2 }}>
        <Typography 
          variant="h6" 
          component="h3"
          sx={{ 
            fontWeight: 500,
            fontSize: '1.1rem',
            color: 'text.primary'
          }}
        >
          {title}
          {required && (
            <Typography 
              component="span" 
              sx={{ 
                color: 'error.main', 
                ml: 0.5,
                fontSize: '1.2rem'
              }}
            >
              *
            </Typography>
          )}
        </Typography>
        
        {description && (
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'text.secondary',
              fontSize: '0.875rem'
            }}
          >
            {description}
          </Typography>
        )}
      </Stack>
      
      {children}
    </Box>
  );
};

export default QuestionTitleSection;
