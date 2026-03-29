import { useNavigate } from 'react-router-dom';

export default function VideoCard({
  width,
  rightWidth,
  display,
  thumbnail,
  videoId,
  title,
  channel,
  channelId,
  on,
}) {
  const pageRoute = useNavigate();

  return (
    <div
      className="videoComponent relative w-[100%] cursor-pointer sm:w-[90%] md:w-[100%]"
      style={{ width: width, display: display }}
    >
      <img
        className="videoImage rounded-[12px] md:w-56 lg:w-72"
        src={thumbnail}
        alt=""
        onClick={() => pageRoute(`/watch/${videoId}`)}
      />
      <div
        className="mt-2 flex w-[100%] items-start gap-x-3"
        style={{ width: rightWidth }}
      >
        <h3
          className="w-[94%] text-[14px] leading-[20px] font-semibold lg:text-[16px]"
          onClick={() => pageRoute(`watch/${videoId}`)}
        >
          {title?.slice(0, 60)}
        </h3>
        <div className="mt-1">
          <p
            className="text-[11.5px] font-[500] tracking-wide text-[#606060] lg:text-[13.5px]"
            onClick={() => pageRoute(`/channel/${channelId}`)}
          >
            {channel}
          </p>
          <p
            className="-mt-1 text-[11.5px] font-medium tracking-wider text-[#606060] lg:text-[13.5px]"
            onClick={() => pageRoute(`/watch/${videoId}`)}
          >
            {on}
          </p>
        </div>
      </div>
    </div>
  );
}
