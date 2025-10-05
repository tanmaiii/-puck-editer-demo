import React from 'react';

interface AppRequiredAsteriskProps {
  required?: boolean;
}

const AppRequiredAsterisk: React.FC<AppRequiredAsteriskProps> = ({ required }) => {
  if (!required) return null;
  
  return (
    <span style={{ color: 'red', marginLeft: '4px' }}>*</span>
  );
};

export default AppRequiredAsterisk;
