import React from 'react';
import Profile from '../Profile/Profile';
import RadialChart from '../RadialChart/RadialChart';
import { useUserContext } from "@/context/userContext";

function Sidebar() {
  const { logoutUser } = useUserContext();

  return (
    <div className="w-[20rem] h-screen fixed right-0 top-0 bg-[#f9f9f9] flex flex-col">
      {/* Scrollable Section */}
      <div className="flex-1 overflow-y-auto">
        <Profile />
        <div className="mt-4 mx-6">
          <RadialChart />
        </div>
      </div>

      {/* Fixed Footer Section */}
      <div className="p-6 bg-[#f9f9f9]">
        <button
          className="w-full py-4 px-8 bg-[#EB4E31] text-white rounded-[50px] hover:bg-[#3aafae] transition duration-200 ease-in-out"
          onClick={logoutUser}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
