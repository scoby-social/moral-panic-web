export const unitsInputValidations = (quota: number) => {
  if (quota < 1) {
    return true;
  }

  return false;
};
