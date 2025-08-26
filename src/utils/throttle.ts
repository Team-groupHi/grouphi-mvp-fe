export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  let lastCall = 0;

  return function (...args: Parameters<T>): ReturnType<T> | undefined {
    const now = Date.now();

    if (now - lastCall >= delay) {
      lastCall = now;
      return func(...args) as ReturnType<T>;
    }
  };
}
