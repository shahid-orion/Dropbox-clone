'use client'

import { db, storage } from '@/firebase'
import { cn } from '@/lib/utils'
import { useUser } from '@clerk/nextjs'
import {
	addDoc,
	collection,
	doc,
	serverTimestamp,
	updateDoc,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import React, { useState } from 'react'
import DropzoneComponent from 'react-dropzone'
import toast from 'react-hot-toast'

type Props = {}

const Dropzone = (props: Props) => {
	const [loading, setLoading] = useState(false)
	const { isLoaded, isSignedIn, user } = useUser()

	//max file size 20MB
	const maxSize = 20971520

	const onDrop = (acceptedFiles: File[]) => {
		acceptedFiles.forEach((file) => {
			const reader = new FileReader()
			reader.onabort = () => console.log('file reading is aborted')
			reader.onerror = () => console.log('file reading is failed')

			reader.onload = async () => {
				await uploadPost(file)
			}
			reader.readAsArrayBuffer(file)
		})
	}

	//this function will take the file and add to firestore and return the download url path
	const uploadPost = async (selectedFile: File) => {
		if (loading) return
		if (!user) return

		setLoading(true)
		//toast notification
		const toastId = toast.loading('Uploading...')

		//addDoc -> users/userId/files
		const docRef = await addDoc(collection(db, 'users', user.id, 'files'), {
			userId: user.id,
			filename: selectedFile.name,
			fullName: user.fullName,
			profileImg: user.imageUrl,
			timestamp: serverTimestamp(),
			type: selectedFile.type,
			size: selectedFile.size,
		})

		//image
		const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`)
		//uploading image to storage
		await uploadBytes(imageRef, selectedFile).then(async (snapshot) => {
			const downloadUrl = await getDownloadURL(imageRef)

			await updateDoc(doc(db, 'users', user.id, 'files', docRef.id), {
				downloadUrl: downloadUrl,
			})
		})

		toast.success('Uploaded Successfully', {
			id: toastId,
		})

		setLoading(false)
	}

	return (
		<div>
			<DropzoneComponent minSize={0} maxSize={maxSize} onDrop={onDrop}>
				{({
					getRootProps,
					getInputProps,
					isDragActive,
					isDragReject,
					fileRejections,
				}) => {
					const isFileTooLarge =
						fileRejections.length > 0 && fileRejections[0].file.size > maxSize
					return (
						<section className='m-4 cursor-pointer hover:bg-[#6767f2]'>
							<div
								{...getRootProps()}
								className={cn(
									'w-full h-52 flex justify-center items-center p-5 border border-dashed rounded-lg text-center',
									isDragActive
										? 'bg-[#035FFE] text-white animate-pulse'
										: 'bg-slate-100/50 dark:bg-slate-800/80 text-slate-400'
								)}
							>
								<input {...getInputProps()} />
								{!isDragActive && 'Click here or drop a file to upload'}
								{isDragActive && !isDragReject && 'Drag to upload this file'}
								{isDragReject && 'File type not accepted..!'}
								{isFileTooLarge && (
									<div className='text-danger mt-2'>File is too large</div>
								)}
							</div>
						</section>
					)
				}}
			</DropzoneComponent>
		</div>
	)
}

export default Dropzone
