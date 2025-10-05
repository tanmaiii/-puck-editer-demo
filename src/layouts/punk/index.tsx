import { Config, Data, Overrides, Puck } from "@measured/puck";
import { Box, Grid, Stack } from "@mui/material";
import React, { useState } from "react";
import useConfigPuckComponents from "./puck-config";
import { FormField } from "../../components/punk/FormFields";
import Preview from "./Preview";

interface SurveyCreatorWrapperProps {}

export type PuckConfig = Config<{
  components?: any;
  root?: any;
  categories?: string;
}>;

export const SurveyCreatorWrapper: React.FC<SurveyCreatorWrapperProps> = () => {
  const [formData, setFormData] = useState<Data>({
    content: [],
    root: {},
  });

  const config = useConfigPuckComponents();

  const [_hasChanges, setHasChanges] = useState(false); // Track if form has unsaved changes - for future use

  const puckData = formData;

  const overrides = {
    drawerItem: ({ name }: { name: string }) => <FormField id={name} />,
    componentOverlay: ({ isSelected }) => (
      <Box
        width="100%"
        height="100%"
        border={(theme) =>
          `1px solid ${isSelected ? theme.palette.primary.main : "unset"}`
        }
      ></Box>
    ),
  } as Partial<Overrides<PuckConfig>>;

  const handleChangeData = (data: Data) => {
    setFormData(data);
    setHasChanges(true);
    console.log("Form data changed:", data);
  };

  return (
    <Box
      key={`survey-form-creator`}
      sx={{
        height: "100vh",
        "& input, & div.MuiSelect-select": {
          height: "auto",
        },
      }}
    >
      <Puck
        config={config}
        data={puckData}
        overrides={overrides}
        onChange={handleChangeData}
      >
        <Stack
          direction="row"
          spacing={3}
          width="100%"
          height="100vh"
        >
          <Stack
            sx={{
              width: 240,
              flexShrink: 0,
              overflow: "auto",
              height: "100vh",
              borderRight: "1px solid #E2E8F0",
              padding: 4,
            }}
          >
            <Puck.Components />
          </Stack>
          <Stack
            sx={{
              flexGrow: 1,
              minWidth: 0,
              overflowY: "hidden",
              height: "100vh",
            }}
          >
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 2, sm: 2, md: 2 }}
            >
              <Grid
                size={6}
                sx={{
                  "& div._PuckPreview_z2rgu_1": {
                    height: "100vh",
                  },
                }}
              >
                <Stack>
                  <Puck.Preview />
                </Stack>
              </Grid>
              <Grid size={6}>
                <Preview data={formData} />
              </Grid>
            </Grid>
          </Stack>
        </Stack>
      </Puck>
    </Box>
  );
};
