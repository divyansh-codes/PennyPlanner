//This is the Sign up page for our App where users can sign in to their account.
//We are using Clerk's SignUn component to handle the sign Un process.
//We have customised the page to include a background image and a logo, with a few changes to the text content.

import { SignUp } from '@clerk/nextjs'
import Image from 'next/image'
import { headers } from 'next/headers';

  export default async function Page(){
    const headersList = await headers(); 
    const contentSecurityPolicy = headersList.get('Content-Security-Policy');
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1565514417878-a66a6b0f2c7f?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
    
          <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="#">
              <span className="sr-only">Home</span>
              <Image src={'./logo.svg'}
                alt='logo'
                width={50}
                 height={50}
             />
            </a>
    
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            Welcome to Penny Planner 🪙!
            </h2>
    
            <p className="mt-4 leading-relaxed text-white/90">
            Oh hey, you're new here!
            Sign up now and join the money-savvy club. Let’s start your journey to smarter budgeting and epic savings💵!
            </p>
          </div>
        </section>
    
        <main
          className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
        >
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <a
                className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                href="#"
              >
                <span className="sr-only">Home</span>
                <Image src={'./logo.svg'}
                  alt='logo'
                  width={50}
                  height={50}
                />
              </a>
    
              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Welcome to Penny Planner 🪙!
              </h1>
    
              <p className="mt-4 leading-relaxed text-gray-500">
              Oh hey, you're new here!
              Sign up now and join the money-savvy club. Let’s start your journey to smarter budgeting and epic savings💵!
              </p>
            </div>
            <SignUp/>
          </div>
        </main>
      </div>
    </section>
  
  )
}