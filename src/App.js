
import './App.css';
import React from 'react';
import { useState } from 'react';

function Tick({tick}) {//tick is from Date.now()
  if (!tick) return (<span>(not yet)</span>);//don't render jan1 1970 as a time something actually happened

  var date = new Date(tick); // Create a Date object using the timestamp
  var weekday = date.toLocaleDateString('en-US', { weekday: 'short' });//get text like "Mon"
  var hours = date.getHours();//extract hours, minutes, seconds, and milliseconds
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var milliseconds = date.getMilliseconds().toString().padStart(3, "0");

  return(<span>{weekday} {hours}h {minutes}m {seconds}.{milliseconds}s</span>);
}

const BoxForm = () => {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("no message");
  const onMySend = e => {
    e.preventDefault();
    console.log(email);
  };

  function onBoxChange(event) {
    setMessage(`measured ${event.target.value.length} characters`)
    setEmail(event.target.value);
  }

  return (
    <div>
      <form onSubmit={onMySend}>
        <p>
          <label>Text <input type="text" name="email" value={email} onChange={onBoxChange} /></label>{" "}
          <button>Send</button>{" "}
          {message}
        </p>
      </form>
    </div>
  );
};

function App() {

  const [clicked1, setClicked1] = useState(0);
  const [clicked2, setClicked2] = useState(0);

  return (
    <div className="App">
      <p>
        Loaded <Tick tick={Date.now()}/>. This is cold2.cc, on Cloudflare, version 2023oct22b.
      </p>
      <p>
        Clicked <Tick tick={clicked1}/>:{" "}
        <a href="https://cold1.cc/" target="_blank" rel="noreferrer"
        onClick={()=>{setClicked1(Date.now())}}>cold1.cc</a>
      </p>
      <p>
        Clicked <Tick tick={clicked2}/>:{" "}
        <a href="https://cold2.cc/" target="_blank" rel="noreferrer"
        onClick={()=>{setClicked2(Date.now())}}>cold2.cc</a>
      </p>
      <BoxForm />
    </div>
  );
}

export default App;
