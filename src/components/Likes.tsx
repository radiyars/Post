import { useEffect, useState } from "react"
// import { connect } from "react-redux"
import { useActions } from "../hooks/useAction"
import { useTypedSelector } from "../hooks/useTypedSelector"
// import { AppStateType } from "../redux/root-reducer"


type PropsType = {
}

const Likes: React.FC<PropsType> = (props) => {
	const [localLikes, setLocalLikes] = useState(0)

	const id = useTypedSelector(state => state.app._id)
	const imageSrc = useTypedSelector(state => state.image)
	const likes = useTypedSelector(state => state.likes.likes)
	const { uploadImage, patchLikesApi } = useActions()

	useEffect(() => {
		setLocalLikes(likes)
	}, [likes])

	const onImageUpload = (event: any) => {
		const file = event.target.files[0]
		uploadImage(file, id)
	}

	const incrementLikes = () => {
		setLocalLikes(localLikes + 1)
		patchLikesApi(id, localLikes + 1)
	}

	const decrementLikes = () => {
		if (localLikes > 0) {
			setLocalLikes(localLikes - 1)
			patchLikesApi(id, localLikes - 1)
		}
	}

	return (
		<div className='button-controls'>
			<button onClick={incrementLikes}>♥ {likes}</button>
			<button onClick={decrementLikes}>Dislike</button>
			<div>
				<label htmlFor='post__upload-input' className='post__upload-label'>Upload</label>
				<input onChange={(event) => onImageUpload(event)} type='file' id='post__upload-input' className='post__upload-input'></input>
			</div>

		</div>
	)
}


// const MapStateToProps = (state: AppStateType) => {
// 	return {
// likes: state.likes.likes
// 	}
// }


// const MapDispatchToProps = (dispatch) => {
// 	return {
// 		onIncrementLikes: () => dispatch(incrementLikes()), // сначала запускается ActionCreator!
// 		onDecrementLikes: () => dispatch(decrementLikes()),
// 	}
// }

// export default connect(MapStateToProps, { incrementLikes, decrementLikes })(Likes)

export default Likes