import React, { useCallback, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { MuiOtpInput } from 'mui-one-time-password-input';
import {
    TextField,
    Button,
    Box,
    InputAdornment,
    IconButton,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    FormHelperText,
    Typography
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { red } from '@mui/material/colors';

const TextInput = React.memo(({ field, register, error, showPassword, togglePassword }) => (
    <TextField
        fullWidth
        label={field.label}
        placeholder={field.placeholder}
        {...register(field.name, field.validation)}
        error={!!error}
        helperText={error?.message}
        sx={{ mb: 2 }}
        type={field.type === 'password' ? (showPassword ? 'text' : 'password') : field.type}
        InputProps={field.type === 'password' ? {
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton onClick={togglePassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
            )
        } : undefined}
        inputProps={{
            maxLength: field.maxLength,
            ...field.inputProps
        }}
        multiline={field.type === 'textarea'}
        rows={field.type === 'textarea' ? (field.rows || 4) : undefined}
    />
));


const SelectInput = React.memo(({ field, register, error }) => (
    <FormControl fullWidth error={!!error} sx={{ mb: 2 }}>
        <InputLabel>{field.label}</InputLabel>
        <Select
            defaultValue=""
            label={field.label}
            {...register(field.name, field.validation)}
        >
            {field.options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </Select>
        {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
));

export const ReusableFormComponent = ({
    fields = [],
    onSubmit,
    submitButtonText = "Submit",
    disabled = false
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control
    } = useForm();

    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = useCallback(() => setShowPassword(prev => !prev));

    const renderField = (field) => {
        const error = errors[field.name];
        console.log(field, "field");

        switch (field.type) {
            case 'select':
                return <SelectInput field={field} register={register} error={error} />;

            case 'otp':
                return (
                    <Box sx={{ mb: 2 }}>
                        {field.label && (
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                {field.label}
                            </Typography>
                        )}

                        <Controller
                            name={field.name}
                            control={control}
                            rules={field.validation}
                            render={({ field: controllerField }) => (
                                <MuiOtpInput
                                    value={controllerField.value || ''}
                                    onChange={controllerField.onChange}
                                    length={field.maxLength || 6}
                                    sx={{
                                        gap: 1,
                                        '& .MuiOutlinedInput-root': {
                                            width: '40px',
                                            height: '40px',
                                            margin: '0 4px'
                                        }
                                    }}
                                />
                            )}
                        />

                        {error && (
                            <FormHelperText error sx={{ textAlign: 'center', mt: 1 }}>
                                {error.message}
                            </FormHelperText>
                        )}
                    </Box>
                );

            default:
                return (
                    <TextInput
                        field={field}
                        register={register}
                        error={error}
                        showPassword={showPassword}
                        togglePassword={togglePassword}
                    />
                );
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            {fields.map((field) => (
                <div key={field.name}>
                    {renderField(field)}
                </div>
            ))}
            <Button

                type="submit"
                variant="contained"
                fullWidth
                sx={{
                    mt: 1,
                    py: 1.5,
                    color: '#EE4B2B',
                    borderColor: '#EE4B2B',
                    backgroundColor: '#fff',
                    border: '2px solid',
                    borderColor: '#EE4B2B',
                }}
                disabled={disabled}
            >
                {submitButtonText}
            </Button>
        </Box>
    );
};