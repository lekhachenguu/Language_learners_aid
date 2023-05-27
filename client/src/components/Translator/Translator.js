import React, { useEffect, useState, useRef } from 'react'
import './style.css';
import countries from './js/countries';
import { MouseEvent } from "react";
// import ScriptTag from 'react-script-tag';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Translator() {


  // const countries = {
  //   "en-GB": "English",
  //   "hi-IN": "Hindi",
  //   // Add more countries here
  // };

  // function getOptions(selected) {
  //   return Object.entries(countries).map(([country_code, country_name]) => (
  //     <option key={country_code} value={country_code} selected={country_code === selected}>
  //       {country_name}
  //     </option>
  //   ));
  // }


  //   const [fromText, setFromText] = useState('');
  //   const [toText, setToText] = useState('');
  //   const [translateFrom, setTranslateFrom] = useState('en-GB');
  //   const [translateTo, setTranslateTo] = useState('hi-IN');
  //   const [isDarkMode, setIsDarkMode] = useState(false);

  //   function exchangeLanguages() {
  //     const tempText = fromText;
  //     const tempLang = translateFrom;
  //     setFromText(toText);
  //     setToText(tempText);
  //     setTranslateFrom(translateTo);
  //     setTranslateTo(tempLang);
  //   }

  //   function handleTranslate() {
  //     if (!fromText) return;
  //     setToText('Translating...');
  //     const apiUrl = `https://api.mymemory.translated.net/get?q=${fromText}&langpair=${translateFrom}|${translateTo}`;
  //     fetch(apiUrl)
  //       .then(res => res.json())
  //       .then(data => {
  //         const translatedText = data.responseData.translatedText;
  //         setToText(translatedText);
  //       })
  //       .finally(() => {
  //         setToText('');
  //       });
  //   }

  //   function handleCopy(isFrom) {
  //     const text = isFrom ? fromText : toText;
  //     navigator.clipboard.writeText(text);
  //   }

  //   function handleSpeak(isFrom) {
  //     const text = isFrom ? fromText : toText;
  //     const utterance = new SpeechSynthesisUtterance(text);
  //     utterance.lang = isFrom ? translateFrom : translateTo;
  //     speechSynthesis.speak(utterance);
  //   }

  //   function handleDarkMode() {
  //     setIsDarkMode(!isDarkMode);
  //   }

  //   return (
  //     <div className={isDarkMode ? 'dark-mode' : ''}>
  //       <div className="row">
  //         <textarea className="from-text" value={fromText} onChange={e => setFromText(e.target.value)} />
  //         <select value={translateFrom} onChange={e => setTranslateFrom(e.target.value)}>
  //           {getOptions(translateFrom)}
  //         </select>
  //         <i id="from" className="fas fa-copy" onClick={() => handleCopy(true)}></i>
  //         <i id="from-speak" className="fas fa-volume-up" onClick={() => handleSpeak(true)}></i>
  //       </div>
  //       <div className="row">
  //         <textarea className="to-text" value={toText} onChange={e => setToText(e.target.value)} />
  //         <select value={translateTo} onChange={e => setTranslateTo(e.target.value)}>
  //           {getOptions(translateTo)}
  //         </select>
  //         <i id="to" className="fas fa-copy" onClick={() => handleCopy(false)}></i>
  //         <i id="to-speak" className="fas fa-volume-up" onClick={() => handleSpeak(false)}></i>
  //       </div>
  //       <div className="row">
  //         <button onClick={handleTranslate}>Translate</button>
  //         <i className="fas fa-exchange" onClick={exchangeLanguages}></i>
  //       </div>
  //     </div>
  //   )
  // }



  // 1o to 169 working 1
  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [translateFrom, setTranslateFrom] = useState("en-GB");
  const [translateTo, setTranslateTo] = useState("hi-IN");
  const [isLoading, setIsLoading] = useState(false);

  const fromRef = useRef(null);
  const toRef = useRef(null);
  let isDarkMode=true;

  useEffect(() => {
    const selectTags = document.querySelectorAll("select");
    selectTags.forEach((tag, id) => {
      for (let country_code in countries) {
        let selected =
          id === 0
            ? country_code === "en-GB"
              ? "selected"
              : ""
            : country_code === "hi-IN"
              ? "selected"
              : "";
        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
      }
    });

    //                 const exchangeIcon = document.querySelector(".exchange");
    // exchangeIcon.addEventListener("click", () => {
    //   let tempLang = translateFrom;
    //   setTranslateFrom(translateTo);
    //   setTranslateTo(tempLang);
    // });


    const icons = document.querySelectorAll(".row i");
    icons.forEach((icon) => {
      icon.addEventListener("click", ({ target }) => {
        if (!fromText || !toText) return;
        if (target.classList.contains("fa-copy")) {
          if (target.id === "from") {
            navigator.clipboard.writeText(fromText);
          } else {
            navigator.clipboard.writeText(toText);
          }
        } else {
          let utterance;
          if (target.id === "from") {
            utterance = new SpeechSynthesisUtterance(fromText);
            utterance.lang = translateFrom;
          } else {
            utterance = new SpeechSynthesisUtterance(toText);
            utterance.lang = translateTo;
          }
          speechSynthesis.speak(utterance);
        }
      });
    });
  }, []);

  function handleInputChange(event) {
    const { value } = event.target;
    setFromText(value);
    if (!value) {
      setToText("");
    }
  }

  function handleTranslate() {
    if (!fromText) return;
    setIsLoading(true);
    let apiUrl = `https://api.mymemory.translated.net/get?q=${fromText}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setToText(data.responseData.translatedText);
        data.matches.forEach((data) => {
          if (data.id === 0) {
            setToText(data.translation);
          }
        });
        setIsLoading(false);
      });
  }

  function handleSelectChange(event) {
    const { name, value } = event.target;
    if (name === "translateFrom") {
      setTranslateFrom(value);
    } else if (name === "translateTo") {
      setTranslateTo(value);
    }
  }


  function handleTextToSpeech(text, lang) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
  }
  function handleExchange() {
    let tempLang = translateFrom;
    setTranslateFrom(translateTo);
    setTranslateTo(tempLang);

    setFromText("")
    setToText("")
  }
  function handleCopyFrom() {
    if (fromText) {
      navigator.clipboard.writeText(fromText);
      alert("text copied!")
    }
  }
  function handleCopyTo() {
    if (fromText) {
      navigator.clipboard.writeText(fromText);
      alert("text copied!")
    }
  }
  function toggle() {
    if (isDarkMode) {
      navigator.clipboard.writeText(fromText);
      alert("text copied!")
    }
  }

  // return (
  return (
    <div className="app">
      <header>
        <h1>Translation App</h1>
        {/* <label className="switch">

          <span className="slider"></span>
        </label> */}
      </header>
      <main>
        
            <div className="row">
              <div className="column">
                <select
                  name="translateFrom"
                  value={translateFrom}
                  onChange={handleSelectChange}>

                </select>
                <textarea
                  ref={fromRef}
                  value={fromText}
                  onChange={handleInputChange}
                  placeholder="Enter text to translate">

                </textarea>
                <div className="buttons">
                  {/* <button onClick={handleTranslate}>
                              {isLoading ? "Translating..." : "Translate"}
                            </button> */}
                  <button className="fas fa-volume-up" id="from" onClick={() => handleTextToSpeech(fromText, translateFrom)}> </button>
                  {/* <button className="fas fa-volume-up" id="to" onClick={() => handleTextToSpeech(toText, translateTo)}>Text To Speech</button> */}
                  <button className="far fa-copy" id="from" onClick={handleCopyFrom}>
                  {/* <i className="far fa-copy" id="from"></i> */}
                  </button>
                </div>
              </div>
              <div className="column">
                <select
                  name="translateTo"
                  value={translateTo}
                  onChange={handleSelectChange}
                ></select>
                <textarea
                  ref={toRef}
                  value={toText}
                  readOnly
                  placeholder="Translated text will appear here"
                ></textarea>
                <div className="buttons">
                  {/* <button className="far fa-copy" id="to"></button> */}
                  <button className="fas fa-volume-up" id="to" onClick={() => handleTextToSpeech(toText, translateTo)}></button>
                  <button className="far fa-copy" id="to" onClick={handleCopyTo}>
                  {/* <i className="far fa-copy" id="from"></i> */}
                  </button>
                </div>
              </div>
            </div>
              <center><button id = 'translate-btn' onClick={handleTranslate}>
                {isLoading ? "Translating..." : "Translate"}
              </button></center>
              <div className="exchange">
                <button className="fas fa-exchange-alt" onClick={handleExchange}></button>
              </div>
        
      </main>
      </div>
  );
}