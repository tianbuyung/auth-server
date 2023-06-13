const { readFile, writeFile } = require('node:fs/promises');

const createLogs = async (data) => {
  try {
    const logs = await readFile('./logs/logs.json', 'utf-8');
    const parsedLogs = JSON.parse(logs);
    parsedLogs.push(data);

    const dataToStringify = JSON.stringify(parsedLogs, null, 2);
    await writeFile('./logs/logs.json', dataToStringify, 'utf-8');
  } catch (error) {
    console.log(error);
  }
}

module.exports = createLogs;