import { Config, Data } from "@measured/puck";
import { useMemo } from "react";
import DropdownQuestion from "../../components/punk/Dropdown";
import RadioQuestion from "../../components/punk/Radio";
import useGetChoiceOptions from "../../hooks/useGetChoiceOptions";
import { createMockSurveyFormUtils } from "../../utils/mockSurveyFormUtils";

// Shared interfaces
interface ChoiceOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface QuestionConfig {
  general: {
    name: string;
    label: string;
    placeholder?: string;
    description?: string;
    required?: boolean;
  };
  config: {
    choiceOptions: ChoiceOption[];
    allowMultiple?: boolean;
    showOther?: boolean;
    randomizeOptions?: boolean;
  };
}

export interface ComponentData {
  DropdownBlock: QuestionConfig;
  RadioBlock: QuestionConfig;
}

export interface UseConfigPuckComponentsProps {
  formId?: string;
  data?: Data;
  answers?: Record<string, unknown>;
}

// Create survey form utils hook for puck components
const useConfigPuckComponents = (props?: UseConfigPuckComponentsProps) => {
  const { formId = "id", data, answers } = props || {};

  const surveyFormUtils = useMemo(() => {
    const mockUtils = createMockSurveyFormUtils();
    if (answers) {
      Object.entries(answers).forEach(([key, value]) => {
        mockUtils.setValue(key, value);
      });
    }
    return mockUtils;
  }, [data, answers]);

  // Default choice options
  const defaultChoiceOptions: ChoiceOption[] = [
    { value: "option1", label: "Option 1", disabled: false },
    { value: "option2", label: "Option 2", disabled: false },
    { value: "option3", label: "Option 3", disabled: false },
  ];

  // Common field definitions
  const createGeneralFields = () => ({
    type: "object" as const,
    label: "General Settings",
    objectFields: {
      name: { type: "text" as const, label: "Field Name" },
      label: { type: "text" as const, label: "Label" },
      placeholder: { type: "text" as const, label: "Placeholder" },
      description: { type: "text" as const, label: "Description" },
      required: {
        type: "radio" as const,
        label: "Required",
        options: [
          { label: "Yes", value: true },
          { label: "No", value: false },
        ],
      },
    },
  });

  const createConfigFields = (configLabel: string) => ({
    type: "object" as const,
    label: configLabel,
    objectFields: {
      choiceOptions: {
        type: "array" as const,
        label: "Options",
        arrayFields: {
          label: { type: "text" as const, label: "Option Label" },
          value: { type: "text" as const, label: "Option Value" },
          disabled: {
            type: "radio" as const,
            label: "Disabled",
            options: [
              { label: "Yes", value: true },
              { label: "No", value: false },
            ],
          },
        },
        defaultItemProps: {
          label: "New Option",
          value: "new_option",
          disabled: false,
        },
        getItemSummary: (item: ChoiceOption) => item.label || "Option",
      },
      allowMultiple: {
        type: "radio" as const,
        label: "Allow Multiple Selection",
        options: [
          { label: "Yes", value: true },
          { label: "No", value: false },
        ],
      },
      showOther: {
        type: "radio" as const,
        label: "Show Other Option",
        options: [
          { label: "Yes", value: true },
          { label: "No", value: false },
        ],
      },
      randomizeOptions: {
        type: "radio" as const,
        label: "Randomize Options",
        options: [
          { label: "Yes", value: true },
          { label: "No", value: false },
        ],
      },
    },
  });

  // Common render logic
  const createRenderProps = (props: any) => {
    const choiceOptions = useGetChoiceOptions({
      choiceOptions: props.config?.choiceOptions || defaultChoiceOptions,
      showOther: props.config?.showOther || false,
      randomizeOptions: props.config?.randomizeOptions || false,
      isEditMode: true,
      surveyFormUtils: surveyFormUtils,
    });

    return {
      ...props,
      formId,
      question: {},
      surveyFormUtils,
      puck: { isEditing: true },
      fieldId: props.id,
      choiceOptions,
    };
  };

  const configs: Config<ComponentData> = {
    components: {
      DropdownBlock: {
        render: (props) => <DropdownQuestion {...createRenderProps(props)} />,
        fields: {
          general: createGeneralFields(),
          config: createConfigFields("Dropdown Configuration"),
        },
        defaultProps: {
          general: {
            name: "dropdown_field",
            label: "Question title",
            placeholder: "Select an option",
            description: "Question description",
            required: false,
          },
          config: {
            choiceOptions: defaultChoiceOptions,
            allowMultiple: false,
            showOther: false,
            randomizeOptions: false,
          },
        },
      },
      RadioBlock: {
        render: (props) => <RadioQuestion {...createRenderProps(props)} />,
        fields: {
          general: createGeneralFields(),
          config: createConfigFields("Radio Configuration"),
        },
        defaultProps: {
          general: {
            name: "radio_field",
            label: "Question title",
            placeholder: "Select an option",
            description: "Question description",
            required: false,
          },
          config: {
            choiceOptions: defaultChoiceOptions,
            allowMultiple: false,
            showOther: false,
            randomizeOptions: false,
          },
        },
      },
    },
    root: {
      render: ({ children }) => (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
          {children}
        </div>
      ),
    },
  };

  return configs;
};

export default useConfigPuckComponents;
