export const AuthUseCaseIdentifiers = {
  getCookieWithJwtUseCase: Symbol("getCookieWithJwtUseCase"),
  getCookieWithJwtRefreshUseCase: Symbol("getCookieWithJwtRefreshUseCase"),
  validateUserForLocalStrategyUseCase: Symbol(
    "validateUserForLocalStrategyUseCase",
  ),
  validateUserForJwtStrategyUseCase: Symbol(
    "validateUserForJwtStrategyUseCase",
  ),
  getUserIfRefreshTokenMatchesUseCase: Symbol(
    "getUserIfRefreshTokenMatchesUseCase",
  ),
  logoutUseCase: Symbol("logoutUseCase"),
};
