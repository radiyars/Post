import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { commentsActions } from "../redux/comment-reducer";
import { appActions } from "../redux/app-reducer";

const allActions = { ...commentsActions, ...appActions }

export const useActions = () => {
	const dispatch = useDispatch()
	return bindActionCreators(allActions, dispatch)
}
