import Dropzone from '@/components/Dropzone'
import TableWrapper from '@/components/table/TableWrapper'
import { db } from '@/firebase'
import { FileType } from '@/typings'
import { auth } from '@clerk/nextjs'
import { collection, getDocs } from 'firebase/firestore'

type Props = {}

const Dashboard = async (props: Props) => {
	//using clerk for getting userId in server component
	const { userId } = auth()

	//preload document on server render
	const docsResults = await getDocs(collection(db, 'users', userId!, 'files'))

	//structure of dashboard itself
	const skeletonFiles: FileType[] = docsResults.docs.map((doc) => ({
		id: doc.id,
		filename: doc.data().filename || doc.id,
		fullName: doc.data().fullName,
		timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
		downloadUrl: doc.data().downloadUrl,
		type: doc.data().type,
		size: doc.data().size,
	}))
	//console.log(skeletonFiles)

	return (
		<div className='border-t'>
			<Dropzone />
			<h1 className='font-bold'>All Files</h1>
			<div className='container space-y5'>
				{/* Table wrapper */}
				<TableWrapper skeletonFiles={skeletonFiles} />
			</div>
		</div>
	)
}

export default Dashboard
