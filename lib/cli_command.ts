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

  public add (content: string) {
    this.todoList.create(content);
    this.listPending();
    this.dataBase.writeData(this.todoList.toStringify());
  }

  public remove (id: number) {
    this.todoList.clearById(id);
    this.listPending();
    this.dataBase.writeData(this.todoList.toStringify());
  }

  public listPending () {
    const file = this.todoList.getItemListByStatus(todoStatusEnum.PENDING);
    this.listFiles(file);
  }

  public listAll () {
    const file = this.todoList.getList;
    this.listFiles(file);
  }
  
  public check (id: number) {
    this.todoList.check(id);
    this.listPending();
    this.dataBase.writeData(this.todoList.toStringify());
  }

  public uncheck (id: number) {
    this.todoList.uncheck(id);
    this.listPending();
    this.dataBase.writeData(this.todoList.toStringify());
  }

  public clearAll () {
    this.todoList.clearAll();
    this.dataBase.writeData(this.todoList.toStringify());
  }

  public clearById(id: number) {
    this.todoList.clearById(id);
    this.listAll();
    this.dataBase.writeData(this.todoList.toStringify());
  }
}

export default Command;
