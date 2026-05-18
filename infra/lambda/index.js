const { handler: visitorCount } = require("./functions/visitor-count")
const { handler: docs } = require("./functions/docs")

exports.handler = async (event) => {
    try {
        const path = event?.requestContext?.http?.path;

        if (path === "/visitor-count") {
            return await visitorCount(event)
        }

        if (path === "/docs") {
            return await docs(event)
        }

        return { statusCode: 404, body: `Not Found: ${path}` }
    } catch (err) {
        console.error("ERROR:", err)
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message })
        };
    }
}
