'use client';

import { Puff } from  'react-loader-spinner'

const Loader = () => {
  return ( 
    <div
    className="
      h-[70vh]
      flex 
      flex-col 
      justify-center 
      items-center 
    "
    >
      <Puff
        height = "100"
        width = "100"
        radius = {1}
        color = 'green'
        ariaLabel = 'three-dots-loading'  
        visible={true}   
      />
    </div>
   );
}
 
export default Loader;