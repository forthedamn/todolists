import TodoItem from './interface/Todo_Item';
import * as colors from 'colors';
import {todoStatusEnum} from './enum/todo_status';

class Style {
  
  private todolist: Array<TodoItem>;
  constructor(todolist: Array<TodoItem>) {
    this.todolist = todolist;
  }

  public default() {
    this.todolist.map( todo => {
      if (todoStatusEnum.DONE.eql(todo.status)) {
        console.log(`${colors.yellow(todo.id)}. [${colors.green('✓')}] ${colors.cyan(todo.content)}`);
        return;
      }
      console.log(`${colors.yellow(todo.id)}. [ ] ${colors.cyan(todo.content)}`)
    })
  }
}

export default Style;
