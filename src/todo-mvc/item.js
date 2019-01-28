import main from '../main';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

export default class TodoItem extends main.Component {
	handleSubmit(){
		let { onSave, onDestroy, todo } = this.props,
			val = this.state.editText.trim();
		if (val) {
			onSave(todo, val);

			super.setState({ editText: val });
		}
		else {
			onDestroy(todo);
		}
	};

	handleEdit(){
		let { onEdit, todo } = this.props;
		onEdit(todo);

		super.setState({ editText: todo.title });
	};

	toggle(e){
		let { onToggle, todo } = this.props;
		onToggle(todo);
		e.preventDefault();
	};

	handleKeyDown(e){
		if (e.which===ESCAPE_KEY) {
			let { todo } = this.props;

			super.setState({ editText: todo.title });
			this.props.onCancel(todo);
		}
		else if (e.which===ENTER_KEY) {
			this.handleSubmit();
		}
	};
	
	handleDestroy(){
		this.props.onDestroy(this.props.todo);
	};
	
	updateEditText(e){

		super.setState({ editText: e.target.value });
	};

	shouldComponentUpdate({ todo, editing, editText }) {
		return (
			todo !== this.props.todo ||
			editing !== this.props.editing ||
			editText !== this.state.editText
		);
	}

	render() {
		let { todo:{ title, completed }, onToggle, onDestroy, editing } = this.props;
		let { editText } = this.state;
		let className = completed ? "completed" : "";
		className += editing ? " editing" : "";

		return (
			<li className={className}>
				<div className="view">
					<input
						className="toggle"
						type="checkbox"
						checked={completed}
						onChange={this.toggle.bind(this)}
					/>
					<label onDblClick={this.handleEdit.bind(this)}>{title}</label>
					<button className="destroy" onClick={this.handleDestroy.bind(this)} />
				</div>
				{ editing && (
					<input
						className="edit"
						autoFocus
						value={editText}
						onBlur={this.handleSubmit.bind(this)}
						onInput={this.updateEditText.bind(this)}
						onKeyDown={this.handleKeyDown.bind(this)}
					/>
				) }
			</li>
		);
	}
}