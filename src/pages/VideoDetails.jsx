import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getVideoDetails, getRelatedVideos } from '~redux/videoSlice';
import { FiThumbsUp } from 'react-icons/fi';
import timeSince from '~utils/date';
import convertToInternationalCurrencySystem from '~utils/convert';

const aDay = 24 * 60 * 60 * 1000;

function Video({ videoId, thumbnail, channelId, channel, title, on }) {
  const pageRoute = useNavigate();

  return (
    <div className="cursor-pointerflex flex w-[90%] w-[98%] cursor-pointer flex-col items-center gap-x-4 sm:w-[90%] sm:flex-row sm:items-center sm:items-start">
      <img
        alt="Video Thumbnail"
        onClick={() => pageRoute(`/watch/${videoId}`)}
        className="w-[100%] bg-cover sm:h-[110px] sm:w-[210px]"
        src={thumbnail}
      />
      <div>
        <h3
          onClick={() => pageRoute(`/watch/${videoId}`)}
          className="w-[100%] text-[15px] font-medium tracking-wide text-[#000000] sm:w-[110%] md:text-[16px] md:leading-[24px] lg:text-[18px]"
        >
          {title}
        </h3>
        <div
          onClick={() => pageRoute(`/channel/${channelId}`)}
          className="sm:mt-1"
        >
          <p className="text-[13.5px] font-[500] tracking-wide text-[#606060]">
            {channel}
          </p>
          <p className="-mt-1 text-[13.5px] font-medium tracking-wider text-[#606060]">
            {on}
          </p>
        </div>
      </div>
    </div>
  );
}
function VideoDetails() {
  const dispatch = useDispatch();
  const pageRoute = useNavigate();
  const id = useParams();

  const { sidebarExtend } = useSelector((state) => state.category);
  const { videoDetails } = useSelector((state) => state.video);
  const { relatedVideos } = useSelector((state) => state.video);

  const tagsList = videoDetails?.snippet?.tags?.map((el) => ({
    el,
    key: crypto.randomUUID(),
  }));
  const relatedVideosList = relatedVideos.map((el) => ({
    el,
    key: crypto.randomUUID(),
  }));

  useEffect(() => {
    dispatch(getVideoDetails(`videos?part=snippet,statistics&id=${id}`));
    dispatch(
      getRelatedVideos(`search?part=snippet&relatedToVideoId=${id}&type=video`),
    );
  }, [id, dispatch]);

  return (
    <>
      <div
        className={`overlayEffect sm:hidden ${sidebarExtend ? 'block' : 'hidden'}`}
      ></div>

      <div
        className={`pl-0 ${sidebarExtend ? 'sm:pl-[180px]' : 'sm:pl-[70px]'} ml-4 pt-20 lg:flex lg:gap-x-7`}
      >
        <div className="container h-[240px] w-[96%] sm:h-[320px] lg:h-[430px] lg:max-w-[850px]">
          <ReactPlayer
            width="100%"
            height="100%"
            className="react-player"
            url={`https://www.youtube.com/watch?v=${id}`}
            controls
          />
          <div>
            <div className="flex gap-x-1">
              {tagsList?.map(({ el, key }, index) => {
                return (
                  <a
                    style={{ display: index > 3 ? 'none' : '' }}
                    className="text-[13px] font-normal text-[#3366CC]"
                    href={`${el}`}
                    key={key}
                  >
                    {el?.slice(0, 15)}
                  </a>
                );
              })}
            </div>
            <h2 className="text-md font-medium text-[#000000] sm:text-xl md:text-2xl">
              {videoDetails?.snippet?.title}
            </h2>
            <div className="mt-3 items-center justify-between space-y-3 sm:flex">
              {/* <img className='rounded-[20px]' src="https://yt3.ggpht.com/wg1TITEoPfxvBGfzuqWyt3bqm_qu35ZhMswUv3feetU3xNX_6wsAXZF40OlPIgY4TmqbqCmAZ1U=s48-c-k-c0x00ffffff-no-rj" /> */}
              {/* <div className='flex flex-col -gap-y-6'> */}

              <h5
                onClick={() =>
                  pageRoute(`/channel/${videoDetails?.snippet?.channelId}`)
                }
                className="sm:text-md w-fit rounded-[10px] bg-[#f2f2f2] px-3 py-2 text-sm font-medium tracking-wide text-[#000000]"
              >
                {videoDetails?.snippet?.channelTitle}
              </h5>

              {/* </div> */}

              <div className="mb-5 flex items-center gap-x-3 sm:mb-0">
                <div className="flex items-center rounded-[10px] bg-[#f2f2f2] px-3 py-2">
                  <FiThumbsUp className="h-6 w-10" />
                  <span className="text-[12.4px] font-medium tracking-wide text-[#0f0f0f] sm:text-[14.4px]">
                    {convertToInternationalCurrencySystem(
                      videoDetails?.statistics?.likeCount,
                    ) + ' Likes'}
                  </span>
                </div>
                <span className="rounded-[10px] bg-[#f2f2f2] px-3 py-2 text-[12.4px] font-medium tracking-wide text-[#0f0f0f] sm:text-[14.4px]">
                  {convertToInternationalCurrencySystem(
                    videoDetails?.statistics?.viewCount,
                  ) + ' Views'}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-48 flex flex-col gap-y-4 sm:mt-40 lg:mt-0">
          {relatedVideosList?.map(({ el, key }) => {
            return (
              <Video
                key={key}
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
    </>
  );
}

export default VideoDetails;
export { Video };
