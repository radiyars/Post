import { ChangeEvent, useEffect, useRef, useState } from 'react'
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

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		setNewName(name)
	}, [name])


	// const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
	const handleChange = () => {
		setEditMode(false)
		if (inputRef.current) {
			patchNameApi(id, inputRef.current.value)
		}
		// patchNameApi(id, e.target.value)
	}

	// const enter = () => {
	// 	setEditMode(false)
	// 	if (inputRef.current) {
	// 		patchNameApi(id, inputRef.current.value)
	// 	}
	// }

	return (
		<div className='card'>
			<div className="card__title">
				{!editMode && !name &&
					< span className='_grey'
						onClick={() => setEditMode(true)} > Дать название изображению
					</span >
				}

				{!editMode && name &&
					< span
						onClick={() => setEditMode(true)} >
						{name}
					</span >
				}

				{editMode &&
					<input
						type='text'
						ref={inputRef}
						onChange={(e) => setNewName(e.target.value)}
						value={newName}
						onBlur={handleChange}
					/>
				}


				{editMode && newName &&
					< img className='entersvg' src='./enter.svg' alt='подтвердить' onClick={handleChange} />
				}

			</div>
		</div>
	)
}
