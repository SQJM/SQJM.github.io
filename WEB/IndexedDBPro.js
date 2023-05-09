class IndexedDB {
    /**
     * @param {string} name 数据库名称
     * @param {number} version 数据库版本号
     * @param {Array<{storeName: string, keyPath?: string, indexes?: Array}>} stores 数据表信息列表，可选字段包括 keyPath 和 indexes，分别用于指定主键和索引
     */
    constructor(name, version, stores) {
        this.name = name;
        this.version = version;
        this.stores = stores;
        this.database = null;
    }

    /**
     * 打开数据库连接
     */
    async open() {
        return new Promise((resolve, reject) => {
            const request = window.indexedDB.open(this.name, this.version);

            request.onerror = () => {
                reject(`Failed to open database ${this.name}.`);
            };

            request.onsuccess = () => {
                console.log(`Connected to database ${this.name}.`);

                this.database = request.result;

                resolve(this.database);
            };

            request.onupgradeneeded = (event) => {
                console.log(`Upgrading database ${this.name}.`);

                const database = event.target.result;

                this.stores.forEach(({
                    storeName,
                    keyPath,
                    indexes
                }) => {
                    if (!database.objectStoreNames.contains(storeName)) {
                        const objectStore = database.createObjectStore(storeName, {
                            keyPath: keyPath || 'id',
                        });

                        if (indexes) {
                            indexes.forEach(({
                                name,
                                field,
                                options
                            }) => {
                                objectStore.createIndex(name, field, options);
                            });
                        }
                    }
                });
            };
        });
    }

    /**
     * 关闭数据库连接
     */
    close() {
        if (this.database) {
            this.database.close();

            this.database = null;

            console.log('Database connection closed.');
        }
    }

    /**
     * 添加数据
     * @param {string} storeName 数据表名称
     * @param {Object} record 数据记录对象
     */
    async add(storeName, record) {
        const transaction = this.database.transaction(storeName, 'readwrite');

        const objectStore = transaction.objectStore(storeName);

        return new Promise((resolve, reject) => {
            const request = objectStore.add(record);

            request.onerror = () => {
                reject(`Failed to add record with id ${record.id}.`);
            };

            request.onsuccess = () => {
                console.log(`Record with id ${record.id} added to ${storeName}.`);

                resolve(request.result);
            };
        });
    }

    /**
     * 删除数据
     * @param {string} storeName 数据表名称
     * @param {(number|string)} id 主键值
     */
    async remove(storeName, id) {
        const transaction = this.database.transaction(storeName, 'readwrite');

        const objectStore = transaction.objectStore(storeName);

        return new Promise((resolve, reject) => {
            const request = objectStore.delete(id);

            request.onerror = () => {
                reject(`Failed to delete record with id ${id}.`);
            };

            request.onsuccess = () => {
                console.log(`Record with id ${id} deleted from ${storeName}.`);

                resolve(request.result);
            };
        });
    }

    /**
     * 修改数据
     * @param {string} storeName 数据表名称
     * @param {Object} record 数据记录对象
     */
    async update(storeName, record) {
        const transaction = this.database.transaction(storeName, 'readwrite');

        const objectStore = transaction.objectStore(storeName);

        return new Promise((resolve, reject) => {
            const request = objectStore.put(record);

            request.onerror = () => {
                reject(`Failed to update record with id ${record.id}.`);
            };

            request.onsuccess = () => {
                console.log(`Record with id ${record.id} updated in ${storeName}.`);

                resolve(request.result);
            };
        });
    }

    /**
     * 查询单条数据
     * @param {string} storeName 数据表名称
     * @param {(number|string)} id 主键值
     */
    async getById(storeName, id) {
        const transaction = this.database.transaction(storeName, 'readonly');

        const objectStore = transaction.objectStore(storeName);

        return new Promise((resolve, reject) => {
            const request = objectStore.get(id);

            request.onerror = () => {
                reject(`Record with id ${id} not found in ${storeName}.`);
            };

            request.onsuccess = () => {
                console.log(`Record with id ${id} retrieved from ${storeName}.`);

                resolve(request.result);
            };
        });
    }

    /**
     * 查询所有数据
     * @param {string} storeName 数据表名称
     */
    async getAll(storeName) {
        const transaction = this.database.transaction(storeName, 'readonly');

        const objectStore = transaction.objectStore(storeName);

        const records = [];

        return new Promise((resolve, reject) => {
            objectStore.openCursor().onsuccess = (event) => {
                const cursor = event.target.result;

                if (cursor) {
                    records.push(cursor.value);

                    cursor.continue();
                } else {
                    console.log(`All records retrieved from ${storeName}.`);

                    resolve(records);
                }
            };
        });
    }

    /**
     * 清空数据表
     * @param {string} storeName 数据表名称
     */
    async clear(storeName) {
        const transaction = this.database.transaction(storeName, 'readwrite');

        const objectStore = transaction.objectStore(storeName);

        objectStore.clear();
    }

    /**
     * 根据索引查询数据
     * @param {string} storeName 数据表名称
     * @param {string} indexName 索引名称
     * @param {*} value 索引值
     */
    async getByIndex(storeName, indexName, value) {
        const transaction = this.database.transaction(storeName, 'readonly');

        const objectStore = transaction.objectStore(storeName);
        const index = objectStore.index(indexName);

        return new Promise((resolve, reject) => {
            const request = index.getAll(value);

            request.onerror = () => {
                reject(`Failed to get records by index ${indexName} with value ${value}.`);
            };

            request.onsuccess = () => {
                console.log(
                    `All records retrieved from ${storeName} with index ${indexName} and value ${value}.`
                );
                resolve(request.result);
            };
        });
    }

    /**
     * 批量添加数据
     * @param {string} storeName 数据表名称
     * @param {Array<Object>} records 数据记录对象列表
     */
    async addAll(storeName, records) {
        const transaction = this.database.transaction(storeName, 'readwrite');

        const objectStore = transaction.objectStore(storeName);

        return new Promise((resolve, reject) => {
            const requests = records.map((record) => objectStore.add(record));

            requests.forEach((request, index) => {
                request.onerror = () => {
                    reject(`Failed to add record at index ${index}.`);
                };
                request.onsuccess = () => {
                    console.log(`Record at index ${index} added to ${storeName}.`);

                    if (index === requests.length - 1) {
                        resolve();
                    }
                };
            });
        });
    }
    /**
     * 批量修改数据
     * @param {string} storeName 数据表名称
     * @param {Array<Object>} records 数据记录对象列表
     */
    async updateAll(storeName, records) {
        const transaction = this.database.transaction(storeName, 'readwrite');

        const objectStore = transaction.objectStore(storeName);

        return new Promise((resolve, reject) => {
            const requests = records.map((record) => objectStore.put(record));

            requests.forEach((request, index) => {
                request.onerror = () => {
                    reject(`Failed to update record at index ${index}.`);
                };

                request.onsuccess = () => {
                    console.log(`Record at index ${index} updated in ${storeName}.`);

                    if (index === requests.length - 1) {
                        resolve();
                    }
                };
            });
        });
    }

    /**
     * 获取数据库中的所有数据表名称
     */
    getObjectStoreNames() {
        return Array.from(this.database.objectStoreNames);
    }
}


/*


// 定义数据表信息
const stores = [
  {
    storeName: 'users',
    keyPath: 'id',
    indexes: [
      { name: 'name', field: 'name', options: { unique: false } },
      { name: 'email', field: 'email', options: { unique: true } },
    ],
  },
];

// 创建 IndexedDB 实例
const db = new IndexedDB('myDatabase', 1, stores);

// 打开数据库连接
db.open().then(() => {
  // 添加数据
  const record1 = { id: 1, name: 'Alice', email: 'alice@example.com' };
  db.add('users', record1);

  const record2 = { id: 2, name: 'Bob', email: 'bob@example.com' };
  db.add('users', record2);

  // 修改数据
  const updatedRecord = { id: 1, name: 'Charlie', email: 'charlie@example.com' };
  db.update('users', updatedRecord);

  // 查询单条数据
  db.getById('users', 1).then((record) => {
    console.log(record);
  });

  // 查询所有数据
  db.getAll('users').then((records) => {
    console.log(records);
  });

  // 删除数据
  db.remove('users', 2);

  // 清空数据表
  db.clear('users');

  // 根据索引查询数据
  db.getByIndex('users', 'name', 'Charlie').then((records) => {
    console.log(records);
  });

  // 批量添加数据
  const records = [
    { id: 3, name: 'David', email: 'david@example.com' },
    { id: 4, name: 'Emma', email: 'emma@example.com' },
  ];
  db.addAll('users', records);

  // 批量修改数据
  const updatedRecords = [
    { id: 3, name: 'Frank', email: 'frank@example.com' },
    { id: 4, name: 'Grace', email: 'grace@example.com' },
  ];
  db.updateAll('users', updatedRecords);

  // 获取数据库中的所有数据表名称
  console.log(db.getObjectStoreNames());

  // 关闭数据库连接
  db.close();
});

*/