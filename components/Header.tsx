import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import dropboxLogo from '../../resources/icons8-dropbox.svg'
import { SignInButton, SignedOut, UserButton } from '@clerk/nextjs'
import { ThemeToggler } from './ThemeToggler'

type Props = {}

const Header = (props: Props) => {
	return (
		<header className='flex items-center justify-between'>
			<Link href='/' className='flex items-center space-x-2'>
				<div className='w-fit'>
					{/* <Image src={dropboxLogo} alt='Dropbox' width={50} height={50} /> */}
					<Image
						src='https://icons8.com/icon/13657/dropbox'
						alt='Dropbox'
						width={50}
						height={50}
					/>
				</div>
				<h1 className='font-bold text-xl'>Dropbox</h1>
			</Link>

			<div className='px-5 flex space-x-2 items-center'>
				{/* Theme Toggler */}
				<ThemeToggler />

				<UserButton afterSignOutUrl='/' />

				<SignedOut>
					<SignInButton afterSignInUrl='/dashboard' mode='modal' />
				</SignedOut>
			</div>
		</header>
	)
}

export default Header
