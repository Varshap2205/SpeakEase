import { useState } from "react";

const SimpleAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  // Simulate user database (in real app, this would be a backend)
  const users = JSON.parse(localStorage.getItem('users') || '[]');

  const handleSubmit = () => {
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (isSignup) {
      // Sign up logic
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        setError("User already exists");
        return;
      }
      
      const newUser = { email, password };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      setUser({ email });
      setIsLoggedIn(true);
      setEmail("");
      setPassword("");
    } else {
      // Login logic
      const existingUser = users.find(u => u.email === email && u.password === password);
      if (!existingUser) {
        setError("Invalid email or password");
        return;
      }
      
      setUser({ email });
      setIsLoggedIn(true);
      setEmail("");
      setPassword("");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4">
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-white text-2xl mb-4">Welcome!</h2>
          <p className="text-green-400 mb-6">Logged in as: {user?.email}</p>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-white text-2xl font-bold text-center mb-6">
          {isSignup ? "Sign Up" : "Login"}
        </h2>
        
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg border border-green-500 bg-gray-800 text-white focus:ring-2 focus:ring-green-500 outline-none"
          />
          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg border border-green-500 bg-gray-800 text-white focus:ring-2 focus:ring-green-500 outline-none"
          />
          
          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            {isSignup ? "Create Account" : "Login"}
          </button>
        </div>

        <div className="text-center mt-4">
          <p className="text-gray-400 text-sm">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => {
                setIsSignup(!isSignup);
                setError("");
              }}
              className="text-green-400 hover:text-green-300 underline"
            >
              {isSignup ? "Login" : "Sign Up"}
            </button>
          </p>
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
        )}
      </div>
    </div>
  );
};

export default SimpleAuth;