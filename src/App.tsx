import React from 'react';
import './App.css';
import HiddenMessage from './components/HiddenMessage';

const App: React.FC = () => {
  return (
    <div>
      <h1>Learn React</h1>
      <HiddenMessage>Hello</HiddenMessage>
    </div>
  );
};

export default App;
