import { Box } from '@mui/material';

const UserImage = ({ image, size = '60px' }) => {
    return (<Box width={size} height={size}>
        <img
            style={{ objectFit: 'cover', borderRadius: '50%' }}
            width={size}
            height={size}
            alt='user'
            src={image.isValid ? `http://localhost:3001/assets/${image}` : 'https://via.placeholder.com/100'}
        />
    </Box>);
};

export default UserImage;