import {useState} from 'react'

function App() {
    const [counts, setCount] = useState(0)

    return (
        <div>
            <p>Test </p>
            <button className={"btn btn-primary"}>Salut</button>
        </div>
    )
}

export default App
