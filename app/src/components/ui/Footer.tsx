import { useEffect, useState } from 'react'
import { getVisitorCount } from '../../services/api'

export default function Footer() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        const fetchCount = async () => {
            const data = await getVisitorCount()
            setCount(data)
        }

        fetchCount()
    }, [])

    return (
        <div className="footer">
            <div className="visitor-sticker">
                <span className="visitor-sticker__label">
                    {count.toLocaleString()} visitors
                </span>
                <span className="visitor-sticker__label">
                    Made with &#10084; & whimsy
                </span>
            </div>
        </div>
    )
}
