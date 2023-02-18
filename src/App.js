import React, { useState } from 'react';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');

  const [resp, setResp] = useState();

  const poolData = {
    UserPoolId: 'Your User Pool ID',
    ClientId: 'Your Client ID',
  };

  const UserPool = new CognitoUserPool(poolData);

  const onSubmit = (event) => {
    event.preventDefault();
    UserPool.signUp(
      email,
      password,
      [
        { Name: 'name', Value: name },
        { Name: 'preferred_username', Value: username },
        { Name: 'gender', Value: gender },
      ],
      null,
      (err, data) => {
        if (err) console.error(err);
        console.log(data);
        setResp(JSON.stringify(data));
      }
    );
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={'Email'}
          required
        />

        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder={'Password'}
          required
        />

        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder={'Name'}
          required
        />

        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder={'Username'}
          required
        />

        <input
          value={gender}
          onChange={(event) => setGender(event.target.value)}
          placeholder={'Gender'}
          required
        />

        <button type="submit">Signup</button>
      </form>
      <div>
        <h2>Response</h2>
        <div>{resp && <>{resp}</>}</div>
      </div>
    </div>
  );
};

export default App;
