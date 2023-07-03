import { useEffect } from "react"
import './App.scss'
import { Comments } from './components/Comments'
import Likes from './components/Likes'
import { Spin } from './components/Spin'
import { Name } from './components/Name'
import { useActions } from './hooks/useAction'
import { useTypedSelector } from './hooks/useTypedSelector'


function App() {

	const error = useTypedSelector(state => state.app.error)
	const imageSrc = useTypedSelector(state => state.image.imageSrc)
	const { getNameApi, getLikesApi, getImageApi, getCommentsApi, getPostIdApi } = useActions()


	useEffect(() => {
		getCommentsApi()
		getImageApi()
		getNameApi()
		getLikesApi()
		getPostIdApi()
	}, [])



	return (
		<div className="container">
			<div className="post">
				<Spin />
				<div className="post__card">
					{error && (
						<div className='error-message'>
							{error}
						</div>
					)}
					<div className="post__body">
						<div className="post__image">
							<img src={imageSrc} alt="#" />
						</div>

						<Name />
						<Likes />
					</div>
					<Comments />
				</div>
			</div>
		</div>
	);
}

export default App;
