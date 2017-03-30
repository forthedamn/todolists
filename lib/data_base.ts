import * as fs from 'fs';
import * as path from 'path';
import TodoItem from './interface/Todo_Item';

class DataBase {

  private dataObject: Array<TodoItem>;
  private dbPath: string;

  constructor(dbPath?: string) {

    this.dbPath = dbPath || __dirname; 
    this.init();
  }

  private init() {
    this.dbPath = path.join(this.dbPath, '.database.json');
    if (fs.existsSync) {
      try {
        this.dataObject = JSON.parse(fs.readFileSync(this.dbPath).toString());
      } catch(e) {
        console.error('[DataBase error]');
      }
    return;
    }
    fs.writeFileSync(this.dbPath, '[]');
  }

  public writeData(data) {
    fs.writeFileSync(this.dbPath, JSON.stringify(this.dataObject));
  }

  public readData() {
    return this.dataObject;
  }
}

export default DataBase;
