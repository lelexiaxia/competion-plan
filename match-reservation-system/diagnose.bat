@echo off
echo 系统诊断信息
echo ---------------
echo Node.js 版本:
call node -v
echo npm 版本:
call npm -v
echo 当前目录:
cd
echo 检查端口 5174 和 5175 占用情况:
netstat -ano | findstr :5174
netstat -ano | findstr :5175
echo 尝试启动开发服务器...
call npm run dev
pause 