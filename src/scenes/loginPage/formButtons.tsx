import React, { FC } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';

interface FormButtonsProps {
    formType: string;

    setPageType(type: string): void;

    resetForm(): void;
}

type Props = FormButtonsProps;

const FormButtons: FC<Props> = ({ formType, setPageType, resetForm }) => {
    const { palette } = useTheme();

    return (
        <Box>
            <Button
                fullWidth
                type='submit'
                sx={{
                    m: '2rem 0',
                    p: '1rem',
                    backgroundColor: palette.primary.main,
                    color: palette.background.alt,
                    '&:hover': { color: palette.primary.main },
                }}
            >
                {formType === 'login' ? 'LOGIN' : 'REGISTER'}
            </Button>
            <Typography
                onClick={() => {
                    setPageType(formType === 'login' ? 'register' : 'login');
                    resetForm();
                }}
                sx={{
                    textDecoration: 'underline',
                    color: palette.primary.main,
                    '&:hover': {
                        cursor: 'pointer',
                        color: palette.primary.light,
                    },
                }}
            >
                {formType === 'login'
                    ? 'Don\'t have an account? Sign Up here.'
                    : 'Already have an account? Login here.'}
            </Typography>
        </Box>
    );
};

export default FormButtons;