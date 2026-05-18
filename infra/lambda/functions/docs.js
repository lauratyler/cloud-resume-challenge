const { GetObjectCommand, S3Client } = require('@aws-sdk/client-s3')

const client = new S3Client({ region: "us-east-2" })
const bucketName = "lauratyler-prod-portfolio-997688109736"

const handler = async (event) => {
    const method = event?.requestContext?.http?.method

    if (method === "GET") {
        const result = await client.send(
            new GetObjectCommand({
                Bucket: bucketName,
                Key: "docs/resume.pdf",
            })
        )
        const bytes = await result.Body.transformToByteArray()
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": 'inline; filename="resume.pdf"',
            },
            body: Buffer.from(bytes).toString("base64"),
            isBase64Encoded: true,
        }
    }

    return { statusCode: 405, body: "Method Not Allowed" }
}

module.exports = { handler }
