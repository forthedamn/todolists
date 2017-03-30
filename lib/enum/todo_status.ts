import * as enums from 'js-enums';

interface TodoStatusEnum {
  PENDING?: TodoStatusEnumItem,
  DONE?: TodoStatusEnumItem,
}

interface TodoStatusEnumItem {
  eql?: any,
  name: string,
}

const todoStatusEnum: TodoStatusEnum = enums(['PENDING', 'DONE']);

export {todoStatusEnum, TodoStatusEnumItem};
