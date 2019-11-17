import React from 'react';
import HiddenMessage from './components/HiddenMessage';
import Login from './components/Login';

const App: React.FC = () => {
  return (
    <div>
      <h1>Learn React</h1>
      <HiddenMessage>Hello</HiddenMessage>
      <Login />
    </div>
  );
};

export default App;
