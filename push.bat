@echo off
setlocal

:: 获取当前时间
for /f "tokens=1-6 delims=/: " %%a in ('date /t') do (set mydate=%%c-%%a-%%b)
for /f "tokens=1-6 delims=/: " %%a in ('time /t') do (set mytime=%%a:%%b:%%c)

:: 格式化提交信息
set commit_message=%mydate% %mytime%

:: 执行git commit
git add .
git commit -m "%commit_message%"

:: 执行git push
git push origin master

endlocal