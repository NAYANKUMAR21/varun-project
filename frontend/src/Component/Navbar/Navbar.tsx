import { Link } from 'react-router-dom';

import DateTimeDisplay from './DateAndTime';
function Navbar({
  profileData,
}: {
  profileData: { Eid?: string; imageUrl?: string };
}) {
  return (
    <div>
      <nav
        className={`bg-white text-black p-1 fixed w-full z-10 transition-colors duration-300`}
      >
        <div className="container mx-auto mb-2 flex justify-between items-center ">
          <div className={` text-xl font-bold font-serif`}>
            <Link to="/">
              <img
                className="w-60 h-30"
                src="https://www.aequs.com/wp-content/uploads/2021/06/Aequs-Logo-new.png"
                alt="aques.sympol"
              />
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/viewtasks"
              className={`text-black  px-3 py-2 rounded font-serif`}
            >
              <div>
                <div>Id - {profileData.Eid}</div>

                <div>
                  <DateTimeDisplay />
                </div>
              </div>
            </Link>
            <Link
              to="/profile"
              className={`px-3 py-2 rounded font-serif broder border-black flex items-center bg-white`}
            >
              {/* <img
                src={`${BASE_URL}/uploads/employees/${profileData.imageUrl}`}
                alt=""
                className=" rounded-full w-10 h-10"
              /> */}
              <div>Profile</div>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
