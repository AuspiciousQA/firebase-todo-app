import React, { useEffect, useState } from 'react';
import { auth, provider, db } from './firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc,
} from 'firebase/firestore';

function App() {
  const [user, setUser] = useState(null);
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  // Sign In
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((res) => setUser(res.user))
      .catch((err) => console.error(err));
  };

  // Sign Out
  const handleLogout = () => {
    signOut(auth).then(() => setUser(null));
  };

  // Add Task to Firestore
  const handleAddTask = async () => {
    if (!task) return;
    await addDoc(collection(db, 'tasks'), {
      task,
      user: user.uid,
    });
    setTask('');
  };

  // Fetch Tasks in Real Time
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'tasks'), (snapshot) => {
      const tasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTaskList(tasks.filter((t) => t.user === user?.uid));
    });
    return () => unsubscribe();
  }, [user]);

  // Delete Task
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'tasks', id));
  };

  return (
    <div style={{ textAlign: 'center', padding: 20 }}>
      <h1>🔥 Firebase To-Do App</h1>

      {!user ? (
        <button onClick={handleLogin}>Sign in with Google</button>
      ) : (
        <>
          <p>Welcome, {user.displayName}</p>
          <img src={user.photoURL} alt="Profile" width={80} />
          <br />
          <button onClick={handleLogout}>Logout</button>

          <div style={{ marginTop: 20 }}>
            <input
              type="text"
              placeholder="Enter task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button onClick={handleAddTask}>Add Task</button>
          </div>

          <ul style={{ listStyle: 'none', padding: 0 }}>
            {taskList.map((t) => (
              <li key={t.id} style={{ margin: '10px 0' }}>
                {t.task}
                <button onClick={() => handleDelete(t.id)} style={{ marginLeft: 10 }}>
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
