export function isTokenExpired(token: string): boolean {
  try {
    const payloadBase64 = token.split(".")[1];

    const payloadJson = atob(payloadBase64);

    const payload = JSON.parse(payloadJson);

    const expirationTime = payload.exp;

    if (!expirationTime) {
      return true;
    }

    const currentTime = Date.now() / 1000;

    return expirationTime < currentTime;
  } catch {
    return true;
  }
}