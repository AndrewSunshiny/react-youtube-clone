import {
  ChannelDetail,
  Feed,
  Navbar,
  SearchFeed,
  VideoDetail,
} from './components'
import { Box } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => (
  <BrowserRouter>
    <Box sx={{ backgroundColor: '#000' }}>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Feed />}></Route>
        <Route path="/video/:id" element={<VideoDetail />}></Route>
        <Route path="/channel/:id" element={<ChannelDetail />}></Route>
        <Route path="/search/:searchItem" element={<SearchFeed />}></Route>
      </Routes>
    </Box>
  </BrowserRouter>
)

export default App
