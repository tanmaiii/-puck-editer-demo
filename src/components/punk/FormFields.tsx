import { UseDraggableInput } from "@dnd-kit/react";
import { ComponentConfig, Config } from "@measured/puck";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Typography } from "@mui/material";
import { startCase } from "lodash";
export interface SurveyFormFieldsProps {
  config: Config;
}

export interface FormFieldProps extends UseDraggableInput {
  data: ComponentConfig;
  id: string;
  category: string;
}

export const FormField = ({ id }: { id: string }) => {
  const displayId = id === "MultipleMatrixV2" ? id.replace(/V2$/, "") : id;
  const labelText = startCase(displayId);
  return (
    <Box
      bgcolor="#fff"
      borderRadius="0.375rem"
      border={`1px solid #ccc`}
      p="0.375rem"
      display="flex"
      alignItems="center"
      gap="0.375rem"
      sx={{ cursor: "pointer" }}
      boxSizing="border-box"
      minHeight="2.625rem"
      justifyContent={"space-between"}
    >
      <Typography>{labelText}</Typography>
      <MenuIcon sx={{ color: "#ccc" }} />
    </Box>
  );
};

export default FormField;
