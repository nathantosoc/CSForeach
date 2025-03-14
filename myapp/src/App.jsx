import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/data')
      .then((res) => setData(res.data))
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  const addData = () => {
    axios.post('http://localhost:5000/data', { text })
      .then((res) => {
        setData([...data, res.data]);
        setText('');
      })
      .catch((err) => console.error('Error adding data:', err));
  };

  return (
    <div>
      <h1>MongoDB Data Storage</h1>
      <input 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Enter text"
      />
      <button onClick={addData}>Add</button>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;