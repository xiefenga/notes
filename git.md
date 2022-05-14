## 配置

1. local 只对某个仓库有效
2. global 只对当前用户所有仓库有效
3. system 对系统所有登录的用户有效

```shell
git config --local
git config --global
git config --system
```

配置 user 信息：

```shell
git config --global user.name 'xxxxxx'
git config --global user.email 'xxxxx'
```

## 分支

- `git branch`：查看所有分支
- `git branch xxx`：创建新分支
- `git checkout xxx`：切换分支
- `git checkout -b xxx`：创建并切换分支

### 分支合并

- `git merge xxx`：合并分支（将该分支合并到当前分支），此时在 Git 中会产生一个特殊的提交记录，它有两个父节点
- `git rebase xxx`：合并分支， 实际上就是取出当前分支一系列的提交记录，然后复制它们在另外一个分支逐个的放下去

默认情况下，git 执行快进式合并（fast-farward merge），会直接将 Master 分支指向 Develop 分支。
使用 `--no-ff` 参数后，会执行正常合并，在 Master 分支上生成一个新节点。为了保证版本演进的清晰，建议采用这种方法

### 远程分支

远程分支反映了远程仓库的**状态**（上次和它通信时）

远程分支有一个命名规范：`<remote name>/<branch name>` 

`origin/main` 分支，代表这个分支叫 `main`，远程仓库的名称为 `origin`，大多数的开发人员会将它们主要的远程仓库命名为 `origin` 

当使用 `git clone` 某个仓库时，Git 已经帮我们把远程仓库的名称设置为 `origin` 了

远程分支有一个特别的属性，在你检出时自动进入分离 HEAD 状态，因为不能直接在这些分支上进行操作

`origin/main` 指的就是远程分支，它存在本地代表着远程仓库该分支的状况，无法对该分支直接进行操作

## HEAD

HEAD 默认指向某个分支，而不是某个提交记录，而分支默认指向最新的的提交记录

通过 `cat .git/HEAD` 可以查看当前 HEAD 指向

### 分离 HEAD

分离 HEAD 就是让 HEAD 指向某个提交记录，通过 checkout 某个提交记录的 hash 值即可让 HEAD 指向该提交记录

```shell
git checkout hash
```

Git 中的 hash 基于 SHA-1 共有四十位，Git 对 hash 的处理很智能。你只需要提供能够唯一标识提交记录的前几个字符即可

### 相对引用

- 使用 `^` 向上移动 1 个提交记录
- 使用 `~<num>` 向上移动多个提交记录，如 `~3` 

```shell
git checkout main^
```

也可以将 `HEAD` 作为相对引用的参照

```shell
git checkout HEAD^
```

`~` 操作符后面可以跟一个数字，指定向上移动多少次，该数字可选，不跟数字时与 `^` 作用相同

 `-f` 选项让分支指向另一个提交

```shell
git branch -f main hash

git branch -f main HEAD^
```

## 撤销变更

`git reset` 通过把分支记录回退几个提交记录来实现撤销改动，这样之后原来指向的提交记录就跟从来没有提交过一样

但是在 reset 后，之前提交所做的变更还在，但是处于未加入暂存区状态

但是 `git reset` 仅在本地起作用，是没有办法影响到远程分支的，使用了这个之后，vscode 会提示需要拉取最新代码

```shell
git reset HEAD^
```

为了撤销更改并**分享**给别人，需要使用 `git revert` 

revert 的原理是提交一个新的提交，然后让这个新提交的内容和前一次提交内容相同，这样 push 到远程之后，就实现了分享

```shell
git revert HEAD
```

**和 reset 不同的是后面不是要移动到的位置，而是需要撤销的提交，这样就会新建一个新的提交和需要撤销的提交的父提交相同**

## 远程

`git fetch` 完成了仅有的但是很重要的两步:

- 从远程仓库下载本地仓库中缺失的提交记录
- 更新远程分支指针（如 `origin/main`）

`git fetch` 实际上将本地仓库中的远程分支更新成了远程仓库相应分支最新的状态

但是不会改变你本地仓库的状态，不会更新你的 `main` 分支，也不会修改你磁盘上的文件

**合并远程分支**

当远程分支中有新的提交时，我们可以像合并本地分支那样来合并远程分支：

- `git cherry-pick origin/main`
- `git rebase origin/main`
- `git merge origin/main`

Git 提供了一个专门的命令 `git pull` 来完成这两个操作，实际上就是 `git fetch` 和 `git merge origin/xxx` 的缩写

`git pull --rebase` 就是 fetch 和 rebase 的简写

**上传变更**

`git push` 负责将**你的**变更上传到指定的远程仓库，并在远程仓库上合并你的新提交记录，同时远程分支 `origin/xxx` 也同样被更新

`git push` 不带任何参数时的行为与 Git 的一个名为 `push.default` 的配置有关

## 储藏

贮藏会处理工作目录的脏的状态：通过跟踪文件的修改与暂存的改动，然后将未完成的修改保存到一个栈上

我们可以在任何时候重新应用这些改动，甚至在不同的分支上

通过 `git stash` 或 `git stash push` 将新的贮藏推送到栈上，让工作目录恢复干净状态

使用 `git stash list` 可以查看储藏的东西

```shell
$ git stash list
stash@{0}: WIP on master: 049d078 added the index file
stash@{1}: WIP on master: c264051 Revert "added file_size"
stash@{2}: WIP on master: 21d80a5 added number to log
```

使用 `git stash apply` 会重新运用栈顶的储藏，运用之后该储藏还是存在在栈中

通过 `git stash apply stash@{2}` 可以指定运用某个旧的储藏

使用 `git stash drop` 可以移除某个贮藏

`git stash pop` 可以应用栈顶贮藏然后立即从栈上扔掉它

## 重命名

```shell
git mv xx xxx
```

## 版本查看

```shell
git log
git log --online 	# 简介的方式
git log -nx		 	# 最近x次提交
git log --all 	 	# 所有分支
git log --graph     # 版本的演进 ui比较好
```

