import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Library } from './pages/Library';
import { Projects } from './pages/Projects';
import { Resume } from './pages/Resume';
import { HistoricalJams } from './pages/HistoricalJams';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/historical-jams" element={<HistoricalJams />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
