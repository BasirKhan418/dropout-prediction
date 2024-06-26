import React from 'react'
import VideoPlayero from '@/utilities/Course/VideoPlayer'
import Head from 'next/head'
const Page = ({params}) => {
  return (
    <div>
        <Head>
        <link rel="stylesheet" href="https://vjs.zencdn.net/7.19.2/video-js.css" />
        </Head>
      <h1 className='text-black'>
        Page Content {params.detail}
        <VideoPlayero videoId={"8eU-H7ciabo"} />
      </h1>
    </div>
  )
}

export default Page
