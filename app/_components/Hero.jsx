//This is the main page of the application. It is the first page that the user sees when they visit the website. 
//It contains a description of the application and two buttons that allow the user to either get started or learn more about the application.
//The page also contains an image of the application's dashboard, that gives user a glimps of the application. 
//The page is styled using Tailwind CSS classes.

import React from 'react'
import Image from "next/image";

export default function Hero() {
  return (
    <div>
      <section className="bg-gray-50 flex items-center flex-col">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">

          {/* The div tag below contains the discription and the two Buttons. */}
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Record expenses.<br />
              <strong className="font-extrabold text-[#FF7917] sm:block"> Make and Manage Budgets. </strong>
            </h1>
            <p className="mt-4 sm:text-xl/relaxed">
              All your daily budgetting needs made easy through Penny Planner.
            </p>

            {/* The div tag below contains the two buttons. */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">

              {/* The a tag below is the "Get Started" button. */}
              <a
                className="block w-full rounded bg-[#865ae4] px-12 py-3 text-sm font-medium text-white hover:text-white hover:bg-[#b097e6] focus:outline-none focus:ring active:bg-[#865ae4] sm:w-auto"
                href="/Dashboard"
              >
                Get Started
              </a>

              {/* The a tag below is the "Learn more" button. */}
              <a
                className="block w-full rounded px-12 py-3 text-sm font-medium text-[#865ae4] shadow hover:text-white hover:bg-[#b097e6] focus:outline-none focus:ring active:text-white active:bg-[#865ae4] sm:w-auto"
                href="/Dashboard/About-us"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>

        {/* The Image tag below contains the image of the dashboard. */}
        <Image src={'/dashboard.png'}
          alt='dashboard Image'
          width={1000}
          height={100}
          className='-mt-9 rounded-xl border-2'
        />
      </section>
    </div>
  )
}
