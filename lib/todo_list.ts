import TodoItem from './interface/Todo_Item';
import {todoStatusEnum, TodoStatusEnumItem} from './enum/todo_status';

class TodoList {
  private list: Array<TodoItem>;

  constructor(list) {
    this.list = list;
  }

  get getList() {return this.list;}

  /**
   * get todo item by item id
   * 
   * @private
   * @param {number} id 
   * @returns 
   * 
   * @memberOf TodoList
   */
  private _getTodoItemById(id: number) {
    return this.list.filter( item => item.id === id)[0];
  }

  private get maxIdItem() {
    if (this.list.length === 0) {
      return null;
    }
    return this.list.reduce((pre, cur) => {
      if (pre.id > cur.id) return pre;
      return cur;
    });
  }

  /**
   * create item and insert todolist
   * @param content 
   * @param deadline 
   * @param group 
   */
  public create(content, deadline?, group?) {
    const id = this.maxIdItem.id + 1;
    const status = todoStatusEnum.PENDING.name;
    const todoItem = {id, content, status, deadline, group};
    this.list.push(todoItem);
  }

  /**
   * check the todo item as done
   * 
   * @param {number} id 
   * 
   * @memberOf TodoList
   */
  public check(id: number) {
    const item = this._getTodoItemById(id);
    
    if (!item) {
      throw new Error('Todo item dont exit, you may use the wrong id');
    }

    if (todoStatusEnum.DONE.eql(item.status)) {
      throw new Error('The item has already been checked');
    }

    item.status = todoStatusEnum.DONE.name;
  }

  /**
   * Uncheck the todo item as pending
   * 
   * @param {number} id 
   * 
   * @memberOf TodoList
   */
  public uncheck(id: number) {
    const item = this._getTodoItemById(id);
    
    if (!item) {
      throw new Error('Todo item dont exit, you may use the wrong id');
    }

    if (todoStatusEnum.PENDING.eql(item.status)) {
      throw new Error('The item has already been unchecked');
    }

    item.status = todoStatusEnum.PENDING.name; 
  }
  
  /**
   * get todo item by status
   * 
   * @param {TodoStatusEnumItem} status 
   * @returns {Array<TodoItem>} 
   * 
   * @memberOf TodoList
   */
  public getItemListByStatus(status: TodoStatusEnumItem):Array<TodoItem> {
    return this.list.filter(item => status.eql(item.status));
  }
  
  /**
   * resort todo list id base on start
   * 
   * @param {Array<TodoItem>} list 
   * @param {number} [start] 
   * @returns {Array<TodoItem>} 
   * 
   * @memberOf TodoList
   */
  public resort(list: Array<TodoItem>, start?: number): Array<TodoItem> {
    start = start || 1;
    const compare = function(pre, next) {
      if (pre.id >= next.id) {
        return 1;
      }
      if (pre.id < next.id) {
        return -1;
      }
    }
    list.sort(compare);
    return list.map( item => {
      item.id = start;
      start++;
      return item;
    });
  }

  /**
   * remove all item
   * 
   * @memberOf TodoList
   */
  public clearAll() {
    this.list = [];
  }

  /**
   * remove item by status
   * 
   * @param {TodoStatusEnumItem} status 
   * 
   * @memberOf TodoList
   */
  public clearListByStatus(status: TodoStatusEnumItem) {
    this.list = this.list.filter( item => !status.eql(item.status));
  }

  /**
   * remove item by id
   * @param id 
   */
  public clearById(id: number) {
    this.list = this.list.filter( item => item.id !== id);
  }

  /**
   * stringify list to save into DB
   * 
   * @returns {string} 
   * 
   * @memberOf TodoList
   */
  public toStringify(): string {
    return JSON.stringify(this.list);
  }
}

export default TodoList;
