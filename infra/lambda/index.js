const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand, UpdateCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({
    region: "us-east-2"
});

const dynamodb = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    try {
        const method = event?.requestContext?.http?.method;

        if (method === "GET") {
            const result = await dynamodb.send(
                new GetCommand({
                    TableName: "VisitorCount",
                    Key: { id: "visitor_count" }
                })
            );

            return {
                statusCode: 200,
                body: JSON.stringify({ count: result.Item?.count || 0 })
            };
        }

        if (method === "POST") {
            const result = await dynamodb.send(
                new UpdateCommand({
                    TableName: "VisitorCount",
                    Key: { id: "visitor_count" },
                    UpdateExpression: "SET #c = if_not_exists(#c, :start) + :inc",
                    ExpressionAttributeNames: { "#c": "count" },
                    ExpressionAttributeValues: {
                        ":inc": 1,
                        ":start": 0
                    },
                    ReturnValues: "UPDATED_NEW"
                })
            );

            return {
                statusCode: 200,
                body: JSON.stringify({ count: result.Attributes.count })
            };
        }

        return { statusCode: 405, body: "Method Not Allowed" };

    } catch (err) {
        console.error("ERROR:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message })
        };
    }
};