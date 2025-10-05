import { Box, Typography } from "@mui/material";
import React, { FocusEvent, KeyboardEvent, MouseEvent } from "react";

// Utility function to convert text to camelCase
export const camelCase = (str: string): string => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
};

interface EditableTextProps {
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  placeholder?: string;
  required?: boolean;
  style?: React.CSSProperties;
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  placeholder = "",
  name,
  required,
  style = {},
}) => {
  const handleBlur = (ev: FocusEvent<HTMLDivElement>) => {
    const text = ev.target.innerText;
    onChange(name, text);
  };

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.currentTarget.blur();
    }
  };

  const handleInput = (ev: React.FormEvent<HTMLDivElement>) => {
    const element = ev.currentTarget;
    const content = element.innerHTML;

    if (content === "<br>" || content === "<br/>" || content === "<br />") {
      element.innerHTML = "";
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        "& div[contenteditable=plaintext-only]:empty::before": {
          content: "attr(data-placeholder)",
          pointerEvents: "none",
          opacity: 0.5,
        },
      }}
    >
      <Box
        component="div"
        contentEditable="plaintext-only"
        suppressContentEditableWarning
        onBlur={handleBlur}
        onInput={handleInput}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        data-placeholder={placeholder}
        sx={{
          ...style,
          outline: "none",
          padding: "12px",
          borderRadius: 1,
          border: "2px dashed transparent",
          "&:hover": {
            backgroundColor: "rgba(25, 118, 210, 0.08)",
            border: "2px dashed rgba(25, 118, 210, 0.5)",
          },
          "&:focus": {
            backgroundColor: "rgba(25, 118, 210, 0.08)",
            border: "2px solid rgba(25, 118, 210, 0.8)",
          },
          minHeight: "48px",
          display: "flex",
          alignItems: "center",
          cursor: "text",
          transition: "all 0.2s ease-in-out",
          color: "#000",
        }}
      >
        {value}
      </Box>
      {required && (
        <Box
          position="absolute"
          top="50%"
          sx={{ transform: "translateY(-50%)" }}
          right="-1.2rem"
        >
          <Typography component="span" sx={{ color: "error.main" }}>
            *
          </Typography>
        </Box>
      )}
    </Box>
  );
};
