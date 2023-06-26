import { useEffect } from "react"
import './App.scss'
import { Comments } from './components/Comments'
import Likes from './components/Likes'
import { Spin } from './components/Spin'
import { Title } from './components/Title'
import { useActions } from './hooks/useAction'
import { useTypedSelector } from './hooks/useTypedSelector'



function App() {

	const imageSrc = useTypedSelector(state => state.image.imageSrc)
	const post = useTypedSelector(state => state.app)
	const { getNameApi, getPostApi, getLikesApi, getImageApi } = useActions()


	useEffect(() => {
		// debugger
		getImageApi()
		getPostApi()
		getNameApi()
		getLikesApi()
	}, [])



	const error = useTypedSelector(state => state.app.error)

	return (
		<div className="post">
			<div className="post__container">
				<Spin />
				<div className="post__card">
					{error && (
						<div className='error-message'>
							{error}
						</div>
					)}
					<div className="post__image">
						<img src={imageSrc} alt="No image" />

						<Title />
						<Likes />
					</div>
					<Comments />
				</div>
			</div>
		</div>
	);
}

export default App;
