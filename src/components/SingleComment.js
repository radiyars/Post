import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { commentUpdate } from './../redux/comment-reducer';


function SingleComment({ data }) {

	const { text, id } = data
	const [commentText, setCommentText] = useState('')
	const dispatch = useDispatch();

	useEffect(() => {
		if (text) {
			setCommentText(text)
		}
	}, [text])

	const handleInput = (e) => {
		setCommentText(e.target.value)
	}

	const handleUpdate = (e) => {
		e.preventDefault()
		console.log(commentText)
		dispatch(commentUpdate({ commentText, id }))

	}

	return (
		<form onSubmit={handleUpdate} className="comment-item">
			<div className="comment-item-delete">&times;</div>
			<input type='text' value={commentText} onChange={handleInput} />
			<input type='submit' hidden />
			<p>{text}</p>
		</form>
	)
}


export default SingleComment