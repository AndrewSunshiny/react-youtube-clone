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

  const videosList = categoryVideos?.map((el) => ({
    ...el,
    key: crypto.randomUUID(),
  }));

  useEffect(() => {
    dispatch(getCategoryVideos(`search?part=snippet&q=${id ?? 'suggested'}`));
    document.title = `${id || 'Home'} - Youtube`;
  }, [dispatch, id]);

  return (
    <>
      <div
        className={`overlayEffect sm:hidden ${sidebarExtended ? 'block' : 'hidden'}`}
      ></div>
      <div
        className={`pl-0 ${sidebarExtended ? 'sm:pl-[180px]' : 'sm:pl-[70px]'} feedGrid mx-3 grid max-w-[100%] gap-x-[4%] gap-y-6 bg-contain pt-20 sm:ml-4 sm:grid-cols-2 md:grid-cols-3 md:pr-[28px] lg:pr-14 2xl:grid-cols-4`}
      >
        {videosList?.map((el) => (
          <div style={{ marginTop: '0px' }} key={el.key}>
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
