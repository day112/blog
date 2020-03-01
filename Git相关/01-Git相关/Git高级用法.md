# Git高级用法



## 1. 打包增量文件

>  git archive --format=zip --prefix=html/ HEAD $(git diff --name-only HEAD~4 HEAD) > ../html.zip

主要使用`git archive`和`git diff`配合，`diff`可以是任意两次commit之间。