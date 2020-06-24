import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import { useAuth0 } from "../react-auth0-spa";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ["Enter your name", "Select account type", "More Details"];
}

export default function SignUpForm(props) {
  const { user, getTokenSilently } = useAuth0();
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const [name, setName] = useState(user.nickname);
  const [userType, setUserType] = React.useState("user");
  const [condition, setCondition] = React.useState("Depression");

  const handleChange = (event) => {
    setUserType(event.target.value);
  };

  const handleConditionChange = (event) => {
    setCondition(event.target.value);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <>
            <Typography>
              This name would be shown to other users in the group. You can also
              signup under an alias.
            </Typography>
            <TextField
              required
              label="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </>
        );
      case 1:
        return (
          <>
            <Typography>Are you a user or a therapist?</Typography>
            <FormControl component="fieldset">
              <RadioGroup
                row
                name="type"
                value={userType}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="user"
                  control={<Radio />}
                  label="User"
                />
                <FormControlLabel
                  value="therapist"
                  control={<Radio />}
                  label="Therapist"
                />
              </RadioGroup>
            </FormControl>
          </>
        );
      case 2:
        return (
          <>
            <Typography>
              {userType === "therapist" && "All Clear!"}
              {userType === "user" &&
                "Select the condition that you can most closely realte to."}
            </Typography>
            {userType === "user" && (
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  name="type"
                  value={condition}
                  onChange={handleConditionChange}
                >
                  <FormControlLabel
                    value="Depression"
                    control={<Radio />}
                    label="Depression"
                  />
                  <FormControlLabel
                    value="Anxiety disorder"
                    control={<Radio />}
                    label="Anxiety disorder"
                  />
                  <FormControlLabel
                    value="Obesessive-Compulsive disorder"
                    control={<Radio />}
                    label="Obesessive-Compulsive disorder"
                  />
                  <FormControlLabel
                    value="Post-traumatic stress disorder"
                    control={<Radio />}
                    label="Post-traumatic stress disorder"
                  />
                  <FormControlLabel
                    value="Bipolar disorder"
                    control={<Radio />}
                    label="Bipolar disorder"
                  />
                </RadioGroup>
              </FormControl>
            )}
          </>
        );
      default:
        return <></>;
    }
  }

  console.log(name);
  console.log(userType);
  console.log(condition);
  const handleSubmit = () => {
    getTokenSilently().then((token) => {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          name: name,
          userType: userType,
          condition: userType === "user" ? condition : "",
        }),
      };
      fetch("/users/signup", requestOptions).then(() => {
        window.location.reload();
      });
    });
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              {getStepContent(index)}
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>
            Thank you for your responses - Click to submit
          </Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className={classes.button}
          >
            Submit and Signup
          </Button>
        </Paper>
      )}
    </div>
  );
}
