import { BASE_URL } from '../../AxiosApi';
import Navbar from '../Navbar/Navbar';

const ProfileView = () => {
  // Dummy data

  const profiles = JSON.parse(localStorage.getItem('employee') || 'null');

  console.log(profiles);

  const profile = {
    name: profiles.name,
    email: profiles.email,
    phone: profiles.phone,
    address: profiles.address,
    employeeId: profiles.employeeId,
    department: profiles.department,
    designation: profiles.designation,
    salary: profiles.salary,
    imageUrl: profiles.profile,
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${'https://png.pngtree.com/thumb_back/fh260/background/20220322/pngtree-background-biru-keren-dan-kosong-abstract-untuk-template-desain-powerpoint-ppt-image_1067979.jpg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Navbar
          profileData={{ Eid: profile.employeeId, imageUrl: profile.imageUrl }}
        />

        <div className="max-w-lg mx-auto  w-[500px] absolute top-40 left-1/3  p-6 bg-white shadow-lg rounded-lg ">
          <div className="flex justify-center mb-6 ">
            {/* <img
              src={`${BASE_URL}/uploads/employees/${profile.imageUrl}`}
              alt="Profile"
              className="w-32 h-32 rounded-full shadow-md"
            /> */}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Profile Details
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 font-medium">Name</label>
              <p className="text-gray-800">{profile.name}</p>
            </div>
            <div>
              <label className="block text-gray-600 font-medium">Email</label>
              <p className="text-gray-800">{profile.email}</p>
            </div>
            {/* <div>
                    <label className="block text-gray-600 font-medium">Phone</label>
                    <p className="text-gray-800">{profile.phone}</p>
                </div> */}
            {/* <div>
                    <label className="block text-gray-600 font-medium">Address</label>
                    <p className="text-gray-800">{profile.address}</p>
                </div> */}
            <div>
              <label className="block text-gray-600 font-medium">
                Employee ID
              </label>
              <p className="text-gray-800">{profile.employeeId}</p>
            </div>
            <div>
              <label className="block text-gray-600 font-medium">
                Department
              </label>
              <p className="text-gray-800">{profile.department}</p>
            </div>
            {/* <div>
                    <label className="block text-gray-600 font-medium">Designation</label>
                    <p className="text-gray-800">{profile.designation}</p>
                </div>
                <div>
                    <label className="block text-gray-600 font-medium">Salary</label>
                    <p className="text-gray-800">${profile.salary.toLocaleString()}</p>
                </div> */}
            <div>
              <button
                type="button"
                className="h-9 w-20 rounded bg-gray-900 text-white"
                onClick={() => {
                  window.location.href = '/';
                  localStorage.removeItem('employee');
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileView;
