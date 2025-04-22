import React, { useState } from "react";
import {
    Grid,
    Button,
    CardHeader,
    TextField,
} from "@mui/material";
import StyledCard from "../StyledCard/StyledCard";
import { z } from "zod";

const schema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
  });

const FormStep1 = ({ setStep,setFirstName,setLastName }) => {
    const [formValues, setFormValues] = useState({
        firstName: "",
        lastName: "",
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
        setFirstName(formValues.firstName)
        setLastName(formValues.lastName)
        }
      };

    return (
        <StyledCard>
            <CardHeader title="First, what's your name? " />
            <form onSubmit={handleSubmit} noValidate>
                <Grid container spacing={4}>
                    <Grid item size={12}>
                        <TextField
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            name="firstName"
                            value={formValues.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!errors.firstName}
                            helperText={errors.firstName}
                        />
                    </Grid>
                    <Grid item size={12}>
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            name="lastName"
                            value={formValues.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!errors.lastName}
                            helperText={errors.lastName}
                        />
                    </Grid>
                    <Grid item size={12}>
                        <Button variant="contained" color="primary" type="submit" fullWidth >
                            NEXT
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </StyledCard>
    );
};

export default FormStep1;
