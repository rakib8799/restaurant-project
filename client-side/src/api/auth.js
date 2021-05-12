import axios from 'axios';
// eslint-disable-next-line import/prefer-default-export
export const authSignUp = async (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const response = await axios.post('/api/auth/signUp', data, config);
    return response;
};
