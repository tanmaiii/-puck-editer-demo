import React from 'react';
import { Box, Tabs, Tab, Paper } from '@mui/material';
import { Build, Visibility, Settings } from '@mui/icons-material';

interface TabNavigationProps {
  activeTab: 'builder' | 'preview' | 'settings';
  onTabChange: (tab: 'builder' | 'preview' | 'settings') => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const handleChange = (event: React.SyntheticEvent, newValue: 'builder' | 'preview' | 'settings') => {
    onTabChange(newValue);
  };

  return (
    <Paper elevation={1} sx={{ mb: 2 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          aria-label="form builder tabs"
          variant="fullWidth"
        >
          <Tab
            icon={<Build />}
            iconPosition="start"
            label="Form Builder"
            value="builder"
            sx={{ textTransform: 'none' }}
          />
          <Tab
            icon={<Visibility />}
            iconPosition="start"
            label="Preview"
            value="preview"
            sx={{ textTransform: 'none' }}
          />
          <Tab
            icon={<Settings />}
            iconPosition="start"
            label="Settings"
            value="settings"
            sx={{ textTransform: 'none' }}
          />
        </Tabs>
      </Box>
    </Paper>
  );
};

export default TabNavigation;
