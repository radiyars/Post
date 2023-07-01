import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { commentsActions } from "../redux/comments-reducer";
import { appActions } from "../redux/app-reducer";
import { imageActions } from "../redux/image-reducer";
import { nameActions } from "../redux/name-reducer";
import { likesActions } from "../redux/likes-reducer";

const allActions = {
	...commentsActions,
	...appActions,
	...imageActions,
	...nameActions,
	...likesActions,
}

export const useActions = () => {
	const dispatch = useDispatch()
	return bindActionCreators(allActions, dispatch)
}
