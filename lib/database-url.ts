// pg 8 treats these as verify-full but warns that pg 9 gives them libpq
// semantics, where `require` skips the certificate check.
const ALIASED_SSL_MODE = /([?&]sslmode=)(?:prefer|require|verify-ca)(?=&|#|$)/g;

export function pinSslMode(
  connectionString: string | undefined,
): string | undefined {
  if (
    !connectionString ||
    /[?&]uselibpqcompat=true(?=&|#|$)/.test(connectionString)
  ) {
    return connectionString;
  }
  return connectionString.replace(ALIASED_SSL_MODE, '$1verify-full');
}
