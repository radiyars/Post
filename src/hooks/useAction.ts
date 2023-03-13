import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { commentsActions } from "../redux/comment-reducer";

const allActions = { ...commentsActions }

export const useActions = () => {
	const dispatch = useDispatch()
	return bindActionCreators(allActions, dispatch)
}
