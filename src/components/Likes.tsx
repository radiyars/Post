import { connect } from "react-redux";
import { decrementLikes, incrementLikes } from "../redux/likes-reducer";
import { AppStateType } from "../redux/root-reducer";
import { useActions } from "../hooks/useAction";
import { useTypedSelector } from "../hooks/useTypedSelector";


type PropsType = {
	likes: number
	incrementLikes: () => void
	decrementLikes: () => void
}

const Likes: React.FC<PropsType> = (props) => {
	const id = useTypedSelector(state => state.app._id)
	const { uploadImage } = useActions()

	const onImageUpload = (event: any) => {
		const file = event.target.files[0]
		uploadImage(file, id)

	}
	return (
		<div className='button-controls'>
			<button onClick={props.incrementLikes}>♥ {props.likes}</button>
			<button onClick={props.decrementLikes}>Dislike</button>
			<div>
				<label htmlFor='post__upload-input' className='post__upload-label'>Upload</label>
				<input onChange={(event) => onImageUpload(event)} type='file' id='post__upload-input' className='post__upload-input'></input>
			</div>

		</div>
	)
}


const MapStateToProps = (state: AppStateType) => {
	return {
		likes: state.likes.likes
	}
}


// const MapDispatchToProps = (dispatch) => {
// 	return {
// 		onIncrementLikes: () => dispatch(incrementLikes()), // сначала запускается ActionCreator!
// 		onDecrementLikes: () => dispatch(decrementLikes()),
// 	}
// }


export default connect(MapStateToProps, { incrementLikes, decrementLikes })(Likes)