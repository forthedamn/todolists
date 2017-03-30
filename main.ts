#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import * as program from 'commander';
import DataBase from './lib/data_base';
import Command from './lib/cli_command';
import TodoList from './lib/todo_list';
import add from './lib/cli/add';

// instantiation the db
const dataBase = new DataBase();

// read origin data
const originData = dataBase.readData();

// instantiation todolist
const todoList = new TodoList(originData);

// instantiation command
const command = new Command(todoList);

function listFiles() {
  command.listPending();
}

function remove(id) {
  id = parseInt(id);
  command.remove(id);
}

program.usage('Todo List');

program
  .command('add [content]')
  .alias('a')
  .description('Add todo item to list')
  .action(function(content){
    add(content) 
  })

program.parse(process.argv);




