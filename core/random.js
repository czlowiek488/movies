exports.random = (min, max) =>
  Math.floor(min + Math.random() * (max + 1 - min));
