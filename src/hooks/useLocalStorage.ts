export function useLocalStorage(key: string) {
  const getLocalStorage = () => {
    const storage = JSON.parse(localStorage.getItem(key) as string);
    return storage;
  };

  const setLocalStorage = (value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const removeLocalStorage = () => {
    localStorage.removeItem(key);
  };

  return {
    getLocalStorage,
    setLocalStorage,
    removeLocalStorage,
  };
}
