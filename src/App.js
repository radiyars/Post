import './App.css';
import Comments from './components/Comments';
import Likes from './components/Likes';
import Title from './components/Title';
import Spin from './components/Spin';
import { useSelector } from 'react-redux';

function App() {
	const error = useSelector(state => state.app.error)
	return (
		<div className="App">
			<div className="wrap">
				<Spin />
				<div className="card">
					{error && (
						<div className='error-message'>
							{error}
						</div>
					)}
					<div className="card-image">
						<img src="./sea.jpg" alt="surfing" />
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
