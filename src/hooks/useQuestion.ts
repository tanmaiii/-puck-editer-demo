import { useCallback, useMemo, useState } from "react";
import {
  GeneralQuestionProps,
  QuestionValidation,
  SurveyFormUtils,
} from "../components/punk/survey.type";

interface UseQuestionProps {
  formId: string;
  surveyFormUtils: SurveyFormUtils;
  validation?: QuestionValidation;
  general: GeneralQuestionProps;
  id: string;
  index?: number;
  isEditMode?: boolean;
}

interface UseQuestionReturn {
  isReadOnly: boolean;
  handleSetValue: (name: string, value: any) => void;
  value: any;
  error?: string;
  helperText?: string;
  questionTitleProps: {
    title: string;
    description?: string;
    required?: boolean;
  };
  isEditMode: boolean;
}

const useQuestion = ({
  surveyFormUtils,
  validation,
  general,
  isEditMode = false,
}: UseQuestionProps): UseQuestionReturn => {
  const [touched, setTouched] = useState(false);

  // Get current value from form utils
  const value = useMemo(() => {
    return surveyFormUtils.getValue(general.name);
  }, [surveyFormUtils, general.name]);

  // Get error from form utils
  const error = useMemo(() => {
    if (!touched && !surveyFormUtils.isFieldTouched(general.name)) {
      return undefined;
    }
    return surveyFormUtils.getError(general.name);
  }, [surveyFormUtils, general.name, touched]);

  // Helper text for validation
  const helperText = useMemo(() => {
    if (error) return error;
    if (general.description) return general.description;
    return undefined;
  }, [error, general.description]);

  // Handle value changes
  const handleSetValue = useCallback(
    (name: string, newValue: any) => {
      setTouched(true);
      surveyFormUtils.setValue(name, newValue);

      // Validate if validation rules exist
      if (validation) {
        surveyFormUtils.validateField(name);
      }
    },
    [surveyFormUtils, validation]
  );

  // Question title props
  const questionTitleProps = useMemo(
    () => ({
      title: general.label,
      description: general.description,
      required: general.required || validation?.required,
    }),
    [general, validation]
  );

  // Read-only state (in edit mode, fields are typically read-only for preview)
  const isReadOnly = useMemo(() => {
    return isEditMode;
  }, [isEditMode]);

  return {
    isReadOnly,
    handleSetValue,
    value,
    error,
    helperText,
    questionTitleProps,
    isEditMode: isEditMode ?? false,
  };
};

export default useQuestion;
