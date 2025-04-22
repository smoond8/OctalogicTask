import { useState } from "react";
import FormStep1 from "../FormStep1/FormStep1";
import { Grid } from "@mui/material";
import FormStep2 from "../FormStep2/FormStep2";
import FormStep3 from "../FormStep3/FormStep3";
import FormStep4 from "../FormStep4/FormStep4";
import FormStep5 from "../FormStep5/FormStep5";

const MultiStepForm = () => {
    const [step, setStep] = useState(1);
    const [noOfWheels, setNoOfWheels] = useState('');
    const [typeId, setTypeId] = useState('');
    const [vehicleId, setVehicleId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    return (
        <Grid container spacing={1} className="h-dvh !w-full flex justify-center items-center" >
            <Grid item md={6}>
                {
                    step === 1 ? <FormStep1 setStep={setStep} setFirstName={setFirstName} setLastName={setLastName} /> : null
                }

                {
                    step === 2 ? <FormStep2 setStep={setStep} setNoOfWheels={setNoOfWheels} /> : null
                }
                {
                    step === 3 ? <FormStep3 setStep={setStep} noOfWheels={noOfWheels} setTypeId={setTypeId} /> : null
                }
                {

                    step === 4 ? <FormStep4 setStep={setStep} typeId={typeId} noOfWheels={noOfWheels} setVehicleId={setVehicleId} /> : null
                }
                {
                    step === 5 ? <FormStep5 setStep={setStep} vehicleId={vehicleId} firstName={firstName} lastName={lastName} /> : null
                }
            </Grid>
        </Grid>
    );
};

export default MultiStepForm;
