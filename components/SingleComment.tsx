import Image from 'next/image'
import React from 'react'
import avatar from '../public/assets/avatar2.png';
function SingleComment({comment}:any) {

  return (
    <div className='w-full flex gap-4 items-center bg-gray-200 p-5 my-5 rounded-lg shadow-xl'>
        <div>
            <Image src={avatar} width={50} height={50} alt="user comment avatar" />
        </div>
        <div>
            <h4 className='text-sm font-medium'>{comment.attributes.name} :</h4>
            <p >{comment.attributes.comment}</p>
        </div>
    </div>
  )
}

export default SingleComment