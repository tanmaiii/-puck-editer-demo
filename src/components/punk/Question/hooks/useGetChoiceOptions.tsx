import { filter, get } from "lodash";
import { useMemo } from "react";
import {
  ChoiceOption,
  SurveyFormUtils,
  QuestionConfig,
} from "../../survey.type";

// Define enums and constants locally since they don't exist in the current codebase
enum OrderEnum {
  NONE = "none",
  ASC = "asc",
  DESC = "desc",
  RANDOM = "random",
}

enum ChoiceQuestionInputType {
  RADIO = "radio",
  CHECKBOX = "checkbox",
  DROPDOWN = "dropdown",
}

enum DefaultChoiceOptionKey {
  None = "none",
  All = "all",
  Other = "other",
}

// Helper function to create default options
const createDefaultOption = (
  key: DefaultChoiceOptionKey,
  name: string
): ChoiceOption => ({
  value: key,
  label: name || key,
});

interface UseGetChoiceOptionsProps extends QuestionConfig {
  inputType?: string;
  showNoneOption?: boolean;
  showAllOption?: boolean;
  allOptionName?: string;
  noneOptionName?: string;
  choiceOrder?: OrderEnum;
  multiple?: boolean;
  showOptionOther?: boolean;
  otherOption?: { name?: string };
  showClearButton?: boolean;
  isEditMode: boolean;
  surveyFormUtils?: SurveyFormUtils;
}

const useGetChoiceOptions = (props: UseGetChoiceOptionsProps) => {
  const {
    inputType,
    choiceOptions,
    showNoneOption,
    showAllOption,
    allOptionName,
    choiceOrder,
    multipleChoice,
    showOptionOther,
    otherOption,
    noneOptionName,
    isEditMode,
    // surveyFormUtils - available but not used in current implementation
  } = useMemo(
    () => ({
      inputType: get(props, "inputType", ""),
      choiceOptions: get(props, "choiceOptions", []),
      showNoneOption: get(props, "showNoneOption", false),
      showAllOption: get(props, "showAllOption", false),
      allOptionName: get(props, "allOptionName", ""),
      noneOptionName: get(props, "noneOptionName", ""),
      choiceOrder: get(props, "choiceOrder", OrderEnum.NONE),
      multipleChoice: get(props, "multiple", false),
      showOptionOther: get(props, "showOptionOther", false),
      otherOption: get(props, "otherOption", {}),
      showClearButton: get(props, "showClearButton", {}),
      isEditMode: get(props, "isEditMode", false),
      surveyFormUtils: get(props, "surveyFormUtils", undefined),
    }),
    [props]
  );

  // Filter choice option
  const options = useMemo(() => {
    let filteredChoiceOptions = filter(
      choiceOptions,
      (item: ChoiceOption) => item.label && item.value
    ) as ChoiceOption[];

    // Simple validation without complex expression validation
    filteredChoiceOptions = filter(
      filteredChoiceOptions,
      (item: ChoiceOption) => !!item.label && !!item.value
    ) as ChoiceOption[];

    if (!isEditMode) {
      //handle sort
      switch (choiceOrder) {
        case OrderEnum.ASC:
          filteredChoiceOptions = filteredChoiceOptions.sort((a, b) =>
            a.label.localeCompare(b.label)
          );
          break;
        case OrderEnum.DESC:
          filteredChoiceOptions = filteredChoiceOptions.sort((a, b) =>
            b.label.localeCompare(a.label)
          );
          break;
        case OrderEnum.RANDOM:
          filteredChoiceOptions = filteredChoiceOptions.sort(
            () => Math.random() - 0.5
          );
          break;
      }
    }

    // Add None, All
    if (
      showNoneOption &&
      (!multipleChoice || inputType === ChoiceQuestionInputType.CHECKBOX)
    ) {
      filteredChoiceOptions = [
        createDefaultOption(DefaultChoiceOptionKey.None, noneOptionName),
        ...filteredChoiceOptions,
      ];
    }
    if (
      showAllOption &&
      (!multipleChoice || inputType === ChoiceQuestionInputType.CHECKBOX)
    ) {
      filteredChoiceOptions = [
        ...filteredChoiceOptions,
        createDefaultOption(DefaultChoiceOptionKey.All, allOptionName),
      ];
    }

    // Add Other Option
    if (showOptionOther) {
      filteredChoiceOptions = [
        ...filteredChoiceOptions,
        createDefaultOption(
          DefaultChoiceOptionKey.Other,
          get(otherOption, "name", "")
        ),
      ];
    }

    return filteredChoiceOptions;
  }, [
    choiceOptions,
    showOptionOther,
    allOptionName,
    choiceOrder,
    multipleChoice,
    showAllOption,
    showNoneOption,
    noneOptionName,
    inputType,
    isEditMode,
    otherOption,
  ]);

  return options;
};

export default useGetChoiceOptions;
