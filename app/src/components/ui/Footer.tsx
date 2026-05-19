import { useContext } from 'react'
import { VisitorCountContext } from '../contexts/VisitorCountContext.tsx'

export default function Footer() {
    const count = useContext(VisitorCountContext)
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
