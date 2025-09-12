import React from 'react'

const PeopleAlsoBoughtSkeleton = () => {
 return (
    <div className="">
    
      <div className="flex gap-3 flex-wrap">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div  key={idx} className='bg-white  rounded-xl shadow-md p-2 animate-pulse '>
            <div
           
            className="w-44 h-40 bg-gray-300 rounded-lg shadow-sm animate-pulse"
          ></div>
          </div>
          
        ))}
      </div>
    </div>
  );
}

export default PeopleAlsoBoughtSkeleton