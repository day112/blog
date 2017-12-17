# Git使用总结

[原文地址](https://github.com/hua03/blog/blob/master/blog/笔记/Git使用总结.md#L3)

**参考站点：**

- [Git官方文档](https://git-scm.com/docs)
- [《精通Git》](https://git-scm.com/book/zh/v2/)
- [Github速查手册](https://services.github.com/on-demand/downloads/github-git-cheat-sheet.pdf)
- [可视化Git速查手册](http://ndpsoftware.com/git-cheatsheet.html#loc=remote_repo;)
- [《Git常用命令》](http://blog.csdn.net/afei__/article/details/51476529)

# 目录

<!-- TOC depthFrom:2 depthTo:3 -->

- [1. Git命令](#1-git命令)
  - [1.1. 创建项目](#11-创建项目)
  - [1.2. 基本操作](#12-基本操作)
  - [1.3. 分支与合并](#13-分支与合并)
  - [1.4. 远程管理](#14-远程管理)
  - [1.5. 检查与对比](#15-检查与对比)
  - [1.6. 补丁与BUG修复](#16-补丁与bug修复)
- [2. Git配置](#2-git配置)
  - [2.1. 用户信息](#21-用户信息)
  - [2.2. 默认编辑器](#22-默认编辑器)
  - [2.3. 配置SSH](#23-配置ssh)
- [3. 获取仓库](#3-获取仓库)
  - [3.1. 初始化仓库](#31-初始化仓库)
  - [3.2. 克隆已有的仓库](#32-克隆已有的仓库)
- [4. 分支管理](#4-分支管理)
- [5. 撤销操作](#5-撤销操作)
  - [5.1. 撤销commit信息](#51-撤销commit信息)
  - [5.2. 取消暂存（add）的文件](#52-取消暂存add的文件)
  - [5.3. 撤消对文件的修改](#53-撤消对文件的修改)
- [6. 储藏修改](#6-储藏修改)
  - [6.1. 储藏修改](#61-储藏修改)
  - [6.2. 查看储藏](#62-查看储藏)
  - [6.3. 提取储藏的修改](#63-提取储藏的修改)
  - [6.4. 删除储藏的修改](#64-删除储藏的修改)

<!-- /TOC -->

## 1. Git命令

### 1.1. 创建项目
  - [init](https://git-scm.com/docs/git-init)  初始化仓库 
  - [clone](https://git-scm.com/docs/git-clone)  克隆仓库 

### 1.2. 基本操作
  - [add](https://git-scm.com/docs/git-add)      提交修改到暂存区                       
  - [status](https://git-scm.com/docs/git-status)  查看当前工作区状态         
  - [diff](https://git-scm.com/docs/git-diff)    显示commit之间或者commit和工作区的diff 
  - [commit](https://git-scm.com/docs/git-commit)  将修改提交到版本库         
  - [reset](https://git-scm.com/docs/git-reset)  重置HEAD，可用于取消对文件的修改       
  - [rm](https://git-scm.com/docs/git-rm)          从工作区和暂存区中删除文件 
  - [mv](https://git-scm.com/docs/git-mv)        移动文件或目录                         


### 1.3. 分支与合并
  -  [branch](https://git-scm.com/docs/git-branch)  创建，管理，删除分支  
  -  [checkout](https://git-scm.com/docs/git-checkout)    1.切换分支 2.恢复工作区文件状态 
  -  [merge](https://git-scm.com/docs/git-merge)    合并分支             
  -  [mergetool](https://git-scm.com/docs/git-mergetool)  合并冲突解决工具                    
  -  [log](https://git-scm.com/docs/git-log) 显示commit日志       
  -  [stash](https://git-scm.com/docs/git-stash) 储藏修改，保留工作区状态            
  -  [tag](https://git-scm.com/docs/git-tag)  标签管理             


### 1.4. 远程管理
  - [fetch](https://git-scm.com/docs/git-fetch)  拉取其他远程仓库的更新 
  - [pull](https://git-scm.com/docs/git-pull)  拉取远程仓库的更新 
  - [push](https://git-scm.com/docs/git-push) 推送更新到远程仓库   
  - [remote](https://git-scm.com/docs/git-remote)  远程仓库链接管理   


### 1.5. 检查与对比
  -  [show](https://git-scm.com/docs/git-show)  显示各种信息：`标签`、`commit`、`工作区` 
  -  [log](https://git-scm.com/docs/git-log) 显示commit日志    
  -  [diff](https://git-scm.com/docs/git-diff)  显示commit之间或者commit和工作区的diff等                                    
  -  [shortlog](https://git-scm.com/docs/git-shortlog)       
  -  [describe](https://git-scm.com/docs/git-describe)   根据描述查找对应信息                                                                                   

### 1.6. 补丁与BUG修复
  -  [apply](https://git-scm.com/docs/git-apply) 将补丁应用于文件   
  -  [cherry-pick](https://git-scm.com/docs/git-cherry-pick)   将某一分支的commit应用于其他分支    
  -  [diff](https://git-scm.com/docs/git-diff) 显示commit之间或者commit和工作区的diff等   
  -  [rebase](https://git-scm.com/docs/git-rebase)  把一个分支的修改合并到当前分支   
  -  [revert](https://git-scm.com/docs/git-revert)版本回退，取消提交返回上一版本   

## 2. Git配置

`~/.gitconfig`是git的配置文件

### 2.1. 用户信息

```bash
git config --global user.name "username"
git config --global user.email "useremail@gmail.com"
```

### 2.2. 默认编辑器

```bash
git config --global core.editor vim
```

### 2.3. 配置SSH

#### 1. 创建 SSH Key。

> **注意：** Linux的用户目录一般是`~/`文件夹；Windows下可以使用`cd %USERPROFILE%`来获取当前用户的路径。

在用户主目录下，看看有没有.ssh目录，如果有，再看看这个目录下有没有`id_rsa`和`id_rsa.pub`这两个文件，如果已经有了，可直接跳到下一步。如果没有，打开 Shell（Windows下打开Git Bash），创建SSH Key：

```bash
ssh-keygen -t rsa -C "youremail@example.com"
```

该命令会在用户目录中生成`.ssh`文件夹，里面包含两个文件`id_rsa`和`id_rsa.pub`。这两个就是SSH Key的秘钥对，`id_rsa`是私钥，不能泄露出去，`id_rsa.pub`是公钥，可以放心地告诉别人。

#### 2. 添加`SSH Keys`

然后登录GitHub -> 打开`Settings` -> `SSH and GPG keys` -> 点`Add SSH Key`

填上任意Title，在Key文本框里粘贴id_rsa.pub文件的内容。（**注意：**复制秘钥时，多余的空格会导致秘钥添加失败）。

![配置SSH](http://opd59bmxu.bkt.clouddn.com/20171217223328.png)

#### 3. 注意事项

- 复制秘钥时，多余的空格会导致秘钥添加失败
- 只有`SSH`协议才能不用输入密码，`https`协议不行。也就是说在克隆或者添加remote的时候只能使用`SSH协议`。

![克隆仓库选择SSH协议](http://opd59bmxu.bkt.clouddn.com/2017121722459.png)


## 3. 获取仓库

### 3.1. 初始化仓库

```bash
git init
```

### 3.2. 克隆已有的仓库

```bash
git clone <url> <dirname>
```

## 4. 分支管理

```bash
#列出所有分支
git branch

# 创建新分支
git branch <new branchname>

# 切换到其他分支
git checkout <branchname>
```

 

## 5. 撤销操作

### 5.1. 撤销commit信息

**使用场景：**有时候我们提交完了才发现漏掉了几个文件没有添加，或者提交信息写错了。 此时，可以运行带有`--amend`选项的提交命令尝试重新提交

```bash
git commit --amend
```

这个命令会将暂存区中的文件提交。 如果自上次提交以来你还未做任何修改（例如，在上次提交后马上执行了此命令），那么快照会保持不变，而你所修改的只是提交信息。
 
```bash
git commit -m 'initial commit'
git add forgotten_file
git commit --amend
```
 
第二次commit信息将覆盖第一次的。

### 5.2. 取消暂存（add）的文件

**使用场景：**例如，你已经修改了两个文件并且想要将它们作为两次独立的修改提交，但是却意外地输入了 git add * 暂存了它们两个。

```bash
# 暂存文件
git add -A

# 查看状态
git status
#位于分支 test
#要提交的变更：
#  （使用 "git reset HEAD <文件>..." 以取消暂存）
#
#        新文件：   123.md
#        新文件：   "blog/1.md"
#        修改：     "blog/2.md"

# 取消 123.md 的暂存操作
git reset HEAD 123.md
``` 

### 5.3. 撤消对文件的修改

```bash
git checkout -- 123.md
```
`git checkout -- [file]` 是一个危险的命令。


## 6. 储藏修改

**适用场景：**
- 功能未完成又不想`commit`，但是又急需还原代码到上次`commit`（例如紧急**bug**修复）
- 想要切换到其他分支，但不想`commit`

**注意**
- `stash`是所有分支共享的，也就是是说A分支也能调用B分支`stash`的修改，因此在`pop`的时候要特别注意。

```bash
# 存储stash
git stash save [-p|--patch] [-k|--[no-]keep-index] [-q|--quiet] [-u|--include-untracked] [-a|--all] [<message>]

# 查看 stash list
git stash list [<options>]

# 查看stash的diff信息
git stash show [<stash>]

# 提取stashed state
git stash ( pop | apply ) [--index] [-q|--quiet] [<stash>]

# 从 stash list 中删除一个stashed state，如果没有 stash 参数就删除最近一个 stash
git stash drop [-q|--quiet] [<stash>]

# 从stash中创建一个分支
git stash branch <branchname> [<stash>]

# 清空stash，可能无法恢复（看git是否执行GC）
git stash clear
```

### 6.1. 储藏修改

```bash
# 暂存未commit的代码并还原所有修改
git stash

# 1. stash修改
# 2. 添加 stash message
git stash save  "fix issue #32"
```

### 6.2. 查看储藏

```bash
# 查看 stash list
git stash list

# 查看 stash@{0} 的diff信息
git stash show stash@{0}
```

### 6.3. 提取储藏的修改

```bash
# 1.还原最后一次stash的代码
# 2.删除对应的stash
git stash pop

# 1.还原最后一次stash的代码
# 2.保留对应的stash
git stash apply

# 提取stash@{2}的修改
git stash pop stash@{2}
git stash apply stash@{2}
```

### 6.4. 删除储藏的修改

```bash
# 清除所有的stash
git stash clear

# 删除stash@{1}
git stash drop stash@{1}
```

