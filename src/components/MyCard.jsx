import React, { useCallback, useEffect, useState } from 'react'
import appwriteServices from '../appwrite/conf.js'
import { Link } from 'react-router'

function MyCard({$id, title, featuredImage, $createdAt}) {
  const [img, setImg] = useState('')
  const [date, setDate] = useState('')

  const calculateDate = useCallback((date)=>{
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let datenow = date.split("T");
    let dateArray = datenow[0]
    let dateYearMonth = dateArray.split("-")
    const year = dateYearMonth[0]
    const month = dateYearMonth[1].split('')[1]
    const currMonth = months[month-1];
    const curdate = dateYearMonth[2]
    console.log(year, month, curdate)

    const currDate = `${curdate} ${currMonth}, ${year}`
    return currDate;

  }, [])

  useEffect(()=>{
    const imageSrc = appwriteServices.getFilePreview(featuredImage);
    const currDate = calculateDate($createdAt);
    setDate(currDate);
    setImg(imageSrc);
  }, [featuredImage])

  return (
      <div className="bg-gray-200 h-90 w-full rounded-xl border border-gray-200">
        <div className="h-1/2 rounded-t-xl bg-image bg-cover bg-no-repeat bg-center"
          style={{backgroundImage: `url(${img})`}}
        >
        </div>
        <div className="py-4 px-3 flex flex-col gap-4">
        <div className="text-gray-700">{date}</div>
        <h2 className='font-semibold'>{title}</h2>
        <Link to={`/post/${$id}`} className="text-gray-700 hover:text-gray-800">Read blog <span>{">"}</span></Link>
        </div>
      </div>
  )
}

export default MyCard
