const { base64encode } = require("nodejs-base64");
const customNetwork = require("../customNetwork");

module.exports = async () => {
  try {
    const { data } = await customNetwork({
      method: "POST",
      path: "api/v1/auth/login",
      target: "monify",
      headers: {
        Authorization: `Bearer ${base64encode(process.env.MONNIFY_SECRET)}`,
      },
    });
    const token = data?.responseBody?.accessToken;
    return token;
  } catch (error) {
    console.log(error);
  }
};
