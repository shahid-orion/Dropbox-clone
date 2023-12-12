'use client'

import { COLOR_EXTENSION_MAP } from '@/constant'
import { FileType } from '@/typings'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import prettyBytes from 'pretty-bytes'
import { FileIcon, defaultStyles } from 'react-file-icon'

export const columns: ColumnDef<FileType>[] = [
	{
		accessorKey: 'type',
		header: 'type',
		cell: ({ renderValue, ...props }) => {
			const type = renderValue() as string
			const extension: string = type.split('/')[1]

			return (
				<div className='w-10'>
					<FileIcon
						extension={extension}
						labelColor={COLOR_EXTENSION_MAP[extension]}
						//@ts-ignore
						{...defaultStyles[extension]}
					></FileIcon>
				</div>
			)
		},
	},
	{
		accessorKey: 'filename',
		header: 'Filename',
	},
	{
		accessorKey: 'timestamp',
		header: 'date Added',
	},
	{
		accessorKey: 'size',
		header: 'size',
		cell: ({ renderValue, ...props }) => {
			return <span>{prettyBytes(renderValue() as number)}</span>
		},
	},
	{
		accessorKey: 'downloadUrl',
		header: 'Link',
		cell: ({ renderValue, ...props }) => (
			<a
				href={renderValue() as string}
				target='_blank'
				className='underline text-blue-500 hover:text-blue-600'
			>
				Download
			</a>
		),
	},
]
