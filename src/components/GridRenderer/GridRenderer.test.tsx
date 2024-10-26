import { Card, CardContent, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import {
  INVALID_COORDINATES_ERROR,
  INVALID_DIRECTION_ERROR,
  INVALID_FORMAT,
} from "../../helpers/error-messages";
import { validateInput, ValidationResult } from "../../helpers/helper";
import GridDisplay from "../GridDisplay/GridDisplay";

const GridRenderer = () => {
  const [isInputValid, setIsInputValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputValue, setInputValue] = useState("0,0, NORTH");

  const validationHandler = (input: string) => {
    const { areCoordinatesValid, isDirectionValid, isFormatValid }: ValidationResult =
      validateInput(input);
    const isValid = areCoordinatesValid && isDirectionValid && isFormatValid;
    setIsInputValid(isValid);

    const msg = `${
      isFormatValid
        ? areCoordinatesValid
          ? isDirectionValid
            ? ""
            : INVALID_DIRECTION_ERROR
          : isDirectionValid
          ? INVALID_COORDINATES_ERROR
          : `${INVALID_COORDINATES_ERROR} ${INVALID_DIRECTION_ERROR}`
        : INVALID_FORMAT
    }`;

    setErrorMessage(msg);

    setInputValue(isValid ? input : "0,0 NORTH");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.trim();
    validationHandler(input);
  };

  return (
    <>
      <Grid container spacing={2} data-testid="gridRenderer">
        <Grid>
          <Card sx={{ height: 500, width: 300 }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Enter the coordinates and direction to move the object. (ex. 1,1
                NORTH)
              </Typography>
              <br />
              <TextField
                sx={{ width: "100%" }}
                id="outlined-basic"
                label="Coordinates and Direction"
                variant="outlined"
                helperText={errorMessage}
                error={!isInputValid}
                onChange={handleInputChange}
                value={inputValue}
                data-testid="inputText"
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid>
          <GridDisplay input={inputValue} />
        </Grid>
      </Grid>
    </>
  );
};

export default GridRenderer;
