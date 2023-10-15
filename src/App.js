
import './App.css';

import { useState } from 'react';

const EmailForm = () => {

	const [email, setEmail] = useState("");
	const [feedback, setFeedback] = useState("Enter text for feedback");

	const onButtonSend = e => {
		e.preventDefault();
		console.log(email);
	};

	function onEmailChange(event) {
		setFeedback(`You have entered ${event.target.value.length} characters`)
		setEmail(event.target.value);
	}

	return (
		<div>
			<form onSubmit={onButtonSend}>
				<p>
					<label>Email: <input type="text" name="email" value={email} onChange={onEmailChange} /></label>
					<button>Send</button>
				</p>
				<p>{feedback}</p>
			</form>
		</div>
	);
};

function App() {
	return (
		<div className="App">
			<p>Hello, cold2.cc! version 2023oct15b</p>
			<EmailForm />
		</div>
	);
}

export default App;
