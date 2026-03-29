export const getToken = () => {
    const token = localStorage.getItem('token');
    const legacyToken = localStorage.getItem('access_token');
    const resolvedToken = typeof token === 'string' && token.trim()
        ? token
        : legacyToken;

    if (!token && typeof legacyToken === 'string' && legacyToken.trim()) {
        localStorage.setItem('token', legacyToken.trim());
        localStorage.removeItem('access_token');
    }

    return typeof resolvedToken === 'string' ? resolvedToken.trim() : '';
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
    localStorage.removeItem('access_token');
};
