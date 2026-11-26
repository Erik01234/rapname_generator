import { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
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
  const [rappernames, setRapperNames] = useState<string[]>([]);

  const [firstName, setFirstName] = useState("Rick");
  const [lastInitial, setLastInitial] = useState("F");
  const [gender, setGender] = useState('male');
  const [howmany, sethowmany] = useState("5");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [visitors] = useState(() => {
    const n = Number(localStorage.getItem("visitors") ?? 4216) + 1;
    localStorage.setItem("visitors", String(n));
    return n;
  });
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  const trail = (e: MouseEvent) => {
    const id = Date.now() + Math.random();
    setSparkles((s) => [...s.slice(-12), { id, x: e.clientX, y: e.clientY }]);
    setTimeout(() => setSparkles((s) => s.filter((p) => p.id !== id)), 800);
  };

  useEffect(() => {
    fetch('/api/ping')
      .then((res) => res.json())
      .then(() => setMessage(""))
      .catch(() => setMessage('Error connecting to backend'));
  }, []);

  const sendPayload = async () => {
    setLoading(true);
    setRapperNames([]);
    try {
      const response = await fetch('/api/ping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstname: firstName,
          lastinitial: lastInitial,
          gender: gender,
          howmany: String(Math.min(Number(howmany) || 5, 10))
        }),
      });
      if (!response.ok) throw new Error(String(response.status));
      const data = await response.json();
      await new Promise((r) => setTimeout(r, 1500));
      setRapperNames(data.reply);
    } catch {
      setError("MyRapName.exe has performed an illegal operation and will be shut down. (Could not reach the advanced rules engine.)");
    } finally {
      setLoading(false);
    }
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

  return <div onMouseMove={trail}>
    {sparkles.map((p) => <span key={p.id} className="sparkle" style={{ left: p.x, top: p.y }}>✨</span>)}
    {error && <div className="win"><div className="title">MyRapName.exe</div><div className="body">⛔ {error}<br /><br /><button onClick={() => setError("")}>OK</button></div></div>}
    <div className="marquee"><span>*** NOW WITH 100% MORE ADVANCED RULES ENGINE *** #1 RAP NAME SITE ON THE WEB *** FREE FREE FREE ***</span></div>
    <h2 className="wordart">Welcome to MyRapName.com</h2>
    <p style={{ textAlign: "center" }}>🚧 <span className="blink">NEW!</span> UNDER CONSTRUCTION 🚧</p>
    <p className="panel">Now everyone can have a rap name thanks to our free rap name generator. Having the right name is essential whether you are DJing, Emceeing, beatboxing, graffiti painting, break dancing, or just sitting at your desk. Our rap name maker is based on an advanced rules engine to give you personalized results superior to anything else on the web. To get started simply enter your first name and the first initial of your last name. Then choose whether you want a male rapper name or a female rapper name. If you don't like our first suggestion, try it again. Enjoy.</p>
    <div style={{ maxWidth: "640px" }}>
      <img src={image} width={640} alt="Bea$t mode ahh gansta pic" />
      <br />
      <img src={image2} width={150} style={{ float: "right" }} alt="Guess who's got ligma?" />
    </div>
    <div className="panel">
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
      <button className="bevel" onClick={sendPayload} disabled={loading}>Get my rap name!!!</button>
      <p>{message}</p>
      {loading && <div><p>Consulting the advanced rules engine...</p><div className="bar"><div /></div></div>}
      <br />
      {rappernames.length > 0 && <div className="cert">
        <p>🏆 Certified by the Rap Name Institute 🏆</p>
        <ul style={{ listStyleType: "none", padding: "0px", margin: "0px" }}>
          {rappernames.map((name, i) => <li key={i}>{name}</li>)}
        </ul>
        <p>★★★★★ Rated 5/5 by 12 satisfied customers</p>
        <button className="bevel" onClick={() => window.print()}>Print your rap name</button>
        <p>By generating a rap name you agree that your rap name is final.</p>
      </div>}
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
    <p style={{ textAlign: "center" }}>You are visitor #<span className="counter">{String(visitors).padStart(6, "0")}</span></p>
    <p style={{ textAlign: "center" }}>
      <span className="blink">NEW!</span> <a href="#guestbook">Sign my guestbook!</a><br />
      Best viewed in Internet Explorer 6 at 800x600<br />
      Last updated: 11/03/2003<br />
      &lt; <a href="#prev">Prev</a> | <a href="#random">Random</a> | <a href="#next">Next</a> &gt; Rap Name Web Ring
    </p>
  </div>;
}
