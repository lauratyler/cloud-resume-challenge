const { handler } = require('./index'); // your lambda file

const mockEvent = {
    requestContext: {
        http: {
            method: 'GET'
        }
    }
};

handler(mockEvent)
    .then(res => {
        console.log("RESPONSE:", res);
    })
    .catch(err => {
        console.error("ERROR:", err);
    });
