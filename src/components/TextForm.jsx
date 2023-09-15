import 'regenerator-runtime/runtime'
import React,{useState}from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'



export default function TextForm(props) {
    
    const[text,setText] = useState('')
    const [isSpeaking, setIsSpeaking] = useState(false)
    

// Converts the text to uppercase
    const handleUpClick =()=>{
        let newText = text.toUpperCase()
        setText(newText)
    }

// Converts the text to lowercase
    const handleLoClick =()=>{
        let newText = text.toLowerCase()
        setText(newText)
    }
// Clears the text
    const handleToClear = ()=>{
        let newText = ""
        setText(newText)
    }
    
// Update the text on every keystroke 
    const handleOnChange =(event)=>{
        setText(event.target.value)
    }

// Copies to clipboard 
    const handleCopy = ()=>{
        var copy = document.getElementById("textBox")
        copy.select()
        navigator.clipboard.writeText(copy.value)
    }

// Invoke speech from text 
    // const handleSpeakClick = (event) => {
    //     let el = event.currentTarget
    //     if (el.innerHTML === 'Listen Now') el.innerHTML = 'Stop Now'
    //     else el.innerHTML = 'Listen Now'
    
        
    //     if (el.innerHTML === 'Stop Now') {
    //       let msg = new SpeechSynthesisUtterance()
    //       msg.text = text
    //       window.speechSynthesis.speak(msg)
    //     } else {
    //       let msg = new SpeechSynthesisUtterance()
    //       msg.text = text
    //       window.speechSynthesis.cancel(msg)
    //     }
    //   }

    const handleSpeakClick = () => {
        setIsSpeaking(!isSpeaking);

        if (isSpeaking) {
            window.speechSynthesis.cancel();
        } else {
            let msg = new SpeechSynthesisUtterance();
            msg.text = text?text:transcript;
            window.speechSynthesis.speak(msg);
        }
    }


//  speech-To-text 


// const {
//     transcript,
//     browserSupportsSpeechRecognition
//   } = useSpeechRecognition();
//   if (!browserSupportsSpeechRecognition) {
//     return <span>Browser doesn't support speech recognition.</span>;
//   }

const { transcript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();
const handleStartStopListen = () => {
    if (!browserSupportsSpeechRecognition) {
        return "Speech recognition is not supported in this browser.";
    }

    if (listening) {
        setText(transcript + " " + text); // Update text with recognized speech
        SpeechRecognition.stopListening();
    } else {
        if (browserSupportsSpeechRecognition) {
            SpeechRecognition.startListening({ continuous: true });
        }
    }
}

// const handleStartListening = () => {
//     if (browserSupportsSpeechRecognition) {
//         SpeechRecognition.startListening({ continuous: true })
//     }
// }

// const handleStopListening = () => {
//     if (browserSupportsSpeechRecognition) {
//         SpeechRecognition.stopListening();
//     }
// }
    

// const {
//     transcript,
//     listening,
//     browserSupportsSpeechRecognition
//   } = useSpeechRecognition();
//   const startListening = () => SpeechRecognition.startListening({ continuous: true });

//   if (!browserSupportsSpeechRecognition) {
//     return <span>Browser doesn't support speech recognition.</span>;
//   }

    return (
    <>
    <div style={{color:props.mode==="dark"?"white":"black"}}>
        <h1>{props.heading}</h1>
        <div className="mb-3">
            <textarea className="form-control" placeholder ="Enter your text..." id="textBox" onChange={handleOnChange} value ={listening ? transcript : text} rows="8"
            style={{backgroundColor:props.mode==="light"?"white":"#062a43",color:props.mode==="dark"?"white":"black"}}></textarea>
        </div>
        <button className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>convert to UPPERCASE</button>
        <button className="btn btn-primary mx-1 my-1" onClick={handleLoClick}>convert to lowercase</button>
        <button className="btn btn-primary mx-1 my-1" onClick={handleToClear}>Clear Text</button>
        <button className="btn btn-primary mx-1 my-1" onClick={handleCopy}>Copy to clipboard</button>
        <button className="btn btn-primary mx-1 my-1" onClick={handleSpeakClick}>{isSpeaking ? 'Stop Now' : 'Listen Now'}</button>
        <button className="btn btn-primary mx-1 my-1" onClick={handleStartStopListen}>{listening ? 'Stop Listening' : 'Start Listening'}</button>
                {/* <button className="btn btn-primary mx-1 my-1" onClick={handleStopListening}>Stop Listening</button> */}
    </div>
    <div className="count my-4" style={{color:props.mode==="dark"?"white":"black"}}>
        <h3>Your Text Summary</h3>
        <p>Character Count: {text.length} | Word Count: {text.split(" ").filter((element)=>{return element.length!==0}).length}</p>
    </div>
    <div style={{color:props.mode==="dark"?"white":"black"}}>
        <h3>Preview</h3>
        <p>{text.length>0?text:"Enter something in the textbox above to preview it here!!"}</p>
    </div>
    </>
  )
}