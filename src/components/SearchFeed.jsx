import { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { Videos } from '.'
import { fetchFromAPI } from '../utils/fetchFromAPI'

const SearchFeed = () => {
  const [videos, setVideos] = useState([])

  const { searchItem } = useParams()

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchItem}`).then((data) =>
      setVideos(data?.items)
    )
  }, [searchItem])

  return (
    <Box
      p={2}
      sx={{
        overflowY: 'auto',
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: 'white' }}>
        Search results for:{' '}
        <span style={{ color: '#F31503' }}>{searchItem}</span>
      </Typography>

      <Videos
        videos={videos}
        style={{
          justifyContent: 'center',
        }}
      />
    </Box>
  )
}

export default SearchFeed
