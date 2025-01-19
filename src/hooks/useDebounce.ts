export function useDebounce(delay: number) {
  return (callback: Function) => {
    let timeout: number | undefined;

    return (...args: any) => {
      clearTimeout(timeout);

      timeout = window.setTimeout(() => {
        callback(...args);
      }, delay);
    };
  };
}
