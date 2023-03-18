import { connect } from "react-redux";
import { decrementLikes, incrementLikes } from "../redux/likes-reducer";
import { AppStateType } from "../redux/root-reducer";


type PropsType = {
	likes: number
	incrementLikes: () => void
	decrementLikes: () => void
}

const Likes: React.FC<PropsType> = (props) => {
	return (
		<div className='button-controls'>
			<button onClick={props.incrementLikes}>♥{props.likes}</button>
			<button onClick={props.decrementLikes}>Dislike</button>
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