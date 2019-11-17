import React, { useState } from 'react';

function Login() {
  // const [state, setState] = React.useReducer((s, a) => ({ ...s, ...a }), {
  //   error: null,
  //   loading: false,
  //   resolved: false,
  // });

  const [error, setError] = useState({message: ''});
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(false);


  function handleSubmit(event: any) {
    event.preventDefault();
    const { usernameInput, passwordInput } = event.target.elements;
    // console.log(`usernameInput=${usernameInput.value} and passwordInput=${passwordInput.value}`);
    // setState({ loading: true, resolved: false, error: null });
    setLoading(true);
    setResolved(false);
    setError({message: ''});

    // const parameters :RequestInit = {
    //   body: 'Hello',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': '*'
    //   },
    //   method: 'POST',
    //   mode: 'no-cors'
    // };

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
          // setState({ loading: false, resolved: true, error: null });
          setLoading(false);
          setResolved(true);
          setError({message: ''});
          window.localStorage.setItem('token', user.token);
        },
        (err) => {
          // console.log('err ' + err);
          // setState({ loading: false, resolved: false, error: err['message'] });
          setLoading(false);
          setResolved(false);
          setError({message: err.message});
          window.localStorage.removeItem('token');
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
}

export default Login;


// ,
//           'X-Requested-With': 'XMLHttpRequest',
//           'Access-Control-Allow-Origin': '*'
