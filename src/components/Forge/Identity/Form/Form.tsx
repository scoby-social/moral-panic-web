import {
  Box,
  Typography,
  Grid,
  Tooltip,
  TextField,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { joiResolver } from "@hookform/resolvers/joi";
import InfoIcon from "@mui/icons-material/Info";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import { useAtom } from "jotai";

import { Pronouns } from "lib/models/user";
import useCheckMobileScreen from "lib/hooks/useCheckMobileScreen";
import { checkIfUsernameExists } from "lib/axios/requests/users/checkIfUsernameExists";
import { formValues } from "lib/store";

import {
  formContainer,
  formGridGroup,
  formWrapper,
  superheroIdentityWrapper,
  tooltip,
  helperText,
  roleFieldWrapper,
  roleFormFields,
  textWithMargin,
  formWrapperWithoutMargin,
  FormElement,
  container,
  identityFooterWrapper,
  mintButtonWrapper,
  mintButton,
  forgeBackButtonWrapper,
  formField,
} from "./styles";
import { PhotoBoothFormInputs } from "./types";
import { schema } from "./validator";

const Form = ({
  setFormFilled,
}: {
  setFormFilled: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [values, setFormValues] = useAtom(formValues);
  const isMobile = useCheckMobileScreen();

  const router = useRouter();

  const {
    control,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isValid },
  } = useForm<PhotoBoothFormInputs>({
    resolver: joiResolver(schema),
    mode: "all",
    values,
  });

  const username = watch("username");

  const submitForm = React.useCallback((values: PhotoBoothFormInputs) => {
    setFormValues(values);
    setFormFilled(true);
    // eslint-disable-next-line
  }, []);

  const validateIfUserExists = React.useCallback(async () => {
    if (username.length === 0) {
      setError("username", {
        message: "Name is required",
        type: "string.empty",
      });
      return;
    }

    const exists = await checkIfUsernameExists(username);
    if (exists) {
      setError(
        "username",
        {
          message: "Username already exists!",
          type: "onBlur",
        },
        { shouldFocus: true }
      );
      return;
    }
  }, [username, setError]);

  return (
    <Box sx={container}>
      <FormElement isMobile={isMobile} onSubmit={handleSubmit(submitForm)}>
        <Box sx={forgeBackButtonWrapper} onClick={() => router.back()}>
          <ArrowBackIos sx={{ fill: "#8D8D8D" }} />
          <Typography variant="h3">{"THE FORGE"}</Typography>
        </Box>
        <Box sx={formContainer}>
          <Typography align="center" variant="h6">
            Create a New Identity
          </Typography>

          <Grid justifyContent="space-around" padding="1vmax" container>
            <Grid flex="1" sx={formGridGroup} item xs={12} md={6}>
              <Box sx={formWrapper}>
                <Box sx={superheroIdentityWrapper}>
                  <Typography>
                    Your Superhero Identity<sup>*</sup>
                  </Typography>

                  <Tooltip
                    arrow
                    sx={tooltip}
                    title={
                      <span
                        style={{ whiteSpace: "pre-line" }}
                      >{`Your name is how you will be addressed. It can be up to 15 characters or less, containing only letters, numbers and underscores. No spaces allowed.\n\n The Adjective and Noun represent the legendary superpowers inherent in your sovereign soul.`}</span>
                    }
                  >
                    <InfoIcon />
                  </Tooltip>
                </Box>
                <Typography sx={helperText} variant="caption">
                  Example: Punky the Wonderful Spatula
                </Typography>
                <Controller
                  name="username"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="username-input"
                      fullWidth
                      sx={formField}
                      onBlur={validateIfUserExists}
                      error={!!errors.username}
                      placeholder="How you want to be addressed in one word 15 letters max"
                      helperText={errors.username?.message || "Example: Punky"}
                      size="small"
                      variant="outlined"
                      inputProps={{ maxLength: 15 }}
                    />
                  )}
                />
              </Box>

              <Box sx={formWrapper}>
                <Box sx={roleFieldWrapper}>
                  <Typography variant="h6">the</Typography>
                  <Controller
                    name="amplifierRole"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="adjective-input"
                        variant="outlined"
                        error={!!errors.amplifierRole}
                        sx={roleFormFields}
                        placeholder="Adjective"
                        helperText={
                          errors.amplifierRole?.message || "Example: Wonderful"
                        }
                        size="small"
                      />
                    )}
                  />

                  <Controller
                    name="superpowerRole"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="noun-input"
                        variant="outlined"
                        error={!!errors.superpowerRole}
                        sx={roleFormFields}
                        placeholder="Noun"
                        helperText={
                          errors.superpowerRole?.message || "Example: Spatula"
                        }
                        size="small"
                      />
                    )}
                  />
                </Box>
              </Box>

              <Box sx={formWrapper}>
                <Typography sx={textWithMargin}>Pronouns</Typography>
                <Controller
                  name="pronouns"
                  control={control}
                  defaultValue={Pronouns.other}
                  render={({ field }) => (
                    <Select
                      {...field}
                      id="pronouns-select"
                      fullWidth
                      size="small"
                      sx={formField}
                      defaultValue=""
                      error={!!errors.pronouns}
                      IconComponent={KeyboardArrowDownIcon}
                    >
                      {Object.values(Pronouns).map(value => (
                        <MenuItem key={value} value={value}>
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </Box>
            </Grid>

            <Grid flex="1" sx={formGridGroup} item xs={12} md={6}>
              <Box sx={formWrapperWithoutMargin}>
                <Typography sx={textWithMargin}>
                  Bio<sup>*</sup>
                </Typography>
                <Controller
                  name="bio"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="biography-input"
                      multiline
                      minRows={2}
                      maxRows={3}
                      fullWidth
                      sx={formField}
                      error={!!errors.bio}
                      inputProps={{ maxLength: 160 }}
                      placeholder="bio"
                      helperText={errors.bio?.message}
                      variant="outlined"
                    />
                  )}
                />
              </Box>

              <Box sx={formWrapperWithoutMargin}>
                <Typography sx={textWithMargin}>Twitter</Typography>
                <Controller
                  name="twitterHandle"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="twitter-input"
                      fullWidth
                      sx={formField}
                      placeholder="@username"
                      error={!!errors.twitterHandle}
                      helperText={errors.twitterHandle?.message}
                      size="small"
                      variant="outlined"
                    />
                  )}
                />
              </Box>

              <Box sx={formWrapperWithoutMargin}>
                <Typography sx={textWithMargin}>Discord</Typography>
                <Controller
                  name="discordHandle"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="user-url-input"
                      fullWidth
                      sx={formField}
                      placeholder="username#1234"
                      error={!!errors.discordHandle}
                      helperText={errors.discordHandle?.message}
                      size="small"
                      variant="outlined"
                    />
                  )}
                />
              </Box>

              <Box sx={formWrapperWithoutMargin}>
                <Typography sx={textWithMargin}>Telegram</Typography>
                <Controller
                  name="telegramHandle"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="user-url-input"
                      fullWidth
                      sx={formField}
                      placeholder="@username"
                      error={!!errors.telegramHandle}
                      helperText={errors.telegramHandle?.message}
                      size="small"
                      variant="outlined"
                    />
                  )}
                />
              </Box>
            </Grid>
          </Grid>

          <Box sx={identityFooterWrapper}>
            <Box sx={mintButtonWrapper}>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={!isValid}
                sx={mintButton}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  {"Enter PhotoBooth"}
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </FormElement>
    </Box>
  );
};

export default Form;
