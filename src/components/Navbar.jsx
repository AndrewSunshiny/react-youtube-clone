import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSidebarExtendedValue } from '~redux/categorySlice';
import { Stack } from '@mui/material';
import { LinearProgress } from '@mui/material';
import Menu from '~assets/Menu';
import logo from '~assets/ytLogo.png';

export default function Navbar({ sidebarExtended, setSidebarExtended }) {
  const dispatch = useDispatch();
  const pageRoute = useNavigate();

  const { isLoading } = useSelector((state) => state.category);
  const channelLoading = useSelector((state) => state.channel.isLoading);
  const videoLoading = useSelector((state) => state.video.isLoading);
  const searchLoading = useSelector((state) => state.search.isLoading);

  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    pageRoute(`search/${searchValue}`);
    e.target.value = '';
  };
  return (
    <div className="fixed z-10 h-[50px] w-[100%] bg-[#ffff]">
      {(isLoading || videoLoading || channelLoading || searchLoading) ?? (
        <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
          <LinearProgress color="error" />
        </Stack>
      )}

      <nav className="flex h-[60px] items-center space-x-2 lg:space-x-20 xl:space-x-64">
        <div className="flex h-[60px] items-center space-x-2 lg:space-x-20 xl:space-x-64">
          <button
            onClick={() => {
              dispatch(setSidebarExtendedValue(!sidebarExtended));
              setSidebarExtended(!sidebarExtended);
            }}
          >
            <Menu />
          </button>
          <Link to="/">
            <img src={logo} className="w-32" alt="" />
          </Link>
        </div>
        <form className="-mt-3" onSubmit={handleSubmit}>
          <div className="relative w-[170px] sm:w-[420px]">
            <input
              type="search"
              name="search"
              id="default-search"
              className="block w-full rounded-lg border-[1px] border-[#cccccc] bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:outline-none"
              placeholder="Search"
              required
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button
              type="submit"
              className="absolute top-0 right-0 bottom-0 border-[1px] border-[#cccccc] bg-[#f8f8f8] px-4 py-2 text-sm font-medium text-white"
            >
              <svg
                className="h-5 w-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
          </div>
        </form>
      </nav>
    </div>
  );
}
