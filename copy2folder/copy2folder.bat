echo off

set "NEED_TO_NAME=C:\Users\52706\Desktop\test\test2"

set "CURRENT_PATH=%~p0"
set "nj=%CURRENT_PATH:\= %"
for %%a in (%nj%) do set "CURRENT_NAME=%%a"
echo %CURRENT_NAME%

cd..
set "bd=%cd%"
set "bd=%bd:\= %"
for %%a in (%bd%) do set "FORWARD_NAME=%%a"
echo %FORWARD_NAME%

if not exist %NEED_TO_NAME% (md %NEED_TO_NAME%)

for /R %CURRENT_NAME% %%b in (*.txt) do copy %%b %NEED_TO_NAME%

@pause