const VITE_DB_URL = import.meta.env.VITE_DB_URL

export const getVisitorCount = async (): Promise<number> => {
    try {
        const res = await fetch(VITE_DB_URL + '/visitor-count')
        const output = await res.json()

        return output.count
    } catch (error) {
        console.error(error)
        return 0
    }
}

export const updateVisitorCount = async() => {
    try {
        // Increment counter
        return fetch(VITE_DB_URL + '/visitor-count', { method: 'POST' })
    } catch (error) {
        console.error(error)
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Something went wrong' })
        }
    }
}

export const getResume = async (): Promise<Blob> => {
    const res = await fetch(VITE_DB_URL + '/docs/resume.pdf')
    if (!res.ok) throw new Error(res.statusText)
    return res.blob()
}
