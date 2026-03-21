export const getToken = () => {
    const token = localStorage.getItem('token');
    return typeof token === 'string' ? token.trim() : '';
};

export const isValidToken = (tokenValue) => {
    const token = typeof tokenValue === 'string' ? tokenValue.trim() : '';
    return !!token && token !== 'undefined' && token !== 'null';
};

export const hasValidToken = () => {
    return isValidToken(getToken());
};

export const clearAuth = () => {
    localStorage.removeItem('token');
};
