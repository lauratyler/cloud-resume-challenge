import { contactLinks } from '../../data/data.ts'

export default function ProfileHeader() {
    return (
        <div className="header-container">
            <img src="/assets/studioGhibliProfile.png" alt="Cartoon portrait of Laura in style of Studio Ghibli" />
            <div className="header-text">
                <h1 className="name">Laura Tyler</h1>
                <h3 className="tagline"><span className="line">Always building, always growing</span></h3>
                <div className="contact-list">
                    {contactLinks.map(({ href, icon: Icon, label }) => (
                        <a key={label} target="_blank" href={href} aria-label={label}><Icon /></a>
                    ))}
                </div>
            </div>
        </div>
    )
}
