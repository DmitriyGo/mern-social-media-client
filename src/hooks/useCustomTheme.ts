import { useAppSelector } from '../store/hooks';
import { useMemo } from 'react';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from '../theme';

declare module '@mui/material/styles' {
    interface Theme {
        mode: string;
    }

    interface ThemeOptions {
        mode: string;
    }

    interface Palette {
        neutral: {
            dark: string
            main: string,
            mediumMain: string,
            medium: string,
            light: string
        },
    }

    interface PaletteOptions {
        neutral: {
            dark: string
            main: string,
            mediumMain: string,
            medium: string,
            light: string
        },
    }

    interface TypeBackground {
        default: string,
        alt: string,
    }
}

export const useProvideCustomTheme = () => {
    const mode = useAppSelector(state => state.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    return theme;
};