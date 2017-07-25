import TodoList from '../lib/todo_list';
import {todoStatusEnum} from '../lib/enum/todo_status';

require('should');

describe.only('lib/todo_list', () => {

  const listData = [];
  const todolist = new TodoList(listData);

  it('should create todo item success', () => {
    todolist.create('test', 'tomorrow', 'family');
    const list = todolist.getList;
    (list.length === 1).should.eql(true);
    const expectObject = {
      id: 1,
      status: 'PENDING',
      content: 'test',
      deadline: 'tomorrow',
      group: 'family',
    }
    list[0].should.eql(expectObject);
  });

  it('should check item success', () => {
    todolist.check(1);
    const list = todolist.getList;
    todoStatusEnum.DONE.eql(list[0].status).should.eql(true);
  })

  it('should uncheck item success', () => {
    todolist.uncheck(1);
    const list = todolist.getList;
    todoStatusEnum.PENDING.eql(list[0].status).should.eql(true);
  })

  it('should resort todolist', () => {
    todolist.clearAll();
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14].forEach(item => todolist.create(item));
    todolist.check(1);
    todolist.check(2);
    todolist.check(5);
    todolist.resort();
    const list = todolist.getList;
    list[0].content.should.eql(3);
    list[1].content.should.eql(4);
    list[2].content.should.eql(6);
  })

})
