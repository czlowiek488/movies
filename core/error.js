exports.error = ({ message, code = 500 }) => {
  const err = Error(message);
  err.code = code;
  return err;
};
