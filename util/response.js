// response :: Int -> Object -> Object
const response = code => json => {
  return {
    statusCode: code,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(json)
  };
};

// done :: (json, ?code) -> Object
export const done = (json, code = 200) => response(code)(json);
// fail :: (json, ?code) -> Object
export const fail = (json, code = 500) => response(code)(json);
