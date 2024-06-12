import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('tasks.db');

export const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT,
        completed BOOLEAN
      );`
    );
  });
};

export const insertTask = (text, callback) => {
  console.log('Inserindo no banco');
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO tasks (text, completed) VALUES (?, ?);',
      [text, false],
      (_, { insertId }) => callback(insertId),
      (_, error) => console.log(error)
    );
  });
  console.log('Dados onseridos');
};

export const updateTaskCompletion = (id, completed) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE tasks SET completed = ? WHERE id = ?;',
      [completed, id],
      (_, result) => console.log('Updated:', result),
      (_, error) => console.log(error)
    );
  });
};

export const getTasks = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM tasks;',
      [],
      (_, { rows }) => {
        const tasks = rows._array;
        console.log('Tasks:', tasks); // Log tasks array
        callback(tasks);
      },
      (_, error) => console.log(error)
    );
  });
};

