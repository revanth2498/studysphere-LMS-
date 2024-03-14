const Success = (data, additionalData = null) => {
  return { Status: "S", Message: data, AdditionalData: additionalData };
};
const Error = (data) => {
  return { Status: "B", Message: data };
};

const Info = (data) => {
  return { Status: "I", Message: data };
};

const Warning = (data) => {
  return { Status: "W", Message: data };
};
module.exports = {
  Success,
  Error,
  Info,
  Warning,
};
