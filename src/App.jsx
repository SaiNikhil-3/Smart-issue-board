import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import Auth from "./Auth";
import Board from "./Board";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div className="loader">Loading...</div>;

  return user ? (
    <>
      <header className="top-bar">
        <h2>Smart Issue Board</h2>
        <div className="user-info">
          {user.email}
          <button onClick={() => signOut(auth)}>Sign out</button>
        </div>
      </header>
      <Board user={user} />
    </>
  ) : (
    <Auth />
  );
}

export default App;
