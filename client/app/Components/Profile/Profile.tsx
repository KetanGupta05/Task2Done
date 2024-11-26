"use client";
import React from "react";
import { useUserContext } from "@/context/userContext";
import Image from "next/image";

function Profile(){
    const { user } = useUserContext();
    return (
        <div className="m-6">
          <div
            className="px-2 py-4 flex items-center gap-3 bg-[#E6E6E6]/20 rounded-[0.8rem]
            hover:bg-[#E6E6E6]/50 transition duration-300 ease-in-out cursor-pointer border-2 border-transparent hover:border-2 hover:border-white"
            
          >
            <div>
              <Image
                src={user?.photo}
                alt="avatar"
                width={70}
                height={70}
                className="rounded-full"
              />
            </div>
            </div>
            </div>
    );
}
export default Profile;