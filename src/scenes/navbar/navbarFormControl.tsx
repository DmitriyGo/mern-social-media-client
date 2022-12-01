import React, { FC } from 'react';
import {
    FormControl,
    IconButton,
    InputBase,
    MenuItem,
    Select,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { setLogout, setMode } from '../../store';
import { DarkMode, Help, LightMode, Message, Notifications } from '@mui/icons-material';
import FlexBetween from '../../components/FlexBetween';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';

interface NavbarFormControlProps {
    isMobile: boolean;
}

type Props = NavbarFormControlProps;

const NavbarFormControl: FC<Props> = ({ isMobile }) => {

    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user);

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;

    // const fullName = `${user?.firstName} ${user?.lastName}`;
    const fullName = 'Dimas';

    return (
        <FlexBetween
            display={isMobile ? 'flex' : ''}
            flexDirection={isMobile ? 'column' : 'row'}
            justifyContent={isMobile ? 'center' : ''}
            alignItems={'isMobile' ? 'center' : 'baseline'}
            gap={isMobile ? '3rem' : '2rem'}
        >
            <IconButton
                onClick={() => dispatch(setMode())}
                sx={{ fontSize: '25px' }}
            >
                {theme.palette.mode === 'dark' ? (
                    <DarkMode sx={{ fontSize: '25px' }} />
                ) : (
                    <LightMode sx={{ color: dark, fontSize: '25px' }} />
                )}
            </IconButton>
            <Message sx={{ fontSize: '25px' }} />
            <Notifications sx={{ fontSize: '25px' }} />
            <Help sx={{ fontSize: '25px' }} />
            <FormControl variant='standard' defaultValue={fullName}>
                <Select
                    value={fullName}
                    sx={{
                        backgroundColor: neutralLight,
                        width: '150px',
                        borderRadius: '0.25rem',
                        p: '0.25rem 1rem',
                        '& .MuiSvgIcon-root': {
                            pr: '0.25rem',
                            width: '3rem',
                        },
                        '& .MuiSelect-select:focus': {
                            backgroundColor: neutralLight,
                        },
                    }}
                    input={<InputBase />}
                >
                    <MenuItem value={fullName}>
                        <Typography>{fullName}</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => dispatch(setLogout())}>
                        Log Out
                    </MenuItem>
                </Select>
            </FormControl>
        </FlexBetween>
    );
};

export default NavbarFormControl;