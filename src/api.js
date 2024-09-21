import axios from "axios";
import { LANGUAGE_VERSIONS } from "./Constants";

// const API = axios.create({
//   baseURL: "https://emkc.org/api/v2/piston",
// });

//https://cors-anywhere.herokuapp.com/

export const executeCode = async (selectedLanguage, sourceCode) => {
  const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
    language: selectedLanguage,
    version: LANGUAGE_VERSIONS[selectedLanguage],
    files: [
      {
        content: sourceCode,
      },
    ],
  });
  return response.data;
};

// clientId : eeb22731349dd5f002d875416aa5bf54
//client secret: 21baf4186d32843619577115ece6d0f221e29b11edd609e401b4e0ee13355238
