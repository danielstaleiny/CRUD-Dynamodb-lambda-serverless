import AWS from "aws-sdk";
import { done, fail } from "./util/response";
// import Crud from "./crud/index";

const get = async event => {
  return await { msg: "works" };
};

const db = new AWS.DynamoDB.DocumentClient();

// handler :: Promise -> Promise
const handler = fn => async (event, ctx, callback) => {
  ctx.callbackWaitsForEmptyEventLoop = false;
  try {
    await fn(event).then(json => callback(null, done(json)));
  } catch (err) {
    console.error(err);
    callback(null, fail({ error: err }));
  }
};

// read :: (Object, Object, Function) -> Promise
export const read = handler(get);
