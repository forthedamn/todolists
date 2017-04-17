import * as fs from 'fs';
import * as path from 'path';
import TodoItem from './interface/Todo_Item';

class DataBase {

  private dataObject: Array<TodoItem>;
  private dbPath: string;

  constructor(dbPath?: string) {

    this.dbPath = dbPath || path.join(__dirname, '../../');
    this.init();
  }

  private init() {
    this.dbPath = path.join(this.dbPath, '.database.json');
    if (fs.existsSync(this.dbPath)) {
      try {
        this.dataObject = JSON.parse(fs.readFileSync(this.dbPath).toString());
      } catch(e) {
        console.error('[DataBase error]');
        console.error(e);
      }
      return;
    }
    fs.writeFileSync(this.dbPath, '[]');
    try {
        this.dataObject = []; 
      } catch(e) {
        console.error('[DataBase error]');
        console.error(e);
      }
      return;
  }

  public writeData(data) {
    fs.writeFileSync(this.dbPath, data);
  }

  public readData() {
    return this.dataObject;
  }
}

export default DataBase;
