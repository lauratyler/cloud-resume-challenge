export default function ElementList(list: string[]) {
    return list.map((item, index) =>
        <li className="sub-bullet" key={index}>{item}</li>
    )
}
