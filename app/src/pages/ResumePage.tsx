import { useEffect, useState } from "react"
import Footer from '../components/ui/Footer.tsx'
import { getResume } from "../services/api.tsx"

export default function ResumePage() {
    const [pdfUrl, setPdfUrl] = useState<string | undefined>(undefined)
    const [error, setError] = useState(false)

    useEffect(() => {
        let blobUrl: string | undefined

        const fetchResume = async () => {
            try {
                const blob = await getResume()
                blobUrl = URL.createObjectURL(blob)
                setPdfUrl(blobUrl)
            } catch {
                setError(true)
            }
        }
        fetchResume()

        return () => { if (blobUrl) URL.revokeObjectURL(blobUrl) }
    }, [])

    return (
        <>
            <div className="full-content">
                <div className="content-card page-title" style={{width: '50%', alignSelf: 'center'}}>
                    <h3 className="name">Resume</h3>
                    <div className="wave-box" />
                    <a className="resume-download-btn" href={pdfUrl} download="LauraTyler_Resume.pdf">
                        Download PDF
                    </a>
                </div>
                <div className="header-container">
                    {error && <p className="section-content">Could not load resume. Try again later.</p>}
                    {pdfUrl && (
                        <>
                            <iframe
                                className="resume-viewer"
                                src={pdfUrl}
                                title="Laura Tyler Resume"
                            />
                        </>
                    )}
                    {!pdfUrl && !error && <p className="section-content">Loading...</p>}
                </div>
            </div>
            <Footer />
        </>
    )
}
