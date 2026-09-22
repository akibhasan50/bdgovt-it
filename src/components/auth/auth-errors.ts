export const AUTH_ERROR_KEYS = {
  required: "auth.errorRequired",
  email: "auth.errorEmail",
  password: "auth.errorPassword",
  match: "auth.errorMatch",
  exists: "auth.errorExists",
  credentials: "auth.errorCredentials",
} as const;

export type AuthErrorCode = keyof typeof AUTH_ERROR_KEYS;

export function authErrorKey(code: string | undefined): string {
  if (code && code in AUTH_ERROR_KEYS) {
    return AUTH_ERROR_KEYS[code as AuthErrorCode];
  }
  return AUTH_ERROR_KEYS.credentials;
}
