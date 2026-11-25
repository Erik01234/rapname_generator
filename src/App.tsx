import { useEffect, useState } from 'react';

export default function App() {
  const [message, setMessage] = useState('Connecting to backend...');

  useEffect(() => {
    fetch('/api/ping')
      .then((res) => res.json())
      .then((data) => setMessage(data.status))
      .catch(() => setMessage('Error connecting to backend'));
  }, []);

  return <h1>{message}</h1>;
}
