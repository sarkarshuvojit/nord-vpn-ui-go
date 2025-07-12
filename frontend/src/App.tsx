import { useState } from 'react';
import './App.css';
import { LoginPage } from './components/LoginPage';
import { VPNDashboard } from './components/VPNDashboard';

interface User {
  email: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (email: string, password: string) => {
    // Simulate authentication - in real app, this would call an API
    setUser({ email });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div id="App">
      {user ? (
        <VPNDashboard user={user} onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
