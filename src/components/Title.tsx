import { ChangeEvent } from 'react';
import { useDispatch } from "react-redux";
import { inputText } from "../redux/title-reducer";
import { useTypedSelector } from './../hooks/useTypedSelector';

type PropsType = {
}

export const Title: React.FC<PropsType> = (props) => {

	const dispatch = useDispatch();

	const title = useTypedSelector(state => state.title.text)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(inputText(e.target.value))
	}

	return (
		<div className='card'>
			<div className="card__title">
				<input type='text' onChange={handleChange} value={title} />
			</div>
		</div>
	)
}

