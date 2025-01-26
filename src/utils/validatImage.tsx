// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateImageUrl = (_: any, value: string) => {
  if (!value) {
    return Promise.reject(new Error("Please provide a URL."));
  }

  try {
    new URL(value);
  } catch {
    return Promise.reject(new Error("Please provide a valid URL."));
  }

  return Promise.resolve();
};
