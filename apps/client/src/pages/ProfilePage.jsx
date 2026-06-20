import React from 'react'
import { useUserStore } from '../store/useUserStore'
import { MapPin, Mail, User } from "lucide-react";
const ProfilePage = () => {
  const {user} = useUserStore();
  console.log(user)
//  const user = {
//    name: "Harsh Sharma",
//    email: "harsh@example.com",
//    location: "Ghaziabad, India",
//    profilePic: "https://i.pravatar.cc/300?img=12",
//  };

 return (
   <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
     <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
       {/* Cover */}
       <div className="h-32 bg-sky-500"></div>

       {/* Profile Image */}
       <div className="flex justify-center -mt-16">
         <img
           src={
             user.profilePic ||
             "data:image/jpeg;base64,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"
           }
           alt={user.name}
           className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-md"
         />
       </div>

       {/* User Info */}
       <div className="p-6 text-center">
         <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>

         <div className="mt-6 space-y-4 text-gray-600">
           <div className="flex items-center gap-3">
             <User size={20} />
             <span>{user.name}</span>
           </div>

           <div className="flex items-center gap-3">
             <Mail size={20} />
             <span>{user.email}</span>
           </div>

           <div className="flex items-center gap-3">
             <MapPin size={20} />
             <span>{user.location || "Not provided"}</span>
           </div>
         </div>

         <button className="mt-8 w-full bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-xl font-medium transition">
           Edit Profile
         </button>
       </div>
     </div>
   </div>
 );
}

export default ProfilePage
