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

let pkgConfig = {
  version: 'beta',
}
try {
  pkgConfig = JSON.parse(fs.readFileSync(path.join(__dirname, './package.json'), 'utf-8'));
} catch(e) {
  console.error(e);
}

program.version(pkgConfig.version).usage('Todo List');

// set default command
if (!process.argv.slice(2).length) {
  command.listPending()
}

// cli add todo item
program
  .command('add <content>')
  .alias('a')
  .description('Add new todo item to list')
  .action(function(content, cmd){
    content = process.argv.slice(3).join(' ');
    command.add(content);
  })

// remove todo item
program
  .command('remove [id]')
  .alias('r')
  .description('Remove todo item')
  .option('-a --all', 'Clear all todo items')
  .action(function(id, options) {
    if (options.all) {
      command.removeAll();
      return;
    }
    id = parseInt(id);
    command.remove(id);
})

// list todolist
program
  .command('ls [option]')
  .description('List all todolist include checked item')
  .action(function(cli, options) {
    command.listAll();
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

// resort todo list
program
  .command('resort')
  .description('Resort todo list id')
  .action(() => {
  command.resort();
})
program.parse(process.argv);
