import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { VocabularyProvider } from './context/VocabularyContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import MemorizeMode from './pages/MemorizeMode';
import TestMode from './pages/TestMode';
import WeakMode from './pages/WeakMode';
import './App.css';

function App() {
  return (
    <VocabularyProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/memorize" element={<MemorizeMode />} />
            <Route path="/test" element={<TestMode />} />
            <Route path="/weak" element={<WeakMode />} />
          </Routes>
        </Layout>
      </Router>
    </VocabularyProvider>
  );
}

export default App;
