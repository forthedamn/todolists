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

program
  .version('0.0.1')
  .option('-a, --add', 'Add todo item', command.add)
  .option('-r, --rm', 'remove todo item', command.remove)
  .option('-b, --bbq-sauce', 'Add bbq sauce')
  .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
  .parse(process.argv);

console.log('you ordered a pizza with:');
if (program.add) console.log('  - peppers');
if (program.pineapple) console.log('  - pineapple');
if (program.bbqSauce) console.log('  - bbq');
console.log('  - %s cheese', program.cheese);

