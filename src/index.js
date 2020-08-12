import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom';
import "./css/index.scss";
import "bootstrap/dist/css/bootstrap.css";
import Sons_loops_Hang_drums from "./media/Sons_loops_Hang_drums.mp3"
import Sons_loops_Hang_drums_9 from "./media/Sons_loops_Hang_drums_9.mp3"
import Sons_loops_Hang_drums_2 from "./media/Sons_loops_Hang_drums_2.mp3"
import Sons_loops_Hang_drums_3 from "./media/Sons_loops_Hang_drums_3.mp3"
import Sons_loops_Hang_drums_4 from "./media/Sons_loops_Hang_drums_4.mp3"
import Sons_loops_Hang_drums_5 from "./media/Sons_loops_Hang_drums_5.mp3"
import Sons_loops_Hang_drums_6 from "./media/Sons_loops_Hang_drums_6.mp3"
import Sons_loops_Hang_drums_7 from "./media/Sons_loops_Hang_drums_7.mp3"
import Sons_loops_Hang_drums_8 from "./media/Sons_loops_Hang_drums_8.mp3"

const Key = ({ text, id, display, name }) => {
    const playSound = () => {
        document.querySelector(`#${text}`).play();
        display(name)
    }

    useEffect(() => {
        const handleKeyPress = event => {
            if(event.key.toUpperCase() === text){
                document.querySelector(`#${text}`).play();
                display(name)
            }

        }
       document.addEventListener("keypress",handleKeyPress);

       return () =>{
           document.removeEventListener("keypress",handleKeyPress);
       }
    },[text, display, name])

    return (
        <>
          <div className="drum-pad" id={name} onClick={playSound}>
            {text}
            <audio src={id} className="clip" id={text} type="audio/mp3" preload="auto" />
          </div>
        </>
      )
}

const Pad = ({ display }) =>{
    const data = [
        {text: "Q",song: Sons_loops_Hang_drums, name:"Sons_loops_Hang_drums"},
        {text: "W",song: Sons_loops_Hang_drums_9, name: "Sons_loops_Hang_drums_9"},
        {text: "E",song: Sons_loops_Hang_drums_2, name: "Sons_loops_Hang_drums_2"},
        {text: "A",song: Sons_loops_Hang_drums_3, name: "Sons_loops_Hang_drums_3"},
        {text: "S",song: Sons_loops_Hang_drums_4, name: "Sons_loops_Hang_drums_4"},
        {text: "D",song: Sons_loops_Hang_drums_5, name: "Sons_loops_Hang_drums_5"},
        {text: "Z",song: Sons_loops_Hang_drums_6, name: "Sons_loops_Hang_drums_6"},
        {text: "X",song: Sons_loops_Hang_drums_7, name: "Sons_loops_Hang_drums_7"},
        {text: "C",song: Sons_loops_Hang_drums_8, name: "Sons_loops_Hang_drums_8"},
    ]
    return (
        <div className="keys">
          {
              data.map((elt,index) => <Key text={elt.text} id={elt.song} display={display} key={index} name={elt.name} />)
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
