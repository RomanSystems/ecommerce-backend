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
    const expiresIn = '1h';
    // Generate a new access token
    const newToken = this.tokenGenerator.generate({ id: decoded.id, roles: decoded.roles, expiresIn: expiresIn });
    // Generate a new refresh token
    const expireRefreshIn = '4h';
    const newRefreshToken = this.tokenGenerator.generateRefresh({ id: decoded.id, roles: decoded.roles, expiresIn: expireRefreshIn });
    return { newToken: newToken, expiresIn: expiresIn, newRefreshToken: newRefreshToken, expireRefreshIn: expireRefreshIn };
  }

}

module.exports = RefreshToken;