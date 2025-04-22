import React, { useState } from "react";
import {
    CardHeader,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormHelperText,
    Grid,
    Button,
} from "@mui/material";
import StyledCard from "../StyledCard/StyledCard";
import { z } from "zod";

const schema = z.object({
    noOfWheels: z.string()
    .refine((val) => val !== "", {
      message: "Please select an option",
    }),
});

const FormStep2 = ({ setStep, setNoOfWheels }) => {
    const [formValues, setFormValues] = useState({
        noOfWheels: ""
    });
   

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedValues = { ...formValues, [name]: value };
        setFormValues(updatedValues);

        try {
            schema.pick({ [name]: true }).parse({ [name]: value });
            setErrors((prev) => ({ ...prev, [name]: "" }));
        } catch (error) {
            setErrors((prev) => ({
                ...prev,
                [name]: error.errors?.[0]?.message || "Invalid",
            }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        try {
            schema.pick({ [name]: true }).parse({ [name]: value });
            setErrors((prev) => ({ ...prev, [name]: "" }));
        } catch (error) {
            setErrors((prev) => ({
                ...prev,
                [name]: error.errors?.[0]?.message || "Invalid",
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = schema.safeParse(formValues);

        if (!result.success) {
            const formErrors = {};
            result.error.errors.forEach((err) => {
                formErrors[err.path[0]] = err.message;
            });
            setErrors(formErrors);
        } else {
            setErrors({});
            console.log({ formValues });
            setStep((prev) => prev + 1);
            setNoOfWheels(formValues.noOfWheels);
        }
    };

    return (
        <StyledCard>
            <CardHeader title="Select The Number Of Wheels" />
            <form onSubmit={handleSubmit} noValidate>
                <FormControl
                    component="fieldset"
                    error={!!errors.noOfWheels}
                    fullWidth
                >
                    <RadioGroup
                        aria-labelledby="wheels-radio-buttons-group-label"
                        name="noOfWheels"
                        value={formValues.noOfWheels}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >
                        <FormControlLabel value="2" control={<Radio />} label="2" />
                        <FormControlLabel value="4" control={<Radio />} label="4" />
                    </RadioGroup>
                    {errors.noOfWheels && (
                        <FormHelperText>{errors.noOfWheels}</FormHelperText>
                    )}
                </FormControl>

                <Grid item xs={12} sx={{ mt: 3 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                    >
                        NEXT
                    </Button>
                </Grid>
            </form>
        </StyledCard>
    );
};

export default FormStep2;
