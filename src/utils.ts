export const validRgb = (color: string) => {
  return /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/.test(color);
};

export const validRgba = (color: string) => {
  return /^rgba\(\s?\d{1,3}\,\s?\d{1,3}\,\s?\d{1,3}(\,\s?(\d|\d\.\d+))?\s?\)$/.test(
    color
  );
};
