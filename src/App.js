import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import components
import Navigation from './components/Navigation';
import Todo from './components/Todo';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Todo />} />
      </Routes>
    </Router>
  );
}

export default App;
