import React, { FC } from 'react';
import { Typography, useTheme } from '@mui/material';
import WidgetWrapper from '../../components/WidgetWrapper';
import FlexBetween from '../../components/FlexBetween';

interface AdvertWidgetProps {
}

type Props = AdvertWidgetProps;

const AdvertWidget: FC<Props> = ({}) => {

    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    return (
        <WidgetWrapper>
            <FlexBetween>
                <Typography
                    color={dark}
                    variant='h5'
                    fontWeight='500'
                >
                    Sponsored
                </Typography>
                <Typography
                    color={medium}
                >
                    Creat Ad
                </Typography>
            </FlexBetween>
            <img
                width='100%'
                height='auto'
                src='https://via.placeholder.com/150x100'
                alt='advert'
                style={{
                    borderRadius: '0.75rem',
                    margin: '0.75rem 0',
                }}
            />
            <FlexBetween>
                <Typography color={main}>This could be your ad</Typography>
            </FlexBetween>
            <Typography
                color={medium}
                m='0.5rem 0'
            >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce massa felis, blandit quis est vel, luctus dignissim neque. Mauris et fermentum eros.
            </Typography>
        </WidgetWrapper>
    );
};

export default AdvertWidget;