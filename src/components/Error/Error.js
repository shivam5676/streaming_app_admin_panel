import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

const Error = ({message, statusCode, redirectURL}) => {
    const location=useLocation()
    const params=useParams()
    console.log(location)
    console.log(params)
  return (
    <div className=" w-[100%] h-[calc(100vh-70px)] overflow-y-auto customScrollbar px-4 py-2">
      <section class="h-full dark:bg-navy-900">
      <div class="mx-auto flex h-full max-w-screen-xl items-center justify-center px-4 py-8 lg:px-6 lg:py-16">
        <div class=" w-full text-center">
          <h1 class="text-primary-600 dark:text-primary-500 mb-4 w-full text-4xl font-extrabold tracking-tight dark:text-gray-400 lg:text-7xl text-indigo-700">
            😵 Oops, Page Not Found!
          </h1>
          <p class="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white lg:text-4xl">
            {/* Something went wrong!!! */}{message}
          </p>
          <p class="text-md mb-4 font-light text-gray-700 dark:text-gray-400 lg:text-lg w-3/4 text-center mx-auto">
            Sorry, we can't find that page. Please check url or reload the page.{" "}
          </p>
          <div className="text-md mb-4 font-light text-gray-700 hover:text-indigo-600 dark:text-gray-400 lg:text-lg">
            <Link to={`/${params.redirectUrl}`}>Go to Homepage</Link>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

export default Error
