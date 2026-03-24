export const saveStorage = (Key: string, value: any) => {
  localStorage.setItem(Key, JSON.stringify(value));
};

export const loadStorage = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const removeStorage = (key: string) => {
  localStorage.removeItem(key);
};
