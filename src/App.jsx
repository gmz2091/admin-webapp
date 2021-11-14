import React from 'react';
import 'tailwindcss/tailwind.css';
import Home from './Views/Home';

const App = () => {
  const text = 'Home';
  return (
    <div className="">
      <Home title={text} />
    </div>
  );
};

export default App;
