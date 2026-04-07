import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getChannelVideos, getChannelDetails } from '~redux/channelSlice';
import VideoCard from '~components/VideoCard';
import convertToInternationalCurrencySystem from '~utils/convert';
import timeSince from '~utils/date';

const aDay = 24 * 60 * 60 * 1000;

export default function ChannelDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { sidebarExtend } = useSelector((state) => state.category);
  const { channelDetails } = useSelector((state) => state.channel);
  const { channelVideos } = useSelector((state) => state.channel);

  const videosList = channelVideos.map((el) => ({
    ...el,
    key: crypto.randomUUID(),
  }));

  useEffect(() => {
    dispatch(
      getChannelVideos(`search?channleId=${id}&part=snippet&order=date`),
    );
    dispatch(
      getChannelDetails(`search?channleId=${id}&part=snippet&order=date`),
    );
  }, [id, dispatch]);

  return (
    <>
      <div
        className={`overlayEffect sm:hidden ${sidebarExtend ? 'block' : 'hidden'}`}
      ></div>

      <div
        className={`ml-4 pt-14 pl-0 ${sidebarExtend ? 'sm:pl-[180px]' : 'sm:pl-[70px]'}`}
      >
        {/* <img style={{ backgroundSize: "cover" }} className='w-[100%] h-[100px]' src= /> */}
        <img
          className="h-[120px] w-[100%] bg-cover sm:h-[160px] lg:h-[210px]"
          style={{
            background: `url(${channelDetails?.brandingSettings?.image?.bannerExternalUrl})`,
          }}
        />
        <div className="my-5 flex items-center gap-x-5">
          <img
            className="h-12 w-12 rounded-[40px] md:h-16 md:w-16"
            src={channelDetails?.snippet?.thumbnails?.medium?.url}
          />
          <div className="flex flex-col">
            <h3 className="text-md font-medium tracking-wide md:text-xl">
              {channelDetails?.snippet?.title}
            </h3>
            <div className="flex flex-col">
              <span className="text-[12px] font-[500] tracking-wide text-[#323232] md:text-[14px]">
                {channelDetails?.snippet?.customUrl}
              </span>
              <span className="-mt-1 text-[12px] font-[500] tracking-wider text-[#323232] md:text-[13px]">
                {convertToInternationalCurrencySystem(
                  channelDetails?.statistics?.subscriberCount,
                )}
              </span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-[16px] font-bold tracking-wider text-[#585858]">
            VIDEOS
          </h4>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-3">
            {videosList.map((el) => {
              return (
                <VideoCard
                  key={el.key}
                  thumbnail={el.snippet?.thumbnails?.medium?.url}
                  width="210px"
                  title={el.snippet.title}
                  channel={el.snippet.channelTitle}
                  on={timeSince(
                    new Date(Date.parse(el.snippet.publishedAt) - aDay),
                  )}
                  channelId={el.snippet.channelId}
                  videoId={el.id.videoId}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
