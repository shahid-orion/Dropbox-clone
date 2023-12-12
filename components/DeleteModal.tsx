'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { db, storage } from '@/firebase'
import { useAppStore } from '@/store/store'
import { useUser } from '@clerk/nextjs'
import { deleteDoc, doc } from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
import toast from 'react-hot-toast'

export function DeleteModal() {
	const { user } = useUser()
	//zustand states
	const [isDeleteModalOpen, setIsDeleteModalOpen, fileId, setFileId] =
		useAppStore((state) => [
			state.isDeleteModalOpen,
			state.setIsDeleteModalOpen,
			state.fileId,
			state.setFileId,
		])

	const deleteFile = async () => {
		if (!user || !fileId) return

		//toast notification
		const toastId = toast.loading('Deleting...')

		const fileRef = ref(storage, `users/${user.id}/files/${fileId}`)

		try {
			await deleteObject(fileRef).then(async () => {
				//delete file
				await deleteDoc(doc(db, 'users', user.id, 'files', fileId)).then(
					() => {}
				)
			})
		} catch (error) {
			console.log('FAILED...!')
			console.log(error)

			toast.error('Error Deleting Document...', {
				id: toastId,
			})
		}

		toast.success('Deleted Successfully', {
			id: toastId,
		})

		setIsDeleteModalOpen(false)
	}

	return (
		<Dialog
			open={isDeleteModalOpen}
			onOpenChange={(isOpen) => {
				setIsDeleteModalOpen(isOpen)
			}}
		>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>Are you sure you want to delete?</DialogTitle>
					<DialogDescription>
						This will permanently delete the file!
					</DialogDescription>
				</DialogHeader>

				<div className='flex space-x-2 py-3'>
					<Button
						variant={'ghost'}
						size='sm'
						className='px-3 flex-1'
						onClick={() => setIsDeleteModalOpen(false)}
					>
						<span className='sr-only'>Cancel</span>
						<span>Cancel</span>
					</Button>
					<Button
						type='submit'
						size='sm'
						variant={'destructive'}
						className='px-3 flex-1'
						onClick={() => deleteFile()}
					>
						<span className='sr-only'>Delete</span>
						<span>Delete</span>
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
