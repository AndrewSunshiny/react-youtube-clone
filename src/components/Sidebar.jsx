import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  setSelectedCategory,
  setSidebarExtendedValue,
} from '~redux/categorySlice';
import { Navbar } from '~components/Navbar';
import categories from '~utils/categories';
import Menu from '~assets/Menu';
import logo from '~assets/ytLogo.png';

export default function Sidebar() {
  const pageRoute = useNavigate();
  const dispatch = useDispatch();

  const [sidebarExtended, setSidebarExtended] = useState(false);
  const { selectedCategory } = useSelector((state) => state.category);

  const categoriesList = categories.map((el) => ({
    el,
    key: crypto.randomUUID(),
  }));

  return (
    <>
      <Navbar
        sidebarExtended={sidebarExtended}
        setSidebarExtended={setSidebarExtended}
      />
      <div className="absolute top-20 hidden w-[10%] bg-[#fff] sm:block">
        <div className="fixed z-20 flex flex-col gap-y-6">
          {categoriesList.map((el) => {
            <button
              key={el.key}
              onClick={() => {
                dispatch(setSelectedCategory(el.name));
                el.name === 'Home'
                  ? pageRoute('/')
                  : pageRoute(`/feed/${el.name}`);
              }}
            >
              <div
                className="ml-2 flex items-center gap-x-4 px-2 py-2"
                style={{
                  backgroundColor:
                    selectedCategory === el.name ? '#f2f2f2' : '#fff',
                  borderRadius: selectedCategory === el.name ? '10px' : '0px',
                }}
              >
                {selectedCategory === el.name ? el.active : el.icon}
                {sidebarExtended ?? (
                  <h4 className="text-md font-semibold tracking-wide">
                    {el.name}
                  </h4>
                )}
              </div>
            </button>;
          })}
        </div>
      </div>
      <div className="fixed top-0 z-10 block h-[100vh] bg-[#ffff] transition delay-150 ease-in-out sm:hidden">
        <div
          className={`${sidebarExtended ? 'flex' : 'hidden'} -mt-4 ml-3 items-center space-x-4 pl-2`}
        >
          <button
            onClick={() => {
              dispatch(setSidebarExtendedValue(!sidebarExtended));
              setSidebarExtended(!sidebarExtended);
            }}
          >
            <Menu />
          </button>
          <Link to="/">
            <img className="w-32" src={logo} alt="" />
          </Link>
        </div>
        <div className="flex flex-col gap-y-6">
          {categoriesList.map(({ el, key }) => {
            sidebarExtended ?? (
              <button
                key={key}
                onClick={() => {
                  sidebarExtended ?? dispatch(setSidebarExtendedValue(false));
                  el.name === 'Home'
                    ? pageRoute(`/`)
                    : pageRoute(`/feed/${el.name}`);
                }}
              >
                <div
                  className="ml-2 flex items-center gap-x-4 px-2 py-2"
                  style={{
                    backgroundColor:
                      selectedCategory === el.name ? '#f2f2f2' : '#fff',
                    borderRadius: selectedCategory === el.name ? '10px' : '0px',
                  }}
                >
                  {selectedCategory === el.name ? el.active : el.icon}
                  <h4 className="text-md font-semibold tracking-wide">
                    {el.name}
                  </h4>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
