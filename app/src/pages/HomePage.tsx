import Footer from '../components/ui/Footer.tsx';
import ProfileHeader from '../components/ui/ProfileHeader.tsx';
import Bio from '../components/ui/Bio.tsx';
import SkillsGrid from "../components/ui/SkillsGrid.tsx";

export default function HomePage() {
    return (
        <>
            <div className="full-content">
                <div className="content-card">
                    <ProfileHeader />
                    <Bio />
                </div>
                <div className="content-card">
                    <h3 className="section-title">Technical Skills</h3>
                    <SkillsGrid />
                </div>
            </div>
            <Footer/>
        </>
    )
}
