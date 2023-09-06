import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true, unique: true });
      console.log('jate database created');
    },
  });

// Function to add content to the database
export const putDb = async (content) => {

  const jateDb = await openDB('jate', 1);
  // Create a transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readwrite');
  // Open the desired object store
  const store = tx.objectStore('jate');
  // Add the content to the object store
  const request = store.put({ id: 1, value: content });
  // Get confirmation that the content was added
  const result = await request;
  console.log('text added to database', result);
};

// Function to get content from the database
export const getDb = async () => {
  console.log('getting text from database');
  // Create a connection to the database and version we want to use
  const jateDb = await openDB('jate', 1);
  // Create a transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readonly');
  // Open the desired object store
  const store = tx.objectStore('jate');
  // Get all the content from the database
  const request = store.get(1);
  // Get confirmation that the content was retrieved
  const result = await request;
  console.log('text retrieved from database', result.value);
  return result?.value;
};
  ;

initdb();
