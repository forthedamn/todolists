#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import * as program from 'commander';
import DataBase from './lib/data_base';
import Command from './lib/cli_command';
import TodoList from './lib/todo_list';

// instantiation the db
const dataBase = new DataBase();

// read origin data
const originData = dataBase.readData();

// instantiation todolist
const todoList = new TodoList(originData);

// instantiation command
const command = new Command(todoList);

program.usage('Todo List');

// set default command
if (!process.argv.slice(2).length) {
  command.listPending()
}

// cli add todo item
program
  .command('add <content>')
  .alias('a')
  .description('Add new todo item to list')
  .action(function(content){
    command.add(content);
  })

// remove todo item
program
  .command('rmove <id>')
  .alias('r')
  .description('Remove todo item')
  .action(function(id){
    id = parseInt(id);
    command.remove(id);
  })

// list todolist
program
  .command('ls [option]')
  .description('List todolist')
  .option('-a, --all', 'List all todolist include checked item')
  .action(function(cli, options) {
    if (options.all) {
      command.listAll()
      return;
    }
    command.listPending()
})

// check todo item
program
  .command('check <id>')
  .alias('c')
  .description('Check todo item as completed')
  .action(id => {
    id = parseInt(id);
    command.check(id);
})

// uncheck todo item
program
  .command('uncheck <id>')
  .alias('uc')
  .description('Uncheck todo item as pending')
  .action(id => {
  id = parseInt(id);
  command.uncheck(id);
})

// clear todolist
program
  .command('clear [id]')
  .alias('cl')
  .description('Clear todo item by id')
  .option('-a --all', 'Clear all todo items')
  .action(function(id, options) {
    if (options.all) {
      command.clearAll();
      return;
    }
    id = parseInt(id);
    command.clearById(id);
})

program.parse(process.argv);
