var fs = require("fs");
var xlsx = require("node-xlsx");
var path = "tables";
var inputPath = "./data2.json";

parseExcel();

function parseExcel(){
	var data = "{\n";//用来存放所有的表
	const items = fs.readdirSync(path);
	var count = items.length;
	for(let i = 0 ; i < items.length; i++){
		console.log(items[i]);
		let str = items[i].split(".")[0];
		if(str[0]=="~"){
			count--;
			continue;
		}
		let tableEnding = i == count-2?"\t}\n" :"\t},\n";
		//将每张表存在一个对象里
		// data[str] = {};
		data+=('\t"' + str + '":\n\t{\n');
		var list = xlsx.parse(path + "/" + items[i]);
		console.log("listlength:" + list.length);
		var tableData = list[0].data;
		var typeArray =  tableData[1];
        var keyArray =  tableData[2];
		for(let j = 3; j < tableData.length ; j++){
			data += ('\t"' + tableData[j][0] + '":{');
			let ending = j == tableData.length - 1 ?"}\n" :"},\n";
			for(let z = 1; z < tableData[j].length;z++){
				if(z!=tableData[j].length-1){
					data += ('"' + keyArray[z] + '":' + changeValue(tableData[j][z] , typeArray[z])+",");
				}else{
					data += ('"' + keyArray[z] + '":' + changeValue(tableData[j][z] , typeArray[z])+ending);
				}
			}
			
		}
		data += tableEnding;
	}
	// data -=",";
	data += "}"
	writeFile(inputPath , data);
}

function changeValue(value,type)
{
    if(value == null || value =="null") return ""
    if(type =="int") return Math.floor(value);
    if(type =="Number") return value;
    if(type =="string") return '"' + value + '"';
	return value;
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