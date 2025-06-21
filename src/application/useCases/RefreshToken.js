const e = require("express");

class RefreshToken {
  constructor(tokenGenerator) {
    this.tokenGenerator = tokenGenerator;
  }

  async execute(refreshToken) {
    // Validate the refresh token
    // In a real application, you would verify the refresh token and check if it is still valid
    // For simplicity, we assume the refresh token is valid if it exists
    if (!refreshToken) throw new Error('Refresh token is required');

    // Decode the refresh token to get user ID and roles
    const decoded = this.tokenGenerator.verifyRefresh(refreshToken);
    console.log('Decoded refresh token:', decoded);
    if (!decoded) throw new Error('Invalid refresh token');

    //expiration time for the token
    // In a real application, you would typically set this to a reasonable duration (e.g
    // '1h' for 1 hour)
    // For this example, we will use '1h' as the expiration time
    // This is the time after which the token will no longer be valid
    const expiresInHr = '1h';
    // Generate a new access token
    const newToken = this.tokenGenerator.generate({ id: decoded.id, roles: decoded.roles, expiresIn: expiresInHr });

    // Calcular la fecha y hora exacta de expiración del token
    const now = new Date();
    let expiresAt = new Date(now.getTime() + 60 * 60 * 1000); // 1 hora en milisegundos
    const expiresAtISO = expiresAt.toISOString();
    console.log('Token expires at:', expiresAtISO);
    // Return the new token and its expiration time
    // Generate a new refresh token
    const expireRefreshInHr = '4h';

    expiresAt = new Date(now.getTime() + 60 * 60 * 4000); // 4 horas en milisegundos
    const expiresAtISOR = expiresAt.toISOString();
    console.log('Refresh token expires at:', expiresAtISOR);
    
    const newRefreshToken = this.tokenGenerator.generateRefresh({ id: decoded.id, roles: decoded.roles, expiresIn: expireRefreshInHr });
    return { newToken: newToken, expiresIn: expiresInHr, expiresAt: expiresAtISO, newRefreshToken: newRefreshToken, expireRefreshIn: expireRefreshInHr, expiresAtRefresh: expiresAtISOR };
  }
}

module.exports = RefreshToken;