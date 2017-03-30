import TodoList from './todo_list';

class Command {

  private cli: string;
  private arg: IArguments;
  private todoList: TodoList;

  constructor(todoList: TodoList, cli?: string) {
    this.cli = cli;
    this.todoList = todoList;
    this.arg = [].slice.call(arguments, 2);
  }

  public add (content: string) {
    this.todoList.create(content);
  }

  public remove (id: number) {
    this.todoList.clearById(id);
  }
  
  public check (id: number) {
    this.todoList.check(id);
  }

  public uncheck (id: number) {
    this.todoList.uncheck(id);
  }
}

export default Command;
