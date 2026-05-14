import Header from '../components/ui/Header.tsx';
import Footer from '../components/ui/Footer.tsx';
import { skills } from '../data/data.ts';

export default function HomePage() {
    return (
        <>
            <Header/>
            <div className="full-content">
                <div className="header-container">
                    <div className="profile-image">
                        <img src="/assets/studioGhibliProfile.png"
                             alt="Cartoon portrait of Laura in style of Studio Ghibli"/>
                    </div>
                    <div className="title-text">
                        <h1 className="name">Laura Tyler</h1>
                        <h3 className="tagline">
                            <span className="line">Bringing ideas to life, one line at a time</span>
                        </h3>
                        <div className="contact-list">
                            <a target="_blank" href="mailto:laurabtyler22@gmail.com"><i
                                className="fa fa-envelope"></i></a>
                            <a target="_blank" href="https://linkedin.com/in/lauratyler22"><i
                                className="fa fa-linkedin-square"></i></a>
                            <a target="_blank" href="https://github.com/lauratyler"><i className="fa fa-github"></i></a>
                        </div>
                        <div className="summary">
                            <p className="section-content">Hi, I'm Laura - a self-taught developer with a love for
                                storytelling, strong systems, and user empathy.
                                I blend my background in psychology and business with a deep passion for clean, thoughtful
                                code.
                                When I'm not coding, you can find me budgeting, baking sourdough, or enjoying nature with
                                my family.
                            </p>
                        </div>
                    </div>
                </div>
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
                <hr className="section-divider"/>
            </div>
            <Footer/>
        </>
    )
}
