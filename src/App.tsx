import { useEffect, useState } from 'react';
import image from './image.png';
import image2 from './image2.png';
import csingcsong from './csingcsong.gif';
import fonts from './fonts.gif';
import tortenesz from './Heartland_Acres_7624_tortesz.gif';
import shockwave from './shockwave.png';
import noemi from "./noemi.gif"
import csong from "./csong.png"
import freestuff from "./freestuff.gif"
import southpark from "./southpark.gif"

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
      .then(() => setMessage(""))
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
    <h2>Welcome to <a href="https://www.pornhub.com" target='_blank' style={{ textDecoration: "none", color: "black" }}>rapnamegenerator.vercel.app</a></h2>
    <p>Now everyone can have a rap name thanks to our free rap name generator. Having the right name is essential whether you are DJing, Emceeing, beatboxing, graffiti painting, break dancing, or just sitting at your desk. Our rap name maker is based on an advanced rules engine to give you personalized results superior to anything else on the web. To get started simply enter your first name and the first initial of your last name. Then choose whether you want a male rapper name or a female rapper name. If you don't like our first suggestion, try it again. Enjoy.</p>
    <div style={{ maxWidth: "640px" }}>
      <img src={image} width={640} alt="Bea$t mode ahh gansta pic" />
      <br />
      <img src={image2} width={150} style={{ float: "right" }} alt="Guess who's got ligma?" />
    </div>
    <div style={{}}>
      <p style={{ display: "inline" }}>First Name:</p>
      <input onKeyDown={(event) => {
        if (event.key == " ") {
          event.preventDefault();
        }
      }
      } value={firstName} onChange={e => setFirstName(e.target.value)} onBlur={handleBlur} style={{ width: "200px" }}></input >
      <br />
      <p style={{ display: "inline" }}>Last Initial:</p>
      <input maxLength={1} value={lastInitial} onChange={e => setLastInitial(e.target.value)} onBlur={handleBlur} style={{ width: "30px", display: "inline" }}></input><p style={{ display: "inline" }}>(Optional)</p>
      <br />
      <p>Select gender:</p>
      <select value={gender} onChange={e => setGender(e.target.value)} style={{ width: "100px" }}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
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
      <br />
      <button onClick={sendPayload}>Get my rap name</button>
      <p>{message}</p>
      <br />
      <ul style={{ listStyleType: "none", padding: "0px", margin: "0px" }}>
        {rappernames.map((name) => <li>{name}</li>)}
      </ul>
      <br />
    </div>
    <footer style={{ display: "flex", flexWrap: "wrap", gap: "10px", width: "640px" }}>
      <img src={csingcsong} width={150} alt="Zǎo shang hǎo zhōng guó! Xiàn zài wǒ yǒu bing chilling Wǒ hěn xǐ huān bing chilling Dàn shì 'sù dù yǔ jī qíng jiǔ' bǐ bing chilling 'sù dù yǔ jī qíng, sù dù yǔ jī qíng jiǔ' Wǒ zuì xǐ huān Suǒ yǐ xiàn zài shì yīn yuè shí jiān Zhǔn bèi Yī, èr, sān" />
      <img src={fonts} width={150} alt="Kurva anyád" />
      <img src={tortenesz} width={150} alt="Nagymélykuti Luca RIP" />
      <img src={shockwave} width={150} alt="BUMM BABYYYYYY" />
      <br />
      <img src={noemi} width={150} alt="8=====D" />
      <img src={csong} width={150} alt="STOP RIGHT THERE N*GGA" />
      <img src={freestuff} width={150} alt=";)" />
      <img src={southpark} width={150} alt="Haha funny mert Cartman" />
    </footer>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />Fucking Idiot
  </>;
}
