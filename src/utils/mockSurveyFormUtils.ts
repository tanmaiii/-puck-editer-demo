import { SurveyFormUtils } from '../components/punk/survey.type';

// Mock implementation for testing and development
export const createMockSurveyFormUtils = (): SurveyFormUtils => {
  const formData: Record<string, any> = {};
  const errors: Record<string, string> = {};
  const touched: Record<string, boolean> = {};

  return {
    setValue: (name: string, value: any) => {
      formData[name] = value;
      // Clear error when value is set
      if (errors[name]) {
        delete errors[name];
      }
    },

    getValue: (name: string) => {
      return formData[name];
    },

    getError: (name: string) => {
      return errors[name];
    },

    validateField: (name: string) => {
      const value = formData[name];
      // Simple validation example
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        errors[name] = 'This field is required';
      } else {
        delete errors[name];
      }
    },

    isFieldTouched: (name: string) => {
      return touched[name] || false;
    },
  };
};
