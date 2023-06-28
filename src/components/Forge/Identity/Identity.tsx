import { Box } from "@mui/material";
import * as React from "react";
import Form from "./Form/Form";
import PhotoBooth from "./PhotoBooth/PhotoBooth";
import { identityContainer } from "./styles";

const Identity = () => {
  const [formFilled, setFormFilled] = React.useState(false);

  return (
    <Box sx={identityContainer}>
      {formFilled ? (
        <PhotoBooth setFormFilled={setFormFilled} />
      ) : (
        <Form setFormFilled={setFormFilled} />
      )}
    </Box>
  );
};

export default Identity;
