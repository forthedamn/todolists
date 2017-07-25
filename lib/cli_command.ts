import TodoList from './todo_list';
import DataBase from './data_base';
import Style from './style';
import {todoStatusEnum} from './enum/todo_status';

class Command {

  private cli: string;
  private arg: IArguments;
  private todoList: TodoList;
  private dataBase: DataBase;

  constructor(todoList: TodoList, cli?: string) {
    this.cli = cli;
    this.todoList = todoList;
    this.dataBase = new DataBase();
    this.arg = [].slice.call(arguments, 2);
  }

  private listFiles (files) {
   if (typeof files === 'object') {
     const style = new Style(files);
     style.default();
   }
  }

  add (content: string) {
    this.todoList.create(content);
    this.listPending();
    this.dataBase.writeData(this.todoList.toStringify());
  }

  remove (id: number) {
    this.todoList.clearById(id);
    this.listPending();
    this.dataBase.writeData(this.todoList.toStringify());
  }

  listPending () {
    const file = this.todoList.getItemListByStatus(todoStatusEnum.PENDING);
    this.listFiles(file);
  }

  listAll () {
    const file = this.todoList.getList;
    this.listFiles(file);
  }
  
  check (id: number) {
    this.todoList.check(id);
    this.listPending();
    this.dataBase.writeData(this.todoList.toStringify());
  }

  uncheck (id: number) {
    this.todoList.uncheck(id);
    this.listPending();
    this.dataBase.writeData(this.todoList.toStringify());
  }

  removeAll () {
    this.todoList.clearAll();
    this.dataBase.writeData(this.todoList.toStringify());
  }

  resort() {
    this.todoList.resort();
    this.dataBase.writeData(this.todoList.toStringify());
    this.listAll();
  }

}

export default Command;
