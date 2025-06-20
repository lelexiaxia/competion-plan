@echo off
echo 系统诊断信息
echo ---------------
echo Node.js 版本:
node -v
echo npm 版本:
npm -v
echo 当前目录:
cd
echo 检查 Vite 版本:
npm list vite
echo 尝试启动开发服务器...
call npm run dev
pause 