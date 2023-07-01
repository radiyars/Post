import { ChangeEvent, useEffect, useState } from 'react'
import { useActions } from '../hooks/useAction'
import { useTypedSelector } from '../hooks/useTypedSelector'


type PropsType = {
}

export const Name: React.FC<PropsType> = (props) => {

	const [editMode, setEditMode] = useState(false)
	const [newName, setNewName] = useState('')

	const name = useTypedSelector(state => state.name.name)
	const id = useTypedSelector(state => state.app._id)

	const { patchNameApi } = useActions()

	useEffect(() => {
		setNewName(name)
	}, [name])


	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEditMode(false)
		patchNameApi(id, e.target.value)
	}


	return (
		<div className='card'>
			<div className="card__title">
				{!editMode &&
					< span
						onClick={() => setEditMode(true)} >
						{name}
					</span >
				}

				{editMode &&
					<input
						type='text'
						onChange={(e) => setNewName(e.target.value)}
						value={newName}
						onBlur={handleChange}
					/>
				}
			</div>
		</div>
	)
}
