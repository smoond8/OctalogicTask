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
    model: z.string()
    .refine((val) => val !== "", {
      message: "Please select an option",
    }),
});


const FormStep4 = ({ setStep,typeId,noOfWheels,setVehicleId }) => {
    const [formValues, setFormValues] = useState({
        model: ""
    });

    const [vehicleList, setVehicleList] = useState([]);
    const [type, setType] = useState();
 
    useEffect(() => {
        if (noOfWheels == 2) {
            setType('bike');
        } else if (noOfWheels == 4) {
            setType('car');
        }
    }, [noOfWheels]);

        useEffect(() => {
            const fetchVehicleTypes = async () => {
                if (!type || !typeId) return;
              try {
               
                const res = await getAPI(`vehicles?type=${type}&typeId=${typeId}`);
                setVehicleList(res?.data?.data);
              } catch (err) {
                console.error("Vehicle API error:", err);
              }
            };
          
            fetchVehicleTypes();
          }, [type,typeId]);

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
            setVehicleId(formValues.model)
        }
    };

    return (
        <StyledCard>
            <CardHeader title="Please Select A Specific Model" />
            <form onSubmit={handleSubmit} noValidate>
                <FormControl
                    component="fieldset"
                    error={!!errors.model}
                    fullWidth
                >
                    <RadioGroup
                        aria-labelledby="wheels-radio-buttons-group-label"
                        name="model"
                        value={formValues.model}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >
                        {
                            vehicleList?.map((item)=>(
                                <FormControlLabel value={item.id} control={<Radio />} label={item.name} key={item.id} />
                            ))
                        }
                        {/* <FormControlLabel value="4" control={<Radio />} label="4" /> */}
                    </RadioGroup>
                    {errors.model && (
                        <FormHelperText>{errors.model}</FormHelperText>
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

export default FormStep4;
