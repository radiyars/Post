import Loader from "react-loader-spinner";
import { useTypedSelector } from './../hooks/useTypedSelector';

type PropsType = {
}

export const Spin: React.FC<PropsType> = (props) => {
	const spinner = useTypedSelector(state => state.app.isLoading)
	return (
		<div className="loader-styles">
			<Loader
				type='TailSpin'
				color="#00BFFF"
				height={100}
				width={100}
				visible={spinner}
			/>
		</div>
	)
}
