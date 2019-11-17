import React, { useState } from 'react';

const Login: React.FC = () => {
  const [error, setError] = useState({ message: '' });
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(false);

  function handleSubmit(event: any) {
    event.preventDefault();
    const { usernameInput, passwordInput } = event.target.elements;

    setLoading(true);
    setResolved(false);
    setError({ message: '' });

    const parameters: RequestInit = {
      body: JSON.stringify({
        password: passwordInput.value,
        username: usernameInput.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    };

    fetch('http://localhost:3002/api/login', parameters)
      .then((r) => r.json()) // Promise.reject({ 'message': 'i dont like it' }))
      .then(
        (user) => {
          setLoading(false);
          setResolved(true);
          setError({ message: '' });
          localStorage.setItem('token', user.token);
        },
        (err) => {
          setLoading(false);
          setResolved(false);
          setError({ message: err.message });
          localStorage.removeItem('token');
        },
      );
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='usernameInput'>Username</label>
          <input id='usernameInput' />
        </div>
        <div>
          <label htmlFor='passwordInput'>Password</label>
          <input id='passwordInput' type='password' />
        </div>
        <button type='submit'>Submit{loading ? '...' : null}</button>
      </form>
      {error.message !== '' ? <div role='alert'>{error.message}</div> : null}
      {resolved ? (
        <div role='alert'>Congrats! You're signed in!</div>
      ) : null}
    </div>
  );
};

export default Login;
