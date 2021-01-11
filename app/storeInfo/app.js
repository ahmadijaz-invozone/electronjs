const os = require('os');
const fse = require('fs-extra');
const env = require('dotenv').config();

// Get the Os Info and return it
const OsInfo = async () =>
  `Type = ${JSON.stringify(os.type())}\nUptime = ${JSON.stringify(
    os.uptime()
  )}\nMy Info = ${JSON.stringify(os.userInfo())}`;

// Check and create folder if it doesn't exists
const CheckDirectory = async (Directory) =>
  new Promise((resolve, reject) => {
    if (!fse.existsSync(Directory)) {
      fse.mkdir(Directory, (err) => {
        if (err) reject(err);
        else resolve('Directory Created successfully!');
      });
    } else resolve('Directory already Exists!');
  });

// Check file rights at given path with given rights
const CheckFileRights = async (FilePath, Right) =>
  new Promise((resolve, reject) => {
    fse.access(FilePath, Right, (err) => {
      if (err) reject(err);
      else resolve('Successful.');
    });
  });

// write given content to file in a given path
const WriteFile = (FileContent, FilePath) =>
  new Promise((resolve, reject) => {
    CheckFileRights(FilePath, fse.constants.F_OK)
      .then(() => {
        resolve('File already Exists!');
      })
      .catch(() => {
        fse.writeFile(FilePath, FileContent, (err) => {
          if (err) reject(err);
          else resolve('Successful!');
        });
      });
  });

// read file from the given path
const ReadFile = async (FilePath) =>
  new Promise((resolve, reject) => {
    CheckFileRights(FilePath, fse.constants.R_OK)
      .then(() => {
        fse.readFile(FilePath, 'utf8', (err, data) => {
          if (err) reject(err);
          else resolve(data);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });

// exporting the main function
module.exports = { OsInfo, ReadFile, CheckDirectory, WriteFile, os, env };
