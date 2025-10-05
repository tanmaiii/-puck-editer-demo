import { registerOverlayPortal } from "@measured/puck";
import { Add, RadioButtonUnchecked } from "@mui/icons-material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Box, Button, IconButton, Stack } from "@mui/material";
import { MouseEvent } from "react";
import { ChoiceOption } from "../survey.type";
import { camelCase, EditableText } from "../Question";
import useSafeActionPuck from "../Question/hooks/useSafeActionPuck";

interface DropdownQuestionProps {
  general?: {
    label?: string;
    description?: string;
    required?: boolean;
  };
  config?: any;
  formId?: string;
  question?: any;
  surveyFormUtils?: any;
  puck?: {
    isEditing?: boolean;
  };
  fieldId: string;
  choiceOptions: ChoiceOption[];
}

export default function RadioQuestion({
  general,
  fieldId,
  choiceOptions,
}: DropdownQuestionProps) {
  const getPuck = useSafeActionPuck();

  // Get current title and description from general props
  const title = general?.label || "";
  const description = general?.description || "";

  const handleTitleDescriptionChange = (
    fieldName: string,
    newValue: string
  ) => {
    if (!getPuck) return;
    if (!newValue.trim()) return;

    const { getItemById, getSelectorForId, dispatch } = getPuck();
    const selectedItem = getItemById(fieldId);
    const selector = getSelectorForId(fieldId);

    if (!selectedItem || !selector) return;

    const updateData = {
      ...selectedItem.props.general,
      [fieldName === "title" ? "label" : "description"]: newValue,
    };

    dispatch({
      type: "replace",
      data: {
        ...selectedItem,
        props: {
          ...selectedItem.props,
          general: updateData,
        },
      },
      destinationIndex: selector.index,
      destinationZone: selector.zone,
    });
  };

  const handleChange = (
    oldValue: string,
    newText: string,
    isDelete = false,
    isCorrect?: boolean
  ) => {
    if (!getPuck) return;
    if (!isDelete && !newText && isCorrect === undefined) return;

    const { getItemById, getSelectorForId, dispatch } = getPuck();
    const selectedItem = getItemById(fieldId);
    const selector = getSelectorForId(fieldId);

    if (!selectedItem || !selector) return;

    if (["none", "all"].includes(oldValue.toLowerCase())) {
      let updateData = {};

      if (oldValue.toLowerCase() === "all") {
        updateData = {
          showAllOption: !isDelete,
          allOptionName: newText || "All",
        };
      } else {
        updateData = {
          showNoneOption: !isDelete,
          noneOptionName: newText || "None",
        };
      }

      dispatch({
        type: "replace",
        data: {
          ...selectedItem,
          props: {
            ...selectedItem.props,
            config: {
              ...selectedItem.props.config,
              ...updateData,
            },
          },
        },
        destinationIndex: selector.index,
        destinationZone: selector.zone,
      });
      return;
    }

    const currentOptions = selectedItem.props.config
      .choiceOptions as ChoiceOption[];
    let updatedOptions: ChoiceOption[] = [];

    if (isDelete) {
      updatedOptions = currentOptions.filter((opt) => opt.value !== oldValue);
    } else if (oldValue) {
      // Update existing
      updatedOptions = currentOptions.map((opt) =>
        opt.value === oldValue
          ? {
              value: `${camelCase(newText)}_${crypto.randomUUID()}`,
              label: newText,
            }
          : opt
      ) as ChoiceOption[];
    } else {
      // Add new
      const newOption = {
        value: `${camelCase(newText)}_${crypto.randomUUID()}`,
        label: newText,
      } as ChoiceOption;
      updatedOptions = [...currentOptions, newOption];
    }

    dispatch({
      type: "replace",
      data: {
        ...selectedItem,
        props: {
          ...selectedItem.props,
          config: {
            ...selectedItem.props.config,
            choiceOptions: updatedOptions,
          },
        },
      },
      destinationIndex: selector.index,
      destinationZone: selector.zone,
    });
  };

  const handleAddAnswer = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    handleChange("", "New option");
  };

  const handleRemoveAnswer = (value: string) => {
    handleChange(value, "", true);
  };

  return (
    <Box
      sx={{
        mb: 3,
        p: 3,
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
    >
      <Stack spacing={3}>
        {/* Title Section */}
        <Box
          ref={(node: HTMLElement | null) => {
            registerOverlayPortal(node);
          }}
        >
          <EditableText
            name="title"
            value={title}
            onChange={(name, value) => {
              handleTitleDescriptionChange(name, value);
            }}
            placeholder="Tiêu đề"
            required={general?.required}
            style={{
              fontWeight: 500,
              fontSize: "1.1rem",
              color: "#000",
            }}
          />
          <EditableText
            name="description"
            value={description}
            onChange={(name, value) => {
              handleTitleDescriptionChange(name, value);
            }}
            placeholder="Mô tả"
            style={{
              fontSize: "0.875rem",
              color: "#000",
            }}
          />
        </Box>
        <Box display="flex" flexDirection="column" my={2} gap={2}>
          {choiceOptions.map((answer) => (
            <Box
              key={answer.value}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              border="1px solid #ddd"
              borderRadius={1}
              padding={1}
              ref={(node: HTMLElement | null) => {
                registerOverlayPortal(node);
              }}
            >
              <IconButton color="primary">
                <RadioButtonUnchecked
                  sx={{ fontSize: "1rem", color: "black" }}
                />
              </IconButton>
              <EditableText
                name="answer"
                value={answer.label}
                onChange={(_, value) => {
                  handleChange(answer.value, value);
                }}
                placeholder="Nhập đáp án..."
                required={general?.required}
                style={{
                  fontSize: "0.875rem",
                }}
              />
              <IconButton
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  handleRemoveAnswer(answer.value);
                }}
                color="error"
              >
                <RemoveCircleIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
        <Box
          ref={(node: HTMLElement | null) => {
            registerOverlayPortal(node);
          }}
          sx={{ width: "fit-content" }}
        >
          <Button color="primary" onClick={handleAddAnswer}>
            Add More Answer{" "}
            <IconButton color="primary">
              <Add sx={{ fontSize: "1rem", color: "blue", ml: "8" }} />
            </IconButton>
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
