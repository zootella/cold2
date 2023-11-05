
import './App.css';
import React, { useState, useEffect } from 'react';

var firstTick = Date.now();
console.log(sayTick(firstTick) + ' ~ top of app.js');


function FetchComponent() {

	const [apiData, setApiData] = useState(null);
	const [loading, setLoading] = useState(false);

	const [tickSend, setTickSend] = useState(0);
	const [tickReceived, setTickReceived] = useState(0);

	const fetchData = async () => {
		setLoading(true);
		setTickSend(Date.now());
		const response = await fetch("https://cold2.cc/api");
		if (response.ok) {
			const data = await response.json();
			setApiData(data);
		} else {
			console.error("fetch response not ok");
		}
		setLoading(false);
		setTickReceived(Date.now());
	};

	return (
		<div>
			<p>
				<button onClick={fetchData} disabled={loading}>
					{loading ? 'Loading...' : 'Fetch Data from API'}
				</button>
				{
					apiData && (
						<div>
							<p>{apiData.message}</p>
							<p>Version: {apiData.version}</p>
							<p>Server Tick: {apiData.serverTick}</p>
						</div>
					)
				}
			</p>
		</div>
	);
}

const TickComponent = ({tick}) => {
	return(<span>{sayTick(tick)}</span>);
}
function sayTick(tick) {
	if (!tick) return "(not yet)";//don't render jan1 1970 as a time something actually happened
	var date = new Date(tick); // Create a Date object using the timestamp
	var weekday = date.toLocaleDateString('en-US', { weekday: 'short' });//get text like "Mon"
	var hours = date.getHours();//extract hours, minutes, seconds, and milliseconds
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	var milliseconds = date.getMilliseconds().toString().padStart(3, "0");
	return `${weekday} ${hours}h ${minutes}m ${seconds}.${milliseconds}s`;
}

const EnterComponent = ({myHigherSubmit}) => {//takes access to the outer text-got-submitted function

	const [contents, setContents] = useState("");
	const [status, setStatus] = useState("no contents");

	const myChange = e => {
		setStatus(`measured ${e.target.value.length} characters`)
		setContents(e.target.value);
	}

	const mySubmit = e => {
		e.preventDefault();

		myHigherSubmit(contents, true);//tell our superiors about the newly submitted text, also
		console.log(contents);

		setContents("");//blank the box so you can type the next message


	};

	return (
		<div>
			<form onSubmit={mySubmit}>
				<p>
					<label>Text <input type="text" name="message" value={contents} onChange={myChange} /></label>{" "}
					<button>Send</button>{" "}
					{status}
				</p>
			</form>
		</div>
	);
};

const LogBox = ({logText}) => {
	return <div><p><textarea readOnly placeholder="log box" value={logText}></textarea></p></div>;
}

const TimedLinkComponent = ({linkText, linkTarget}) => {
	const [tick, setTick] = useState(0);
	return (
		<div>
			<p>
				Clicked <TickComponent tick={tick}/>:{" "}
				<a href={linkTarget} target="_blank" rel="noreferrer"
				onClick={()=>{setTick(Date.now())}}>{linkText}</a>
			</p>
		</div>
	);
}

function App() {

	useEffect(() => {
		// Perform your performance measurement here
		console.log(sayTick(Date.now()) + " ~ App useEffect indicates done mounting");

	}, []);


	const [logText, setLogText] = useState("");

	const myHigherSubmit = (s, includeTick) => {
		var t = includeTick ? sayTick(Date.now())+" ~ " : "";
		setLogText(`${logText}\r\n${t}${s}`);
	};

	return (
		<div className="App">
			<p>
				Loaded <TickComponent tick={Date.now()}/>. This is cold2.cc, on Cloudflare, version 2023nov5d.
			</p>
			<TimedLinkComponent linkText={"cold1.cc"} linkTarget={"https://cold1.cc/"} />
			<TimedLinkComponent linkText={"cold2.cc"} linkTarget={"https://cold2.cc/"} />
			<EnterComponent myHigherSubmit={myHigherSubmit} />
			<FetchComponent />
			<LogBox logText={logText} />
		</div>
	);
}

export default App;
