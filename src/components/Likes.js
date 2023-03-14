import { connect } from "react-redux";
import { decrementLikes, incrementLikes } from "../redux/likes-reducer.ts";


function Likes(props) {
	return (
		<div className='button-controls'>
			<button onClick={props.incrementLikes}>♥{props.likes}</button>
			<button onClick={props.decrementLikes}>Dislike</button>
		</div>
	)
}


const MapStateToProps = (state) => {
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