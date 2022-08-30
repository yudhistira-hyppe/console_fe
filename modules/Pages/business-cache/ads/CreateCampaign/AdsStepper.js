import React, {useEffect} from "react";

import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import {useDispatch, useSelector} from "react-redux";
import {getContents} from "../../../../redux/actions/Contents";
import {increaseSteps} from "../../../../redux/actions/Campaign";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(2),
    },
    instructions: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
}));

function getSteps() {
    return ['Set Ad', 'Create Ad', 'Payment'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return 'Set Ad';
        case 1:
            return 'Create Ad';
        case 2:
            return 'Payment';
        default:
            return 'Unknown step';
    }
}

const AdsStepper = ({}) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(1);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const dispatch = useDispatch();
    const { campaign } = useSelector(({ campaignReducer }) => campaignReducer);

    return (
        <div>
            <Stepper style={{backgroundColor: 'transparent', padding: '4px 24px'}} activeStep={campaign}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
        </div>
    );
}

export default AdsStepper;
