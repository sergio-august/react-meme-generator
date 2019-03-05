import React from "react"
import "./MemeGenerator.scss"
import domtoimage from "dom-to-image"

const memesApiUrl = "https://api.imgflip.com/get_memes"

class MemeGenerator extends React.Component {
    constructor() {
        super()
        this.state = {
            imgSrc: "/Third-World-Success-Kid.jpg",
            imagesLibrary: [],
            topHeader: "WHEN YOU FINISHED",
            topHeaderStyle: {},
            bottomHeader: "FIRST REACT APP!",
            bottomHeaderStyle: {}
        }
        this.changeHandler = this.changeHandler.bind(this)
        this.setRandomImage = this.setRandomImage.bind(this)
        this.downloadImage = this.downloadImage.bind(this)
    }

    componentDidMount() {
        fetch(memesApiUrl)
            .then(r => r.json())
            .then(res => {
                this.setState({
                    imagesLibrary: res.data.memes
                })
            })
    }

    changeHandler(event) {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    setRandomImage(event) {
        event.preventDefault()
        this.setState(prevState => {
            const randomImage = prevState.imagesLibrary[Math.floor(Math.random() * prevState.imagesLibrary.length)]
            console.log(randomImage)
            return { imgSrc: randomImage.url }
        })
    }

    downloadImage(event) {
        event.preventDefault()
        const node = document.getElementById("meme__output")
        domtoimage.toJpeg(node, { quality: 0.95 }).then(dataUrl => {
            const date = new Date()
            const topHeader = this.state.topHeader
            const bottomHeader = this.state.bottomHeader
            const name =
                "meme" +
                (topHeader.length > 0 ? "_" + topHeader.replace(" ", "_") : "") +
                (bottomHeader.length > 0 ? "_" + bottomHeader.replace(" ", "_") : "") +
                `_${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`
            var link = document.createElement("a")
            link.download = `${name}.jpg`
            link.href = dataUrl
            link.click()
        })
    }

    render() {
        return (
            <div className="meme">
                <div className="meme__control">
                    <form>
                        <input
                            type="text"
                            name="topHeader"
                            placeholder="Top header"
                            value={this.state.topHeader}
                            onChange={this.changeHandler}
                        />
                        <br />
                        <input
                            type="text"
                            name="bottomHeader"
                            placeholder="Bottom header"
                            value={this.state.bottomHeader}
                            onChange={this.changeHandler}
                        />
                        <br />
                        <button onClick={this.setRandomImage}>Set random image</button>
                        <button onClick={this.downloadImage}>Download</button>
                    </form>
                </div>
                <div className="meme__output" id="meme__output">
                    <img className="meme__output__image" src={this.state.imgSrc} alt="meme" />
                    <h2 className="meme__output__header__top" style={this.state.topHeaderStyle}>
                        {this.state.topHeader}
                    </h2>
                    <h2 className="meme__output__header__bottom" style={this.state.bottomHeaderStyle}>
                        {this.state.bottomHeader}
                    </h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator
