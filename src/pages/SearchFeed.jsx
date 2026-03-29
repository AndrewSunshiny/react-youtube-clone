import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { searchById } from '~redux/searchSlice';
import timeSince from '~utils/date';

const aDay = 24 * 60 * 60 * 1000;

export default function SearchFeed() {
  const dispatch = useDispatch();
  const pageRoute = useNavigate();
  const { id } = useParams();
  const { searchResults } = useSelector((state) => state.search);
  const { sidebarExtend } = useSelector((state) => state.category);

  const searchResultsList = searchResults.map((el) => ({
    el,
    key: crypto.randomUUID(),
  }));

  useEffect(() => {
    dispatch(searchById(`search?part=snippet&q=${id}`));
  }, [id, dispatch]);

  return (
    <>
      <div
        className={`overlayEffect sm:hidden ${sidebarExtend ? 'block' : 'hidden'}`}
      ></div>
      <div
        className={`pl-0 ${sidebarExtend ? 'sm:pl-[180px]' : 'sm:pl-[70px]'} w-100% ml-4 flex flex-col gap-y-5 pt-20`}
      >
        {searchResultsList.map(({ el, key }) => (
          <div
            key={key}
            className="flex w-[98%] cursor-pointer flex-col justify-center gap-x-4 gap-y-3 sm:mx-0 sm:flex-row md:gap-x-8"
          >
            <img
              onClick={() => pageRoute(`/watch/${el.id?.videoId}`)}
              className="w-[97%] sm:w-[29%] sm:rounded-[23px] md:w-[25%]"
              src={el.snippet?.thumbnails?.medium?.url}
            />
            <div className="w-[92%] sm:w-[60%] md:w-[70%] lg:w-[60%]">
              <h3 className="text-md traking-wide leading-[19px] font-normal text-[#0f0f0f] sm:text-lg sm:leading-[22px] md:text-xl md:leading-[24px]">
                {el.snippet?.title}
              </h3>
              <span className="text-[12px] text-[#606060]">
                {timeSince(
                  new Date(Date.parse(el.snippet?.publishedAt) - aDay),
                )}
              </span>
              <h4
                onClick={() => pageRoute(`/channel/${el.snippet?.channelId}`)}
                className="text-[12px] font-medium text-[#606060] sm:my-1"
              >
                {el.snippet?.channelTitle}
              </h4>
              <p
                onClick={() => pageRoute(`/watch/${el.id?.videoId}`)}
                className="traking-wider text-[10px] text-[13px] leading-[16px] font-normal sm:text-[#0f0f0f]"
              >
                {el.snippet?.description?.slice(0, 124) + '...'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
