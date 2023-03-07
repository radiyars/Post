import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import uniqid from 'uniqid';
import { commentCreate } from "../redux/comment-reducer";
import SingleComment from './SingleComment';
import { commentsLoad } from './../redux/comment-reducer';


function Comments(props) {

	const dispatch = useDispatch()
	const comments = useSelector(state => state.comments.comments)
	const [textComment, setTextComment] = useState('')


	useEffect(() => {
		dispatch(commentsLoad())
	}, [])

	// Сетаем текст комментария
	const handleInput = (e) => {
		setTextComment(e.target.value)
	}


	// Создаем новый комментарий
	const handleSubmit = (e) => {
		e.preventDefault();
		if (textComment) {
			dispatch(commentCreate(textComment, uniqid()))
			setTextComment('')
		}
	}


	return (
		<div className='card-comments'>
			<form onSubmit={handleSubmit} className="comments-item-create">
				<input type='text' value={textComment} onChange={handleInput} />
				<input type='submit' />
			</form>
			{!!comments.length && comments.map(comment => {
				return < SingleComment key={comment.id} data={comment} />
			})}
		</div>
	)
}


export default Comments