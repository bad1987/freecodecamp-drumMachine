import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom';
import "./css/index.scss";
import "bootstrap/dist/css/bootstrap.css";

const Key = ({ text, id, display }) => {
    const src = `/media/${id}.mp3`;
    const playSound = () => {
        document.querySelector(`#${text}`).play();
        display(id)
    }

    useEffect(() => {
        const handleKeyPress = event => {
            if(event.key.toUpperCase() === text){
                document.querySelector(`#${text}`).play();
                display(id)
            }

        }
       document.addEventListener("keypress",handleKeyPress);

       return () =>{
           document.removeEventListener("keypress",handleKeyPress);
       }
    },[text, display, id])

    return (
        <>
          <div className="drum-pad" id={id} onClick={playSound}>
            {text}
            <audio src={src} className="clip" id={text} type="audio/mp3" preload="auto" />
          </div>
        </>
      )
}

const Pad = ({ display }) =>{
    const data = [
        {text: "Q",song: "Sons_&_loops_Hang_drums"},
        {text: "W",song: "Sons_&_loops_Hang_drums_9"},
        {text: "E",song: "Sons_&_loops_Hang_drums_2"},
        {text: "A",song: "Sons_&_loops_Hang_drums_3"},
        {text: "S",song: "Sons_&_loops_Hang_drums_4"},
        {text: "D",song: "Sons_&_loops_Hang_drums_5"},
        {text: "Z",song: "Sons_&_loops_Hang_drums_6"},
        {text: "X",song: "Sons_&_loops_Hang_drums_7"},
        {text: "C",song: "Sons_&_loops_Hang_drums_8"},
    ]
    return (
        <div className="keys">
          {
              data.map((elt,index) => <Key text={elt.text} id={elt.song} display={display} key={index} />)
          }
        </div>
      )
}

function App() {
    const [screen, setScreen] = useState("")

    const handleScreen = (string) => {
        const res = string.split(/[_&]/).filter(elt => elt !== "").join(" ")
        setScreen(res)
    }

    return (
        <>
            <h1 className="text-center">Drum Machine</h1>
            <div id="drum-machine">
            <div className="content">
                <div className="left-content">
                    <div className="drum-pad-container">
                        <Pad display={handleScreen} />
                    </div>
                </div>
                <div className="right-content">
                    <div id="display">{screen.toUpperCase()}</div>
                </div>
            </div>
            </div>
        </>
    )
}

ReactDOM.render(
    <App />,
    document.querySelector("#root")
)
