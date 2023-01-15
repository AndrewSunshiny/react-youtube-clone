import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import { Videos, ChannelCard } from '.'
import { fetchFromAPI } from '../utils/fetchFromAPI'

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null)
  const [videos, setVideos] = useState([])

  const { id } = useParams()

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) => {
      console.log(data)
      setChannelDetail(data?.items?.at(0))
    })

    console.log(id)

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then(
      (data) => setVideos(data?.items)
    )
  }, [id])

  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            background:
              'linear-gradient(297deg, rgba(173,48,48,1) 0%, rgba(148,99,190,1) 58%, rgba(0,212,255,1) 100%)',
            zIndex: 10,
            height: '300px',
          }}
        />
        {console.log(channelDetail)}
        <ChannelCard
          channelDetail={channelDetail}
          style={{ marginTop: '-110px' }}
        />
      </Box>

      <Box display="flex" p="2">
        <Videos videos={videos} style={{ justifyContent: 'center' }} />
      </Box>
    </Box>
  )
}

export default ChannelDetail
