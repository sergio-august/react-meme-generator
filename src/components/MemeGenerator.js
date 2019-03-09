import React from "react"
import "./MemeGenerator.scss"
import domtoimage from "dom-to-image"

const memesApiUrl = "https://api.imgflip.com/get_memes"

class MemeGenerator extends React.Component {
    constructor() {
        super()
        this.state = {
            imgSrc: "https://i.imgflip.com/265j.jpg",
            imagesLibrary: [],
            topHeader: "DOESN'T OWN A COMPUTER",
            topHeaderStyle: {},
            bottomHeader: "CAN STILL PLAY MINESWEEPER",
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
        const node = document.getElementById("meme__output__render")
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
                        <fieldset>
                            <legend>Image</legend>
                            <button disabled>Select</button>
                            <button disabled>Url</button>
                            <button onClick={this.setRandomImage}>Random</button>&nbsp;
                        </fieldset>
                        <fieldset>
                            <legend>Text</legend>
                            <label for="topHeader">Top</label>
                            <input
                                type="text"
                                id="topHeader"
                                name="topHeader"
                                placeholder="Top header"
                                value={this.state.topHeader}
                                onChange={this.changeHandler}
                            />
                            <br />
                            <label for="bottomHeader">Bottom</label>
                            <input
                                type="text"
                                id="bottomHeader"
                                name="bottomHeader"
                                placeholder="Bottom header"
                                value={this.state.bottomHeader}
                                onChange={this.changeHandler}
                            />
                            <br />
                        </fieldset>
                        <fieldset>
                            <legend>Result</legend>
                            <button disabled>Get link</button>
                            <button onClick={this.downloadImage}>Download</button>
                        </fieldset>
                    </form>
                </div>
                <div className="meme__output">
                    <div className="meme__output__render" id="meme__output__render">
                        <img className="meme__output__render__image" src={this.state.imgSrc} alt="meme" />
                        <p className="meme__output__render__header__top" style={this.state.topHeaderStyle}>
                            {this.state.topHeader}
                        </p>
                        <p className="meme__output__render__header__bottom" style={this.state.bottomHeaderStyle}>
                            {this.state.bottomHeader}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default MemeGenerator
