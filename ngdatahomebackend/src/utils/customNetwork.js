
const axios = require("axios");

const fwave = "https://api.flutterwave.com/";
const vtpassUrl = "https://vtpass.com/api/";
const datahouse = "https://www.datahouse.com.ng/api/data";
const ogdamsUrl = "https://simhosting.ogdams.ng/api/v1/";
const ogdamsAirtimeUrl = "https://automation.airtimetocash.com/api/v1/";
const bello = "https://bellodigitalworld.ng/api/v1/";
const credo = "https://api.public.credodemo.com/";
const monify = "https://api.monnify.com/";
const arrahuz = 'https://alrahuzdata.com.ng/api/data'
const arrahuzairtime = 'https://alrahuzdata.com.ng/api/topup'
// const monify = "https://sandbox.monnify.com/";

// ... [other code remains the same]

module.exports = async ({
  method,
  path,
  requestBody,
  target,
  params,
  headers,
}) => {
  if (!method || !path) {
    throw new Error("A required parameter is missing. Please provide method or path.");
  }

  console.log("MAKING NETWORK CALL:");

  // Define your base URLs here or ensure they are imported or set in your environment
  const returnBaseUrl = (target) => {
    switch (target) {
      case "vtpass":
        return vtpassUrl;
        case'arrahuzair':
        return arrahuzairtime;
      case "ogdams":
        return ogdamsUrl;
      case "ogdams_airtime":
        return ogdamsAirtimeUrl;
      case "data_house":
        return datahouse;
      case "bello":
        return bello;
      case "arrahuz":
        return arrahuz;
      case "credo":
        return credo;
      case "monify":
        return monify;
      default:
        return fwave;
    }
  };

  const config = {
    method,
    url: `${returnBaseUrl(target)}${path}`,
    params: params,
    headers: headers,
    data: requestBody,
    timeout: 10000, // 10 seconds timeout
  };

  try {
    const response = await axios(config);
    console.log(JSON.stringify(response.data));

    console.log(response)
    return response;
  } catch (error) {
    console.error(`Error in customNetwork call to ${target}: ${error.message}`);
    if (error.response) {

      console.log(error.response) 
           const errorMessage = error.response.data.message || 'Bad Request';
            throw new Error(errorMessage);   
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error", error.message);
    }
  }

}





// module.exports = async ({
//   method,
//   path,
//   requestBody,
//   target,
//   params,
//   headers,
// }) => {
//   if (!method || !path) {
//     throw new Error(
//       "A required parameter is missing. Please provide method or path"
//     );
//   }

//   console.log("MAKING NETWORK CALL: ");
  
//   const returnBaseUrl = (target) => {
//     switch (target) {
//       case "vtpass":
//         return vtpassUrl;
//       case "ogdams":
//         return ogdamsUrl;
//       case "ogdams_airtime":
//         return ogdamsAirtimeUrl;
//       case "data_house":
//         return datahouse;
//       case "bello":
//         return bello;
//         case " arrahuz":
//           return  arrahuz;
//       case "credo":
//         return credo;
//       case "monify":
//         return monify;
//       default:
//         return fwave;
//     }
//   };

//   console.log(requestBody);
//   console.log(`${returnBaseUrl(target)}${path}`);

//   const config = {
//     method,
//     url: `${returnBaseUrl(target)}${path}`,
//     params: params,
//     headers: headers,
//     data: requestBody,
//   };

//   try {
//     const response = await axios(config);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };


