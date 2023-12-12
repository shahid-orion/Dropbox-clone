import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
	return (
		<main className=''>
			<div className='flex flex-col lg:flex-row items-center bg-[#1E1919] dark:bg-slate-800'>
				<div
					className='p-10 flex flex-col bg-[#2B2929] dark:bg-slate-800
        					 text-white space-y-5'
				>
					<h1 className='text-5xl font-bold'>
						Welcome to Dropbox <br /> <br />
						Storing everything you need... all in one place
					</h1>
					<p className='pb-20'>
						With Dropbox, you get a full suite of tools designed to help you
						create, share, manage and track content more efficiently. Plus,
						proven cloud storage you can trust.
					</p>

					<Link
						href='/dashboard'
						className='flex cursor-pointer bg-blue-500 p-5 w-fit rounded-sm'
					>
						Try it for free!
						<ArrowRight className='ml-10' />
					</Link>
				</div>

				<div className='bg-[#1E1919] dark:bg-slate-800 h-full p-10'>
					<video autoPlay loop muted className='rounded-lg'>
						<source
							src='https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/dropbox/dbx1-hero-1920x1080-en_GB.mp4'
							type='video/mp4'
						/>
					</video>
				</div>
			</div>

			<p className='text-center font-bold text-xl pt-5'>Disclaimer</p>
			<p className='text-center font-bold p-2'>
				This is my Dropbox clone project where I&apos;ll be implementing NextJS,
				TailwindCSS, TypeScript, Clerk Authentication, ShadCN UI, Firebase
				storage and Firebase Firestore
			</p>
			<p className='text-center font-bold p-2'>
				Everything I&apos;ll make here just for learning purposes. Antone want
				to learn, you can follow my code in my github repo. All the resources
				here are free!!!
			</p>
			<p className='text-center font-bold p-2'>
				I hope you&apos;ll enjoy it...
			</p>
		</main>
	)
}
