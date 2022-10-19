const developmentURLPrefix = "http://127.0.0.1:5000";
const productionURLPrefix = "";
export const urlPrefix =
  process.env.NODE_ENV === "development"
    ? developmentURLPrefix
    : productionURLPrefix;
