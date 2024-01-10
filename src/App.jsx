import './App.css';
import AttachmentModal from './AttachmentModal/AttachmentModal';
import CardColumn from './CardColumn/CardColumn';

function App() {
	return (
		<div className="App">
			<AttachmentModal />
			<div className="columnsContainer">
				<CardColumn title={'To-Do'} svgColor={"#d21010"} numItems={10} />
				<CardColumn title={'Doing'} svgColor={"#00b5ff"} numItems={5} />
				<CardColumn title={'Done'} svgColor={"#ffe700"} numItems={20} />
				<CardColumn title={'Others'} numItems={4} />
				<CardColumn title={'Under review'} numItems={9} />
				<CardColumn title={'Overview'} numItems={13} />
			</div>

		</div>
	);
}

export default App;
