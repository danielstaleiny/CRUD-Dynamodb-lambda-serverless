import * as handler from '../handler'
// TODO Implement

test('read', async () => {
    const event = 'event'
    const context = 'context'
    const callback = (error, response) => {
        expect(response.statusCode).toEqual(200)
        expect(typeof response.body).toBe('')
    }

    await handler.get(event, context, callback)
})
