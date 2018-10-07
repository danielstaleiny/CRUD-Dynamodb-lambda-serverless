import { db } from '../database'
import generate from 'nanoid/generate'

const CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

// parseBody :: Object -> Object
const parseBody = ({ body }) => JSON.parse(body)

// genId :: -> String
const genId = () => generate(CHARS, 8)

// read :: Object -> Promise
export const read = async event => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: event.pathParameters.id
        }
    }
    return await db
        .get(params)
        .promise()
        .then(data => data.Item)
}

// createnew :: Object -> Promise
export const createnew = async event => {
    const timestamp = new Date().getTime()
    const body = parseBody(event)

    const newItem = {
        id: genId(),
        text: body.text,
        checked: false,
        createdAt: timestamp,
        updatedAt: timestamp
    }

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: newItem
    }
    return await db
        .put(params)
        .promise()
        .then(_ => newItem)
}

// list :: Object -> Promise
export const list = async event => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE
    }
    return await db.scan(params).promise()
}

// update :: Object -> Promise
export const update = async event => {
    const table = process.env.DYNAMODB_TABLE

    const timestamp = new Date().getTime()
    const body = parseBody(event)

    const params = {
        TableName: table,
        Key: {
            id: event.pathParameters.id
        }
    }
    const data = await db.get(params).promise()
    const newItem = {
        ...data.Item, // old values will be overwritten
        text: body.text,
        checked: body.checked,
        updatedAt: timestamp
    }
    const updateParams = {
        TableName: table,
        Item: newItem
    }
    return await db
        .put(updateParams)
        .promise()
        .then(_ => newItem)
}

// remove :: Object -> Promise
export const remove = async event => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: event.pathParameters.id
        }
    }
    return await db.delete(params).promise()
}
