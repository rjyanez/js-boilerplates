import main from './main';
import App from './todo-mvc/app';

export function toDoMVC(){
  main.render(<App />, document.querySelector('.todoapp'));
}