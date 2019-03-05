import React, { Component } from "react"
import MemeGenerator from "./components/MemeGenerator.js"
import "./App.scss"

class App extends Component {
    render() {
        return (
            <div className="App">
                <MemeGenerator />
            </div>
        )
    }
}

export default App
