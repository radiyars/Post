import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { commentDelete, commentUpdate } from './../redux/comment-reducer';


function SingleComment({ data }) {

	const { text, id } = data
	const [commentText, setCommentText] = useState('')
	const dispatch = useDispatch();

	useEffect(() => {
		if (text) {
			setCommentText(text)
		}
	}, [text])


	// Сетаем текст нового комментария
	const handleInput = (e) => {
		setCommentText(e.target.value)
	}


	// Обновляем комментарий
	const handleUpdate = (e) => {
		e.preventDefault()
		dispatch(commentUpdate(commentText, id))
	}

	// Удаляем комментарий
	const handleDelete = (e) => {
		e.preventDefault()
		dispatch(commentDelete(id))
	}


	return (
		<form onSubmit={handleUpdate} className="comment-item">
			<div onClick={handleDelete} className="comment-item-delete">&times;</div>
			<input type='text' value={commentText} onChange={handleInput} />
			<input type='submit' hidden />
		</form>
	)
}


export default SingleComment