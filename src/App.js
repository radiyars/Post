import './App.css';
import Comments from './components/Comments';
import Likes from './components/Likes';
import Title from './components/Title';

function App() {

	return (
		<div className="App">
			<div className="wrap">
				<div className="card">
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
