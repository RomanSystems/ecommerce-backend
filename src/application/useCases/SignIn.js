class SignIn {
  constructor(userRepository, passwordHasher, tokenGenerator) {
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
    this.tokenGenerator = tokenGenerator;
  }

  async execute({ username, password }) {
    // Validate input
    const user = await this.userRepository.findByUsername(username);
    // If user not found, throw an error
    if (!user) throw new Error('User not found');
    // Compare the provided password with the stored hashed password
    const isValid = await this.passwordHasher.compare(password, user.password);
    // If password is invalid, throw an error
    if (!isValid) throw new Error('Invalid password');

    
    //expiration time for the token
    // In a real application, you would typically set this to a reasonable duration (e.g
    // '1h' for 1 hour)
    // For this example, we will use '1h' as the expiration time
    // This is the time after which the token will no longer be valid
    const expiresIn = '1h';

    // If everything is valid, generate a token
    const token = this.tokenGenerator.generate({ id: user._id, roles: user.roles, expiresIn: expiresIn });

    // expiration time for the refresh token
    // In a real application, you would typically set this to a longer duration (e.g., '4h' for 4 hours)
    const expireRefreshIn = '4h';
    // Generate a refresh token
    // Note: The refresh token is usually used to obtain a new access token without re-authenticating
    // This is a simplified example; in a real application, you would want to store the refresh token securely
    // and implement a mechanism to handle token expiration and revocation.
    const refreshToken = this.tokenGenerator.generateRefresh({ id: user._id, roles: user.roles, expiresIn: expireRefreshIn });
    // Return user data and token
    return { user, token, expiresIn, refreshToken, expireRefreshIn };
  }

  async refreshToken(refreshToken) {
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

module.exports = SignIn;