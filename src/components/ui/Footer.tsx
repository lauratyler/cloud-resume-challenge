import {useState} from "react";

export default function Footer() {
    const [count, setCount] = useState(0)
    return (
        <>
            <div className="footer">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <div className="visitor-count">Made with &#10084; & whimsy - 2025</div>
            </div>
        </>
    )
}
