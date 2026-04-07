import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useGoogle from '~/hooks/useGoogle';
import Feed from '~pages/Feed';
import ChannelDetails from '~pages/ChannelDetails';
import SearchFeed from '~pages/SearchFeed';
import VideoDetails from '~pages/VideoDetails';
import Sidebar from '~components/Sidebar';

function App() {
  useGoogle();

  return (
    <Router>
      {/* <Sidebar /> */}
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/feed/:id" element={<Feed />} />
        {/* <Route path="/channel/:id" element={<ChannelDetails />} />
        <Route path="/search/:id" element={<SearchFeed />} />
        <Route path="/watch/:id" element={<VideoDetails />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
