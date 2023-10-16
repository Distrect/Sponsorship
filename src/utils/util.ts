export async function cryptor(
  value: string,
  mode: 'encrypt' | 'decrypt' = 'encrypt',
): Promise<string> {
  const jwt = await import('jsonwebtoken');
  const secretKey = process.env['SECRET_HASH_KEY'];

  if (mode === 'encrypt') {
    return jwt.sign(value, secretKey, {
      expiresIn: 150 * 365 * 24 * 60 * 60 * 1000,
    });
  }

  return jwt.verify(value, secretKey, { ignoreExpiration: true }) as string;
}
