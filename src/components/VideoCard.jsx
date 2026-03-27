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
      className="w-60 md:w-72 relative cursor-pointer"
      style={{ width: width, display: display }}
    >
      <img
        className="w-72 rounded-[12px]"
        src={thumbnail}
        alt=""
        onClick={() => pageRoute(`/watch/${videoId}`)}
      />
      <div
        className="flex w-[100%] gap-x-3 items-start mt-2"
        style={{ width: rightWidth }}
      >
        <h3
          className="text-[16px] font-semibold leading-[20px] w-[90%]"
          onClick={() => pageRoute(`watch/${videoId}`)}
        >
          {title?.slice(0, 60)}
        </h3>
        <div className="mt-1">
          <p
            className="text-[#606060] text-[13.5px] font-[500] tracking-wide"
            onClick={() => pageRoute(`/channel/${channelId}`)}
          >
            {channel}
          </p>
          <p
            className="text-[#606060] text-[13.5px] font-medium tracking-wider -mt-1"
            onClick={() => pageRoute(`/watch/${videoId}`)}
          >
            {on}
          </p>
        </div>
      </div>
    </div>
  );
}
