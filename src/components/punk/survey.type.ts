import { Data } from '@measured/puck';

// Survey Form Types
export interface SurveyFormData {
  id?: string;
  title: string;
  description?: string;
  content: Data;
  createdAt?: Date;
  updatedAt?: Date;
  status: 'draft' | 'published' | 'archived';
}

export interface SurveyFormResponse {
  id: string;
  formId: string;
  responses: Record<string, string>;
  submittedAt: Date;
}

export interface SurveyFormField {
  id: string;
  type: 'dropdown' | 'radio' | 'text' | 'textarea' | 'checkbox';
  label: string;
  required: boolean;
  options?: string[];
  defaultValue?: string;
}

export interface FormBuilderProps {
  initialData?: SurveyFormData;
  onSave?: (data: SurveyFormData) => void;
  onPreview?: (data: SurveyFormData) => void;
  onPublish?: (data: SurveyFormData) => void;
}

export interface TabProps {
  activeTab: 'builder' | 'preview' | 'settings';
  onTabChange: (tab: 'builder' | 'preview' | 'settings') => void;
}

export interface FormSettingsProps {
  title: string;
  description: string;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
}

// Choice Question Types
export interface ChoiceOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface QuestionValidation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  custom?: (value: any) => string | undefined;
}

export interface GeneralQuestionProps {
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
}

export interface QuestionConfig {
  choiceOptions: ChoiceOption[];
  allowMultiple?: boolean;
  showOther?: boolean;
  randomizeOptions?: boolean;
}

export interface SurveyFormUtils {
  setValue: (name: string, value: any) => void;
  getValue: (name: string) => any;
  getError: (name: string) => string | undefined;
  validateField: (name: string) => void;
  isFieldTouched: (name: string) => boolean;
}

export interface ChoiceQuestionProps {
  id: string;
  general: GeneralQuestionProps;
  surveyFormUtils: SurveyFormUtils;
  question: {
    validation?: QuestionValidation;
  };
  formId?: string;
  index?: number;
  puck?: {
    isEditing?: boolean;
  };
  config: QuestionConfig;
}