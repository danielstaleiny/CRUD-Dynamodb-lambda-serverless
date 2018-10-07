import { done, fail } from './util/response'
import * as App from './src/index'

// handler :: (Promise, ?code) -> Promise
const handler = (fn, code) => (event, ctx, callback) => {
    ctx.callbackWaitsForEmptyEventLoop = false
    fn(event)
        .then(json => callback(null, done(json, code)))
        .catch(err => {
            console.error(err)
            callback(null, fail({ error: err }))
        })
}

// create :: (Object, Object, Function) -> Promise
export const create = handler(App.createnew, 201)

// read :: (Object, Object, Function) -> Promise
export const read = handler(App.read)

// list :: (Object, Object, Function) -> Promise
export const list = handler(App.list)

// update :: (Object, Object, Function) -> Promise
export const update = handler(App.update)

// remove :: (Object, Object, Function) -> Promise
export const remove = handler(App.remove)
