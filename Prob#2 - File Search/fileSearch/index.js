
const fileSearchRecursive = (fileToSearch, filesObj, filePath) => {
  
  var jsonObj = JSON.parse(filesObj)
  var subfolders = []
  var pathList = []

  for(var x in jsonObj["_files"]){
    if( jsonObj._files[x].localeCompare(fileToSearch)==0 ){
      pathList.push(filePath+'/'+jsonObj._files[x])
    }
  }
  
  for(var key in jsonObj){
    if(jsonObj.hasOwnProperty(key)){
      if( key.localeCompare("_files")!=0 ){
        subfolders.push(key)
      }
    }
  }

  subfolders.sort()

  for(var index in subfolders){
    pathList = pathList.concat(fileSearchRecursive(fileToSearch, JSON.stringify( jsonObj[subfolders[index]] ), filePath+'/'+subfolders[index]))
  }
  
  return pathList
}

const fileSearch = (fileToSearch, filesObj) => {
  const jsonObj = JSON.parse(filesObj)
  for(var key in jsonObj){
    return fileSearchRecursive(fileToSearch, JSON.stringify( jsonObj[key] ), '/'+key)
  }
}

var testDirectory = '{"FolderA": {"_files": [ "file1", "file2" ] ,"SubfolderC": {"_files": [ "file1" ]} ,"SubfolderB": {"_files" : [ "file1" ]}}} '
var query = 'file1'

console.log(fileSearch(query, testDirectory))
