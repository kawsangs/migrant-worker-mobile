export const titleCase = function(str) {
  return str.replace(/\b(\w)/g, k => k.toUpperCase());
};
