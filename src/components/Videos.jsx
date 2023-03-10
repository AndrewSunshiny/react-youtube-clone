import { Stack, Box } from '@mui/material'
import { VideoCard, ChannelCard } from '.'

const Videos = ({ videos, style }) => {
  if (!videos?.length) return 'Loading...'

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      justifyContent="start"
      gap={2}
      sx={{
        ...style,
      }}
    >
      {videos.map((item, key) => (
        <Box key={key}>
          {item.id.videoId && <VideoCard video={item} />}
          {item.id.channelId && <ChannelCard channelDetail={item} />}
        </Box>
      ))}
    </Stack>
  )
}

export default Videos
