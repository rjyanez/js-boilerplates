import main from '../main'
import TodoModel from './model'
import TodoFooter from './footer'
import TodoItem from './item'

const ENTER_KEY = 13

const FILTERS = {
	all: todo => true,
	active: todo => !todo.completed,
	completed: todo => todo.completed
}

export default class App extends main.Component{
  constructor(){		
		super()
    this.model = new TodoModel('didact-todos', () =>{ 

			super.setState({}) 
		})
    addEventListener('hashchange', this.handleRoute.bind(this))
    let nowShowing = this.getRoute()
		this.state = { 
			nowShowing,
			newTodo: "",
			editing: ""
		}
  }

  getRoute() {
		let nowShowing = String(location.hash||'').split('/').pop()
		if (!FILTERS[nowShowing]) {
			nowShowing = 'all'
		}
		return nowShowing
	}

	handleRoute() {
		let nowShowing = this.getRoute()

		super.setState({ nowShowing })
  }

  handleNewTodoKeyDown(e){
		if (e.keyCode!==ENTER_KEY) return
		e.preventDefault()
		let val = this.state.newTodo.trim()
		if (val) {
			this.model.addTodo(val)

			super.setState({ newTodo: '' })
		}
	}

	updateNewTodo(e){

		super.setState({ newTodo: e.target.value })

	}

	toggleAll(e){
		let checked = e.target.checked
		this.model.toggleAll(checked)
	}

	toggle(todo){
		this.model.toggle(todo)
	}

	destroy(todo){
		this.model.destroy(todo)
	}

	edit(todo){

		super.setState({ editing: todo.id })
	}

	save(todoToSave, text){
		this.model.save(todoToSave, text)

		super.setState({ editing: null })
	}

	cancel( e){

		super.setState({ editing: null })
	}

	clearCompleted( e){
		this.model.clearCompleted()
	}
	render() {
		let { nowShowing=ALL_TODOS, newTodo, editing } = this.state
		let { todos } = this.model,
			shownTodos = todos.filter( FILTERS[nowShowing] ),
			activeTodoCount = todos.reduce( (a, todo) => a + (todo.completed ? 0 : 1), 0),
			completedCount = todos.length - activeTodoCount

		return (
			<div>
				<header className="header">
					<h1>todos</h1>
					<input
						className="new-todo"
						placeholder="What needs to be done?"
						value={newTodo}
						onKeyDown={this.handleNewTodoKeyDown.bind(this)}
						onInput={this.updateNewTodo.bind(this)}
						autoFocus={true}
					/>
				</header>

				{ todos.length ? (
					<section className="main">
						<input
							className="toggle-all"
							type="checkbox"
							onChange={this.toggleAll.bind(this)}
							checked={activeTodoCount === 0}
						/>
						<ul className="todo-list">
							{ shownTodos.map( todo => (
								<TodoItem
									todo={todo}
									onToggle={this.toggle.bind(this)}
									onDestroy={this.destroy.bind(this)}
									onEdit={this.edit.bind(this)}
									editing={editing === todo.id}
									onSave={this.save.bind(this)}
									onCancel={this.cancel.bind(this)}
								/>
							)) }
						</ul>
					</section>
				) : null }

				{ (activeTodoCount || completedCount) ? (
					<TodoFooter
						count={activeTodoCount}
						completedCount={completedCount}
						nowShowing={nowShowing}
						onClearCompleted={this.clearCompleted.bind(this)}
					/>
				) : null }
			</div>
		)
	}

}