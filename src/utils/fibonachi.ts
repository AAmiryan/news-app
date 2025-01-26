// eslint-disable-next-line @typescript-eslint/no-explicit-any
const memoize = <T extends (...args: any[]) => any>(fn: T) => {
  const cache = new Map<string, ReturnType<T>>();

  return function (...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>;
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

const getNextFibonacci = (num: number): number => {
  if (num <= 2) return 1;
  let prev = 1,
    curr = 1;

  for (let i = 3; i <= num; i++) {
    [prev, curr] = [curr, prev + curr];
  }

  return curr;
};

const isPrime = (num: number): boolean => {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;

  const limit = Math.sqrt(num);
  for (let i = 3; i <= limit; i += 2) {
    if (num % i === 0) return false;
  }

  return true;
};

export const memorizedFibonacci = memoize(getNextFibonacci);
export const memorizedIsPrime = memoize(isPrime);
