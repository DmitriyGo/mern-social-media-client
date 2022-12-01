import React, { useState } from 'react';
import {
    Box,
    IconButton,
    InputBase,
    Typography,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import {
    Search,
    Menu,
    Close,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import FlexBetween from '../../components/FlexBetween';
import NavbarFormControl from './navbarFormControl';

const Navbar = ({}) => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);

    const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery('(min-width: 1050px)');

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const background = theme.palette.background.default;
    const alt = theme.palette.background.alt;
    const primaryLight = theme.palette.primary.light;

    theme.transitions.create('backgroundColor', { duration: 500 });
    return (

        <FlexBetween padding='1rem 6%' bgcolor={alt}>
            <FlexBetween gap='1.75rem'>
                <Typography
                    fontWeight='bold'
                    fontSize='clamp(1rem, 2rem, 2.25rem)'
                    color='primary'
                    onClick={() => navigate('/home')}
                    sx={{
                        '&:hover': {
                            color: primaryLight,
                            cursor: 'pointer',
                        },
                    }}
                >
                    Social Media
                </Typography>
                {isNonMobileScreens && (
                    <FlexBetween
                        bgcolor={neutralLight}
                        borderRadius='9px'
                        gap='3rem'
                        padding='0.1rem 1.5rem'
                    >
                        <InputBase placeholder='Search...' />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                )}
            </FlexBetween>

            {/* DESKTOP NAV */}
            {isNonMobileScreens ? (
                <NavbarFormControl isMobile={false} />
            ) : (
                <IconButton
                    onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                >
                    <Menu />
                </IconButton>
            )}

            {/* MOBILE NAV */}
            {!isNonMobileScreens && isMobileMenuToggled && (
                <Box
                    position='fixed'
                    right='0'
                    bottom='0'
                    height='100%'
                    zIndex='10'
                    maxWidth='500px'
                    minWidth='300px'
                    bgcolor={background}
                >
                    {/* CLOSE ICON */}
                    <Box display='flex' justifyContent='flex-end' p='1rem'>
                        <IconButton
                            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                        >
                            <Close />
                        </IconButton>
                    </Box>

                    {/* MENU ITEMS */}
                    <NavbarFormControl isMobile={true} />
                </Box>
            )}
        </FlexBetween>
    );
};

export default Navbar;