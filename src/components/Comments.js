import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import uniqid from 'uniqid';
import { commentCreate } from "../redux/comment-reducer";
import SingleComment from './SingleComment';


function Comments(props) {

	const dispatch = useDispatch()
	const comments = useSelector(state => state.comments.comments)
	const [textComment, setTextComment] = useState('')


	const handleInput = (e) => {
		setTextComment(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(commentCreate(textComment, uniqid()))
		setTextComment('')
	}

	console.log(comments)

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