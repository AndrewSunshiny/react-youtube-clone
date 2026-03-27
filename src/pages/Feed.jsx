import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryVideos } from '~redux/categorySlice';
import VideoCard from '~components/VideoCard';
import timeSince from '~utils/date';
import '~pages/feed.css';

const aDay = 24 * 60 * 60 * 1000;

export default function Feed() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { categoryVideos } = useSelector((state) => state.category);
  const { sidebarExtended } = useSelector((state) => state.category);
  const pageRoute = useNavigate();

  const videos = categoryVideos?.map((video) => ({
    ...video,
    key: crypto.randomUUID(),
  }));

  useEffect(() => {
    dispatch(getCategoryVideos(`search?part=snippet&q=${id ?? 'suggested'}`));
    document.title = `${id ?? 'Home'} - Youtube`;
  }, [dispatch, id]);

  return (
    <>
      <div
        className={`sm:hidden overlayEffect ${sidebarExtended ? 'block' : 'hidden'}`}
      ></div>
      <div
        className={`pl-0 ${sidebarExtended ? 'sm:pl-[180px]' : 'sm:pl-[70px]'} flex flex-wrap gap-x-[3%] pt-20 ml-4 gap-y-6`}
      >
        {videos?.map((el, key) => (
          <div style={{ marginTop: '0px' }} key={key}>
            <VideoCard
              title={el.snippet?.title}
              thumbnail={el.snippet?.thumbnails?.medium?.url}
              on={timeSince(
                new Date(Date.parse(el.snippet.publishedAt) - aDay),
              )}
              channel={el.snippet?.channelTitle}
              channelId={el.snippet?.channelId}
              videoId={el.id?.videoId}
            />
          </div>
        ))}
      </div>
    </>
  );
}
