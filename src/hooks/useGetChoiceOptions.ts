import { useMemo } from 'react';
import { ChoiceOption, QuestionConfig, SurveyFormUtils } from '../components/punk/survey.type';

interface UseGetChoiceOptionsProps extends QuestionConfig {
  isEditMode: boolean;
  surveyFormUtils: SurveyFormUtils;
}

const useGetChoiceOptions = ({
  choiceOptions,
  showOther = false,
  randomizeOptions = false,
  isEditMode,
}: UseGetChoiceOptionsProps): ChoiceOption[] => {
  
  const processedOptions = useMemo(() => {
    let options = [...choiceOptions];

    // Add "Other" option if enabled
    if (showOther && !isEditMode) {
      options.push({
        value: '__other__',
        label: 'Other',
        disabled: false,
      });
    }

    // Randomize options if enabled and not in edit mode
    if (randomizeOptions && !isEditMode) {
      options = options.sort(() => Math.random() - 0.5);
    }

    // Filter out disabled options in non-edit mode
    if (!isEditMode) {
      options = options.filter(option => !option.disabled);
    }

    return options;
  }, [choiceOptions, showOther, randomizeOptions, isEditMode]);

  return processedOptions;
};

export default useGetChoiceOptions;
