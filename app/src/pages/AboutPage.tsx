import Footer from '../components/ui/Footer.tsx'
import ElementList from '../components/ui/ElementList.tsx'
import { books, learnings, hobbies } from '../data/data.ts'

function bookList(list: { title: string, author: string, url: string}[]) {
    return list.map((book, index) =>
        <li className="sub-bullet" key={index}><a href={book.url}>{book.title}</a> by {book.author}</li>
    )
}

export default function AboutPage() {
    return (
        <>
            <div className="full-content">
                <div className="content-card page-title" style={{width: '50%', alignSelf: 'center'}}>
                    <h1 className="name">About Me</h1>
                    <div className="wave-box"></div>
                </div>
                <div className="grid-3">
                    <div className="content-card section-content">
                       <ul><b>Learning</b>
                           {ElementList(learnings)}
                       </ul>
                    </div>
                    <div className="content-card section-content">
                        <ul><b><a href="https://app.thestorygraph.com/profile/lauratyty">Currently Reading</a></b>
                            {bookList(books)}
                        </ul>
                    </div>
                    <div className="content-card section-content">
                        <ul><b>Hobbies</b>
                            {ElementList(hobbies)}
                        </ul>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}
