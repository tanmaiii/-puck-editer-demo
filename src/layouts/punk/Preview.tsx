import { Data } from "@measured/puck";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface PreviewProps {
  data: Data;
}

export default function Preview({ data }: PreviewProps) {
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  const handleSelectChange = (index: number, value: string) => {
    const fieldKey = `field_${index}`;
    setFormValues((prev) => ({
      ...prev,
      [fieldKey]: value,
    }));
  };

  const handleRadioChange = (index: number, value: string) => {
    const fieldKey = `field_${index}`;
    setFormValues((prev) => ({
      ...prev,
      [fieldKey]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted with values:", formValues);
    const results: string[] = [];

    // Lấy giá trị từ các field đã được điền
    data?.content?.forEach((item, index) => {
      const fieldKey = `field_${index}`;
      const selectedValue = formValues[fieldKey];
      if (selectedValue) {
        const questionLabel = `${index + 1}.${item.props?.general?.label} `;

        // Tìm label tương ứng với value được chọn
        const selectedOption = item.props?.config?.choiceOptions?.find(
          (option: any) => (option.value || option) === selectedValue
        );

        const displayValue = selectedOption
          ? selectedOption.label || selectedOption
          : selectedValue;
        results.push(`${questionLabel}: ${displayValue}`);
      }
    });
    alert(`\n${results.join("\n")}`);
  };

  return (
    <Box sx={{ p: 2, overflowY: "auto", height: "100vh" }}>
      <Paper sx={{ p: 3, bgcolor: "white" }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          Form Preview
        </Typography>
        <Stack>
          {data?.content?.map((item, index) => (
            <FormControl key={index} sx={{ mt: 4 }}>
              <Typography variant="h6">
                {index + 1}. {item.props?.general?.label}
              </Typography>
              <Typography sx={{ fontSize: "0.875rem", color: "#A3AAB4" }}>
                {item.props?.general?.description}
              </Typography>
              {item.type === "DropdownBlock" && (
                <Select
                  value={formValues[`field_${index}`] || ""}
                  onChange={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    handleSelectChange(index, event.target.value);
                  }}
                  sx={{
                    width: "100%",
                    border: "1px solid #ccc",
                    color: "#000",
                  }}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    {item.props?.general?.placeholder || "Select an option"}
                  </MenuItem>
                  {item.props?.config?.choiceOptions?.map((option: any) => (
                    <MenuItem
                      key={option.value || option}
                      value={option.value || option}
                      sx={{
                        color: "#000",
                      }}
                    >
                      {option.label || option}
                    </MenuItem>
                  )) || []}
                </Select>
              )}
              {item.type === "RadioBlock" && (
                <FormControl component="fieldset">
                  <RadioGroup
                    value={formValues[`field_${index}`] || ""}
                    onChange={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      handleRadioChange(index, event.target.value);
                    }}
                    sx={{
                      color: "#000",
                      "& .MuiSvgIcon-root": {
                        color: "#000",
                      },
                    }}
                    color="#000"
                  >
                    {item.props?.config?.choiceOptions?.map((option: any) => (
                      <FormControlLabel
                        key={option.value || option}
                        value={option.value || option}
                        control={<Radio />}
                        label={option.label || option}
                        sx={{
                          color: "#000",
                        }}
                      />
                    )) || []}
                  </RadioGroup>
                </FormControl>
              )}
            </FormControl>
          )) || []}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
