import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Feed } from '~pages';
import Sidebar from '~components/Sidebar';

function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/feed/:id" element={<Feed />} />
        <Route path="/channel/:id" element={<ChannelDetails />} />
        <Route path="/search/:id" element={<SearchFeed />} />
        <Route path="/watch/:id" element={<VideoDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
