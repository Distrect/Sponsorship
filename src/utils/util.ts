//Şuna bir el at
const oddEvenIterator = (arr: string[], even: boolean = false) =>
  arr.reduce((acc, val, i) => {
    if (!even && i % 2 === 0) return acc;
    if (even && !(i % 2 === 0)) return acc;

    return acc + parseInt(val);
  }, 0);

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

export const checkIdentityNo = (idNumber: string) => {
  if (!parseInt(idNumber) || idNumber.length < 11 || idNumber[0] === '0')
    return false;

  const tenthDigit = parseInt(idNumber[9]);
  const lastDigit = parseInt(idNumber.at(-1));
  const odds = oddEvenIterator(idNumber.split(''), true) * 7;
  const evens = oddEvenIterator(idNumber.split(''), false);
  const firstTen = idNumber
    .split('')
    .reduce(
      (acc, val, i, arr) => (i !== arr.length - 1 ? acc + parseInt(val) : acc),
      0,
    );
  if ((odds - evens) % 10 !== tenthDigit) return false;
  if (firstTen % 10 !== lastDigit) return false;

  return true;
};
