const path = require('path')
const fsPromise = require('fs/promises')

const renameFilenames = async (dirPath) => {
  try {
    const files = await fsPromise.readdir(dirPath)
    for (const file of files) {
      if (file !== '.DS_Store') {
        const filePath = path.resolve(dirPath, file)
        const stat = await fsPromise.lstat(filePath)
        if (stat.isDirectory()) {
          await renameFilenames(filePath)
        } else {
          await fsPromise.rename(filePath, "axtext.txt")
        }
      }
    }
  } catch (e) {
    console.log(e.message)
  }
}