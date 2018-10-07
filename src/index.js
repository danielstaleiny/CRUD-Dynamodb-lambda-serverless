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
    return await db.get(params).promise()
}

// createnew :: Object -> Promise
export const createnew = async event => {
    const timestamp = new Date().getTime()
    const data = parseBody(event)

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            id: genId(),
            text: data.text,
            checked: false,
            createdAt: timestamp,
            updatedAt: timestamp
        }
    }
    return await db.put(params).promise()
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
    const timestamp = new Date().getTime()
    const data = parseBody(event)
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: event.pathParameters.id
        },
        ExpressionAttributeNames: {
            '#todo_text': 'text'
        },
        ExpressionAttributeValues: {
            ':text': data.text,
            ':checked': data.checked,
            ':updatedAt': timestamp
        },
        UpdateExpression:
            'SET #todo_text = :text, checked = :checked, updatedAt = :updatedAt',
        ReturnValues: 'ALL_NEW'
    }
    return await db.update(params).promise()
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
