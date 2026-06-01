import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@miamibrightcleaning.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setErrorMessage('');

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (error) {
      console.error('Login error:', error);
      setErrorMessage('Invalid email or password.');
      return;
    }

    navigate('/admin');
  }

  return (
    <main className="admin-login-page">
      <section className="admin-login-card">
        <span className="eyebrow">Admin access</span>

        <h1>Welcome back</h1>

        <p>
          Sign in to manage cleaning bookings, customer requests and service
          status.
        </p>

        <form onSubmit={handleLogin}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder="admin@miamibrightcleaning.com"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              placeholder="Your password"
            />
          </label>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <a href="/" className="admin-login-link">
          Back to website
        </a>
      </section>
    </main>
  );
}