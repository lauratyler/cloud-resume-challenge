import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa'
import Footer from '../components/ui/Footer.tsx';
import { skills } from '../data/data.ts';

export default function HomePage() {
    return (
        <>
            <div className="full-content">
                <div className="content-card">
                    <div className="header-container">
                        <div className="title-text">
                            <div className="profile-image">
                                <span>
                                    <img src="/assets/studioGhibliProfile.png"
                                         alt="Cartoon portrait of Laura in style of Studio Ghibli"/>
                                </span>
                                <span>
                                    <h1 className="name">Laura Tyler</h1>
                                    <h3 className="tagline">
                                        <span className="line">Always building, always growing</span>
                                    </h3>
                                    <div className="contact-list">
                                        <a target="_blank" href="mailto:laurabtyler22@gmail.com" aria-label="Email"><FaEnvelope /></a>
                                        <a target="_blank" href="https://linkedin.com/in/lauratyler22" aria-label="LinkedIn"><FaLinkedin /></a>
                                        <a target="_blank" href="https://github.com/lauratyler" aria-label="GitHub"><FaGithub /></a>
                                    </div>
                                </span>
                            </div>
                            <div className="summary">
                                <p className="section-content">
                                    Hi, I am Laura. I am a senior software engineer with seven years of experience
                                    building backend systems and user-facing products. I built this site to learn new
                                    tools and practice writing in public, which is a little terrifying and probably the
                                    point.
                                </p>

                                <p className="section-content">
                                    My background is a little unconventional. I studied psychology, got an MBA, and
                                    ended up deep in backend infrastructure. It sounds like a strange path until you
                                    realize that understanding how people think is not so different from understanding
                                    how systems behave. I tend to ask why before I ask how, and I have found that
                                    instinct useful whether I am designing an API or figuring out why a workflow is not
                                    working for the people using it. I have also found that being knocked off course
                                    occasionally is less a detour and more just part of the route.
                                </p>

                                <p className="section-content">
                                    Outside of work I co-hosted a family-friendly Dungeons & Dragons podcast, which
                                    taught me more about collaborative storytelling and showing up consistently for an
                                    audience than I ever expected. I am also into personal finance, baking sourdough,
                                    and getting outside with my family when the weather cooperates.
                                </p>

                                <p className="section-content">
                                    This site is a work in progress, like most things worth doing.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content-card">
                    <h3 className="section-title">Technical Skills</h3>
                    <div className="skills-grid">
                        {skills.map((group) => (
                            <div className="skill-category" key={group.category}>
                                <h4 className="skill-category-title">{group.category}</h4>
                                <div className="skill-chips">
                                    {group.items.map((item) => (
                                        <span className="skill-chip" key={item}>{item}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}
