
import './App.css';
import React, { useState, useEffect } from 'react';

var firstTick = Date.now();
console.log(sayTick(firstTick) + ' ~ top of app.js');


function FetchComponent({mySetTick3, mySetTick4}) {

	const [apiData, setApiData] = useState(null);
	const [loading, setLoading] = useState(false);

	const [tickSend, setTickSend] = useState(0);
	const [tickReceived, setTickReceived] = useState(0);

	useEffect(() => {
		console.log("fetch component use effect before,");
		fetchData();
		console.log("... fetch component use effect after.");
	}, []);

	const fetchData = async () => {
		setLoading(true);
		let t3 = Date.now();
		setTickSend(t3);
		mySetTick3(t3);
		const response = await fetch("https://cold2.cc/api");
		if (response.ok) {
			const data = await response.json();
			setApiData(data);
		} else {
			console.error("fetch response not ok");
		}
		setLoading(false);
		let t4 = Date.now();
		setTickReceived(t4);
		mySetTick4(t4);
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
							<p>Server Tick: {sayTick(apiData.serverTick)} which is {tickReceived - apiData.serverTick}ms away from the browser time</p>
							{
								tickSend < tickReceived
								?
								<p>Request sent {sayTick(tickSend)} and response received {sayTick(tickReceived)} which is {tickReceived - tickSend}ms later</p>
								:
								<p>Request sent {sayTick(tickSend)}</p>
							}
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


/*
for the log box, you want four ticks
tickTop - code execution has started in app.js
tickEffect - react called App's useEffect for the first time, indicating components are loaded
tickSent - first call to fetch
tickReceived - first response


*/

const StopwatchComponent = ({tick1, tick2, tick3, tick4}) => {



	return (
		<p>
			Stopwatch start {sayTick(tick1)}, rendered {sayTick(tick2)}, request {sayTick(tick3)}, received {sayTick(tick4)}
		</p>
	);


}





function App() {

	useEffect(() => {
		let t2 = Date.now();
		console.log(sayTick(t2) + " ~ App useEffect indicates done mounting");
		mySetTick2(t2);

	}, []);

	const [tick1, setTick1] = useState(firstTick);
	const [tick2, setTick2] = useState(0);
	const [tick3, setTick3] = useState(0);
	const [tick4, setTick4] = useState(0);

	function mySetTick1(t) { if (!tick1) setTick1(t); }
	function mySetTick2(t) { if (!tick2) setTick2(t); }
	function mySetTick3(t) { if (!tick3) setTick3(t); }
	function mySetTick4(t) { if (!tick4) setTick4(t); }

	const [logText, setLogText] = useState("");

	const myHigherSubmit = (s, includeTick) => {
		var t = includeTick ? sayTick(Date.now())+" ~ " : "";
		setLogText(`${logText}\r\n${t}${s}`);
	};

	return (
		<div className="App">
			<p>
				Loaded <TickComponent tick={tick2}/>. This is cold2.cc, on Cloudflare, version 2023nov5k.
			</p>
			<TimedLinkComponent linkText={"cold1.cc"} linkTarget={"https://cold1.cc/"} />
			<TimedLinkComponent linkText={"cold2.cc"} linkTarget={"https://cold2.cc/"} />
			<EnterComponent myHigherSubmit={myHigherSubmit} />
			<FetchComponent mySetTick3={mySetTick3} mySetTick4={mySetTick4} />
			<StopwatchComponent tick1={tick1} tick2={tick2} tick3={tick3} tick4={tick4} />
			<LogBox logText={logText} />
		</div>
	);
}

export default App;
