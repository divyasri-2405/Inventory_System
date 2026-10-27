
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleRegister(e) {
    e.preventDefault();
    setError('');

    try {
      const existing = await axios.get(
        'http://localhost:3000/users',
        {
          params: {
            email: email.trim()
          }
        }
      );

      if (existing.data.length > 0) {
        setError('This email is already registered.');
        return;
      }

      await axios.post(
        'http://localhost:3000/users',
        {
          username: username.trim(),
          email: email.trim(),
          password: password
        }
      );

      navigate('/login', { replace: true });
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  }

  return (
    <div className="form-card auth-card">
      <h2>Create Invenzo Account</h2>
      <p>Register to manage your inventory.</p>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleRegister}>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
          minLength={6}
          required
        />

        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account?{' '}
        <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;
