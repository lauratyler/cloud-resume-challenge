import { useEffect, useState } from 'react'
import { getVisitorCount, updateVisitorCount } from '../../services/api'

export default function Footer() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        const fetchCount = async () => {
            const data = await getVisitorCount()
            setCount(data)
        }

        fetchCount()
    }, [])

    const handleClick = async () => {
        await updateVisitorCount()

        const updatedCount = await getVisitorCount()
        setCount(updatedCount)
    }

    return (
        <div className="footer">
            <button onClick={handleClick}>
                count is {count}
            </button>

            <div className="visitor-count">
                Made with &#10084; & whimsy - 2025
            </div>
        </div>
    )
}
