# Backup Repos
>  An application to run git

## Option 1: Convert to an Executable (.exe)
This allows you to run the script like a standalone program.
```
Install pkg to bundle Node.js into an executable:
npm install -g pkg
```

Convert the script to an executable:
```
pkg backup-repos.js --output backup-repos.exe
```
Now, backup-repos.exe can be placed in `C:\Users\YourUser\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup` so it runs automatically when you start Windows.

## Option 2: Use Task Scheduler (Preferred)
This is the easiest and safest way to make the script run on its own at startup.

Steps:
1. Open Task Scheduler (Win + R → type taskschd.msc → Enter).
2. Click "Create Basic Task" (right panel).
3. Name it: Auto Git Backup
4. Trigger: Select "When the computer starts" or "At log on".
5. Action: Choose "Start a program".
6.In "Program/script", enter:
```
C:\Program Files\nodejs\node.exe
```
7. In "Add arguments (optional)", enter:
```
"D:\path\to\backup-repos.js"
```
8. Finish → Your script will now run automatically at startup.

## Option 3: Add to Startup Folder
1. Create a .bat file (start-backup.bat) with:
```
@echo off
node "D:\path\to\backup-repos.js"
exit
```
2. Move this file to:
```
C:\Users\YourUser\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup
```
It will now run every time Windows starts.