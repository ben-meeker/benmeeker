import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SpotifyProvider } from './contexts/SpotifyContext';
import { Layout } from './components/Layout';
import { PlaybackBar } from './components/PlaybackBar';
import { Home } from './pages/Home';
import { Library } from './pages/Library';
import { Projects, ProjectDetail } from './pages/Projects';
import { Resume } from './pages/Resume';
import { References } from './pages/References';
import { HistoricalJams } from './pages/HistoricalJams';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <SpotifyProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/library" element={<Library />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectId" element={<ProjectDetail />} />
            <Route path="/historical-jams" element={<HistoricalJams />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/references" element={<References />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
        <PlaybackBar />
      </Router>
    </SpotifyProvider>
  );
}

export default App;
