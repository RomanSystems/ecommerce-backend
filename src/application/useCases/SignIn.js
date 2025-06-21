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
    const expiresInHr = '1h';

    // If everything is valid, generate a token
    const token = this.tokenGenerator.generate({ id: user._id, roles: user.roles, expiresIn: expiresInHr });
    // Calcular la fecha y hora exacta de expiración del token
    // Get the current date and time
    const now = new Date();
    let expiresAt = new Date(now.getTime() + 60 * 60 * 1000); // 1 hora en milisegundos
    const expiresAtISO = expiresAt.toISOString();
    console.log('Token expires at:', expiresAtISO);

    // expiration time for the refresh token
    // In a real application, you would typically set this to a longer duration (e.g., '4h' for 4 hours)
    const expireRefreshInHr = '4h';
    // Generate a refresh token
    // Note: The refresh token is usually used to obtain a new access token without re-authenticating
    // This is a simplified example; in a real application, you would want to store the refresh token securely
    // and implement a mechanism to handle token expiration and revocation.
    const refreshToken = this.tokenGenerator.generateRefresh({ id: user._id, roles: user.roles, expiresIn: expireRefreshInHr });
    // Calcular la fecha y hora exacta de expiración del refresh token
    // Get the current date and time
    expiresAt = new Date(now.getTime() + 60 * 60 * 4000); // 4 horas en milisegundos
    const expiresAtISOR = expiresAt.toISOString();
    console.log('Refresh token expires at:', expiresAtISOR);
    // Return user data and token
    return { user, token, expiresIn: expiresInHr, refreshToken, expireRefreshIn: expireRefreshInHr, expiresAt: expiresAtISO, expiresAtRefresh: expiresAtISOR };
  }
}

module.exports = SignIn;