import { useDispatch, useSelector } from "react-redux";
import { inputText } from "../redux/title-reducer";


function Title(props) {

	const dispatch = useDispatch();

	const title = useSelector(state => state.title.text)

	const handleChange = (e) => {
		dispatch(inputText(e.target.value))
	}

	return (
		<div className='card-title'>
			<div className="card-title-top">
				<input type='text' onChange={handleChange} value={title} />
			</div>
		</div>
	)
}


export default Title