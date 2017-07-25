# Todolists

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]


[npm-image]: https://img.shields.io/npm/v/todolists.svg?style=flat-square
[npm-url]: https://npmjs.org/package/todolists
[travis-image]: https://img.shields.io/travis/forthedamn/todolists.svg?style=flat-square
[travis-url]: https://travis-ci.org/forthedamn/todolists
[codecov-image]: https://codecov.io/gh/forthedamn/todolists/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/forthedamn/todolists
[download-image]: https://img.shields.io/npm/dt/todolists.svg
[download-url]: https://npmjs.org/package/todolists


Todolists in NodeJs Cli

基于 Nodejs 的命令行 Todolist

![img](https://zos.alipayobjects.com/rmsportal/yPkGQThjFECEwbrgPFhs.png)

![gif](https://zos.alipayobjects.com/rmsportal/VnZwiHYkBucmfLvHFWWT.gif)

```

npm install todolists -g

```
use `todo -h` for more infomation

```
    todo add|a <content>     Add new todo item to list                     在 todolist 中增加一未完成项
    remove|r <id>            Remove todo item, -a/--all remove all items   删除其中某一项
    ls                       List  all items in todolist                   展示 todolist 中所有的项目 
    check|c <id>             Check todo item as completed                  完成某一项
    uncheck|uc <id>          Uncheck todo item as pending                  将某一项设置为未完成
    resort                   Resort todo list id                           重置 todolist id

```

