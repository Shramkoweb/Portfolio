// pg 8 already treats prefer/require/verify-ca as verify-full, but warns on every
// cold start that pg 9 will switch them to libpq semantics, where `require`
// skips certificate checks. Neon's default URL uses `sslmode=require`, so pin the
// current behaviour explicitly. `uselibpqcompat=true` means the caller opted
// into the libpq meaning, so leave that URL alone.
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
