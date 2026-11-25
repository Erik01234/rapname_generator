import { useEffect, useState } from 'react';

export default function App() {
  const [message, setMessage] = useState('Connecting to backend...');
  const [rappernames, setRapperNames] = useState([]);

  const [firstName, setFirstName] = useState("Rick");
  const [lastInitial, setLastInitial] = useState("F");
  const [gender, setGender] = useState('male');
  const [howmany, sethowmany] = useState("5");

  useEffect(() => {
    fetch('/api/ping')
      .then((res) => res.json())
      .then((data) => setMessage("Successfully connected to backend"))
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
    setRapperNames(data.reply);
  };

  const handleBlur = () => {
    if (howmany == "") {
      sethowmany("5");
    };
    if (firstName == "") {
      setFirstName("Rick");
    };
    if (lastInitial == "") {
      setLastInitial("F");
    };
  };

  return <>
    <div style={{}}>
      <p>First name:</p>
      <input onKeyDown={(event) => {
        if (event.key == " ") {
          event.preventDefault();
        }
      }
      } value={firstName} onChange={e => setFirstName(e.target.value)} onBlur={handleBlur} style={{ width: "200px" }}></input >

      <p>Last name initial:</p>
      <input maxLength={1} value={lastInitial} onChange={e => setLastInitial(e.target.value)} onBlur={handleBlur} style={{ width: "30px" }}></input>
      <br />
      <p>How many?:</p>
      <input onKeyDown={(event) => {
        if (!/[0-9]/.test(event.key)) {
          if (event.key != "Backspace") {
            event.preventDefault();
          }
        }
      }} value={howmany} max={10} onChange={e => sethowmany(e.target.value)} onBlur={handleBlur} style={{ width: "30px" }}></input>
      <br />
      <p>Select gender:</p>
      <select value={gender} onChange={e => setGender(e.target.value)} style={{ width: "100px" }}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <br />
      <button onClick={sendPayload}>Get my rap name</button>
      <p>{message}</p>
      <br />
      <ul style={{ listStyleType: "none", padding: "0px", margin: "0px" }}>
        {rappernames.map((name) => <li>{name}</li>)}
      </ul>
    </div>
  </>;
}
