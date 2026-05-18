import { skills } from '../../data/data.ts'

export default function SkillsGrid() {
    return (
        <div className="skills-grid">
            {skills.map(({ category, items }) => (
                <div className="skill-category" key={category}>
                    <h4 className="skill-category-title">{category}</h4>
                    <div className="skill-chips">
                        {items.map(item => <span className="skill-chip" key={item}>{item}</span>)}
                    </div>
                </div>
            ))}
        </div>
    )
}
