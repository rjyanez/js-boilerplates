import {helloWord} from './hello-world'
import {helloWordJsx} from './hello-world-jsx'
import {toDoMVC} from './todo-mvc'

window.helloWord = () => { helloWord() }
window.helloWordJsx = () => { helloWordJsx() }
window.todoMVC = () => { toDoMVC() }

