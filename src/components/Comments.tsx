import { ChangeEvent, FormEvent, useState } from "react"
import { useActions } from "../hooks/useAction"
import { useTypedSelector } from './../hooks/useTypedSelector'
import { SingleComment } from './SingleComment'

type PropsType = {
}

export const Comments: React.FC<PropsType> = (props) => {

	const comments: Array<string> | null = useTypedSelector(state => state.comments.comments)
	const id = useTypedSelector(state => state.app._id)
	const { patchCommentsApi } = useActions()
	const [textComment, setTextComment] = useState('')


	// Сетаем текст комментария
	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		setTextComment(e.target.value)
	}


	// Создаем новый комментарий
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (textComment) {
			if (comments) {
				let a = [...comments, textComment]
				patchCommentsApi(id, a)
			} else {
				patchCommentsApi(id, [textComment])
			}
			setTextComment('')
		}
	}


	return (
		<div className='comments'>
			<form onSubmit={handleSubmit} onBlur={handleSubmit} className="comments__itemCreate" >
				<input className="comments__input" type='text' value={textComment} onChange={handleInput} />
				<input type='submit' hidden />
			</form>
			{comments &&
				comments.map((comment, index) => {
					return < SingleComment key={index} comment={comment} index={index} />
				})
			}
		</div>
	)
}


