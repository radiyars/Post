import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import uniqid from 'uniqid';
import { commentCreate } from "../redux/comment-reducer";
import { useTypedSelector } from './../hooks/useTypedSelector';
import { SingleComment } from './SingleComment';

type PropsType = {
}

export const Comments: React.FC<PropsType> = (props) => {

	const dispatch = useDispatch()
	const comments = useTypedSelector(state => state.comments.comments)
	const [textComment, setTextComment] = useState('')




	// Сетаем текст комментария
	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		setTextComment(e.target.value)
	}


	// Создаем новый комментарий
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (textComment) {
			dispatch(commentCreate(textComment, uniqid()))
			setTextComment('')
		}
	}


	return (
		<div className='comments'>
			<form onSubmit={handleSubmit} className="comments__itemCreate">
				<input className="comments__input" type='text' value={textComment} onChange={handleInput} />
				{/* <input className="submit" type='submit' /> */}
				<input type='submit' hidden />
			</form>
			{!!comments.length && comments.map(comment => {
				return < SingleComment key={comment.id} data={comment} />
			})}
		</div>
	)
}


