var fs = require("fs");
var xlsx = require("node-xlsx");
var path = "tables";
var inputPath = "./data.json";

parseExcel();

function parseExcel(){
	var data = {};//用来存放所有的表
	const items = fs.readdirSync(path);
	console.log(items);
	for(let i = 0 ; i < items.length; i++){
		if(items[i]=="~")continue;
		console.log(items[i]);
		let str = items[i].split(".")[0];
		console.log(str);
		//将每张表存在一个对象里
		data[str] = {};
		var list = xlsx.parse(path + "/" + items[i]);
		console.log("listlength:" + list.length);
		var tableData = list[0].data;
		var typeArray =  tableData[1];
        var keyArray =  tableData[2];
		for(let j = 3; j < tableData.length ; j++){
			var tempData = {};
			for(let z = 1; z < tableData[j].length;z++){
				tempData[keyArray[z]] = changeValue(tableData[j][z] , typeArray[z]);
			}
			data[str][tableData[j][0]] = tempData;
		}
	}
	console.log(data);
	writeFile(inputPath , JSON.stringify(data));
}

function changeValue(value,type)
{
    if(value == null || value =="null") return ""
    if(type =="int") return Math.floor(value);
    if(type =="Number") return value;
    if(type =="String" || type == "string") return value;  
}


//写文件
function writeFile(fileName,data)
{  
  fs.writeFile(fileName,data,'utf-8',complete);
  function complete(err)
  {
      if(!err)
      {
          console.log("文件生成成功");
      }   
  } 
}