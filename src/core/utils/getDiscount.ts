export const getDiscount = (category: string, subtotal: number) => {
  const isJewerly = ['joyas', 'joyeria'].includes(category);
  if (subtotal >= 50 && subtotal < 100) {
    return isJewerly ? 0.25 : 0.15;
  } else if (subtotal >= 100 && subtotal < 300) {
    return isJewerly ? 0.35 : 0.25;
  } else if (subtotal >= 300) {
    return isJewerly ? 0.5 : 0.35;
  } else {
    return 0;
  }
};
