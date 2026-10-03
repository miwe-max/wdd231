export async function fetchData(url) {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
    } catch (error) {
        console.error(`Could not fetch data from ${url}:`, error)
        throw error
    }
}