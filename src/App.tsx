import { useEffect, useState } from 'react';

export default function App() {
  const [message, setMessage] = useState('Connecting to backend...');

  const [firstName, setFirstName] = useState("Rick");
  const [lastInitial, setLastInitial] = useState("F");
  const [gender, setGender] = useState('male');
  const [howmany, sethowmany] = useState("5");

  useEffect(() => {
    fetch('/api/ping')
      .then((res) => res.json())
      .then((data) => setMessage(data.status))
      .catch(() => setMessage('Error connecting to backend'));
  }, []);

  const sendPayload = async () => {
    const response = await fetch('/api/ping', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: firstName,
        lastinitial: lastInitial,
        gender: gender,
        howmany: howmany
      }),
    });
    const data = await response.json();
    setMessage(data.reply)
  };

  return <>
    <p>Select gender:</p>
    <select value={gender} onChange={e => setGender(e.target.value)}>
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>
    <br />
    <p>First name: {firstName}</p>
    <input onChange={e => setFirstName(e.target.value)}></input>
    <br />
    <p>Last name initial: {lastInitial}</p>
    <input onChange={e => setLastInitial(e.target.value)}></input>
    <br />
    <p>How many?: {howmany}</p>
    <input onChange={e => sethowmany(e.target.value)}></input>
    <button onClick={sendPayload}>Get my rap name</button>
    <p>{message}</p>
  </>;
}
