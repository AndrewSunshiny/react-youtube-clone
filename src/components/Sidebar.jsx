import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  setSelectedCategory,
  setSidebarExtendedValue,
} from '~redux/categorySlice';
import { Navbar } from '~components';
import categories from '~utils/categories';
import Menu from '~assets/Menu';
import logo from '~assets/ytLogo.png';

export default function Sidebar() {
  const pageRoute = useNavigate();
  const dispatch = useDispatch();

  const [sidebarExtended, setSidebarExtended] = useState(false);
  const { selectedCategory } = useSelector((state) => state.category);

  const categoriesList = categories.map((el) => ({
    ...el,
    key: crypto.randomUUID(),
  }));

  return (
    <>
      <Navbar
        sidebarExtended={sidebarExtended}
        setSidebarExtended={setSidebarExtended}
      />
      <div className="absolute w-[10%] bg-[#fff] top-20 hidden sm:block">
        <div className="flex flex-col gap-y-6 fixed">
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
                className="flex items-center gap-x-4 ml-2 px-2 py-2"
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
      <div className="block sm:hidden bg-[#ffff] top-0 fixed z-10 transition ease-in-out delay-150">
        <div
          className={`${sidebarExtended ? 'flex' : 'hidden'} items-center space-x-4 ml-3 -mt-4 pl-2`}
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
          {categoriesList.map((el) => {
            sidebarExtended ?? (
              <button
                key={el.key}
                onClick={() => {
                  sidebarExtended ?? dispatch(setSidebarExtendedValue(false));
                  el.name === 'Home'
                    ? pageRoute(`/`)
                    : pageRoute(`/feed/${el.name}`);
                }}
              >
                <div
                  className="flex items-center gap-x-4 ml-2 px-2 py-2 "
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
