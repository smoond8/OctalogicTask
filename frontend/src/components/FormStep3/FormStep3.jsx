import React, { useState,useEffect } from "react";
import { getAPI } from '../../services/apiService';
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
    typeOfVehicle: z.string()
    .refine((val) => val !== "", {
      message: "Please select an option",
    }),
});



const FormStep3 = ({ setStep,noOfWheels,setTypeId }) => {
    const [formValues, setFormValues] = useState({
        typeOfVehicle: ""
    });
    const [vehicleTypes, setVehicleTypes] = useState([]);

   
    const [errors, setErrors] = useState({});


    useEffect(() => {
        const fetchVehicleTypes = async () => {
          if (!noOfWheels) return;
      
          try {
            const res = await getAPI(`vehicle-types?noOfWheels=${noOfWheels}`);
            setVehicleTypes(res?.data?.data);
          } catch (err) {
            console.error("Vehicle API error:", err);
          }
        };
      
        fetchVehicleTypes();
      }, [noOfWheels]);

   

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
            setStep((prev) => prev + 1);
            setTypeId(formValues?.typeOfVehicle);
        }
    };

    return (
        <StyledCard>
            <CardHeader title="Type of vehicle" />
            <form onSubmit={handleSubmit} noValidate>
                <FormControl
                    component="fieldset"
                    error={!!errors.typeOfVehicle}
                    fullWidth
                >
                    <RadioGroup
                        aria-labelledby="wheels-radio-buttons-group-label"
                        name="typeOfVehicle"
                        value={formValues.typeOfVehicle}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >
                        {
                            vehicleTypes?.map((item)=>(
                                <FormControlLabel value={item.id} control={<Radio />} label={item.name} key={item.id} />
                            ))
                        }
                        {/* <FormControlLabel value="4" control={<Radio />} label="4" /> */}
                    </RadioGroup>
                    {errors.typeOfVehicle && (
                        <FormHelperText>{errors.typeOfVehicle}</FormHelperText>
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

export default FormStep3;
