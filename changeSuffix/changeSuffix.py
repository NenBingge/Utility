import os
import re

prefix = ".bgzy"
def all_files_path(rootDir):   
    isDetection = False
    for root, dirs, files in os.walk(rootDir):     # 分别代表根目录、文件夹、文件
        for file in files:                         # 遍历文件
            if(~isDetection):
                isDetection = True
                if("." + file.split(".")[1] == prefix):
                    print("have tranfrom")
                    return
            file_path = os.path.join(root, file)   # 获取文件绝对路径  
            filepaths.append(file_path)            #将文件路径添加进列表
            strs = file.split(".",1)
            newName = strs[0]+prefix
            if(os.path.exists(os.path.join(root,newName))):
                print("不支持重名")
                continue
            os.rename(file_path , os.path.join(root,newName))
        for dir in dirs:                           # 遍历目录下的子目录
            dir_path = os.path.join(root, dir)     # 获取子目录路径
            all_files_path(dir_path)               # 递归调用
            
def change2unable():
    for root, dirs, files in os.walk("."):
        for dir in dirs:
            dir_path = os.path.join(root, dir)
            all_files_path(dir_path)
    if(len(filepaths)>0):
        with open('dir.txt', 'w') as f:
            for filepath in filepaths:
                f.write(filepath + '\n')
            
def recover():
    with open("dir.txt","r") as f:
        for file in f.readlines():
            frontPart = re.match("(.+)[.]" , file).group(1)
            oldFile = frontPart + prefix            
            if(os.path.exists(oldFile)):
                os.rename(oldFile , file.rstrip())
            
if __name__ == "__main__":
    filepaths = []          # 初始化列表用来
    str = input("1.toUnable,2.recover:")
    if(str=="1"):
        change2unable()
    elif(str=="2"):
        recover()
   

