import React, { useState } from "react";
import { postAPI } from '../../services/apiService';
import { toast } from 'react-toastify';
import {
    CardHeader,
    Grid,
    Button,
    Box,
} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import StyledCard from "../StyledCard/StyledCard";
import { z } from "zod";
import dayjs from "dayjs";

const schema = z.object({
    bookingStartTime: z.date({
        required_error: "Start date is required",
        invalid_type_error: "Invalid start date",
    }),
    bookingEndTime: z.date({
        required_error: "End date is required",
        invalid_type_error: "Invalid end date",
    }),
}).refine((data) => {
    return data.bookingEndTime >= data.bookingStartTime;
}, {
    message: "End date must be after or same as start date",
    path: ["bookingEndTime"],
});

const FormStep5 = ({setStep,vehicleId,firstName,lastName}) => {
    const [formValues, setFormValues] = useState({
        bookingStartTime: null,
        bookingEndTime: null,
    });

    const [errors, setErrors] = useState({});

    const validateField = (field, value) => {
        try {
            schema.parse({
                ...formValues,
                [field]: value,
             
                bookingStartTime: (field === "bookingStartTime" ? value : formValues.bookingStartTime)?.toDate?.(),
                bookingEndTime: (field === "bookingEndTime" ? value : formValues.bookingEndTime)?.toDate?.(),
            });
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        } catch (err) {
            if (err.errors) {
                const fieldError = err.errors.find(e => e.path[0] === field);
                setErrors((prev) => ({
                    ...prev,
                    [field]: fieldError ? fieldError.message : undefined,
                }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            bookingStartTime: formValues.bookingStartTime?.toDate?.(),
            bookingEndTime: formValues.bookingEndTime?.toDate?.(),
            vehicleId,
            firstName,lastName
        };

        const result = schema.safeParse(payload);

        if (!result.success) {
            const formErrors = {};
            result.error.errors.forEach((err) => {
                formErrors[err.path[0]] = err.message;
            });
            setErrors(formErrors);
        } else {
            setErrors({});
            
            try {
                const response = await postAPI("booking", payload);
                toast.success("Booking successful!");
                setStep(1)
               
            } catch (err) {
                toast.error(err?.response?.data?.message);
            }
        }
    };

    return (
        <StyledCard>
            <CardHeader title="Please select a start and end date to proceed with your booking." />
            <form onSubmit={handleSubmit} noValidate>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 1 }}>
                    <DatePicker
                        label="Start Date"
                        value={formValues.bookingStartTime}
                        onChange={(newValue) => {
                            setFormValues((prev) => ({
                                ...prev,
                                bookingStartTime: newValue,
                            }));

                            // Clear bookingEndTime if invalid
                            if (formValues.bookingEndTime && newValue && dayjs(formValues.bookingEndTime).isBefore(newValue)) {
                                setFormValues((prev) => ({ ...prev, bookingEndTime: null }));
                            }

                            validateField("bookingStartTime", newValue);
                        }}
                        maxDate={formValues.bookingEndTime}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                error: !!errors.bookingStartTime,
                                helperText: errors.bookingStartTime,
                            },
                        }}
                    />

                    <DatePicker
                        label="End Date"
                        value={formValues.bookingEndTime}
                        onChange={(newValue) => {
                            setFormValues((prev) => ({
                                ...prev,
                                bookingEndTime: newValue,
                            }));

                            validateField("bookingEndTime", newValue);
                        }}
                        minDate={formValues.bookingStartTime}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                error: !!errors.bookingEndTime,
                                helperText: errors.bookingEndTime,
                            },
                        }}
                    />
                </Box>

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

export default FormStep5;
