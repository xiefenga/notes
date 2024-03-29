# 基本使用

> Debug 是 DOS、Windows 提供的实模式（8086模式）程序的调试工具。
>
> 可以查看 CPU 各种寄存器中的内容、内存的情况和在机器码级别跟踪程序的运行。

常用命令（不区分大小写）：

- `R`：查看、改变 CPU 寄存器的内容
- `D`：查看内存中的内容
- `E`：改写内存中的内容
- `U`：将内存中的机器指令翻译成汇编指令
- `T`：执行一条机器指令
- `A`：以汇编指令的格式在内存中写入一条机器指令

## 操作寄存器

- 运行 Debug 时，输入 `r`，即可查看寄存器信息
- 运行 `r ax` 指令会出现 `:` 提示，即可改变寄存器的值

![](http://oss.xiefeng.tech/img/20210530132140.png)

## 操作内存

1. 使用 `d` 命令，可以查看内存中的内容，默认显示 128 个内存单元的内容，再接着使用 `d` 即可查看后序内容。

2. 查看具体某个地址开始的内容通过 `d 段地址:偏移地址` 即可查看从该地址开始的内存中的内容；

3. 使用 `d 段地址:起始偏移地址 结尾偏移地址` 即可范围查看内存中的内容

显示的结果：

1. 每行默认输出 16 个地址的内容，中间有一个 `-` 连接，便于区分前 8 个字节和后 8 个字节
2. 内容通过 16 进制输出，每个内存单元一个 16 进制数
3. 左边显示的是该行的起始地址
4. 右边是每个内存单元中的数据对应的 ASCII 字符

![](http://oss.xiefeng.tech/img/20210530132854.jpg)

`e` 命令可以改写内存中的内容，通过 `e 起始地址 数据 数据 数据 ....` 即可写入数据，可以直接输入字符：

```shell
-d 1000:10 2A

-e 40 41 42 43 44 45 # 分别对应 ASCII 字符 @ A B C D
```

![](http://oss.xiefeng.tech/img/20210530134452.png)

## 机器指令

`u` 命令可以查看内存中的数据（作为机器指令）所对应的汇编指令

```shell
# b80100 -> mov ax, 0001
# b90200 -> mov cx, 0002
# 01c8   -> add ax, cx 

-e 1000:0 b8 01 00 b9 02 00 01 c8
-u 1000:0 7
```

![](http://oss.xiefeng.tech/img/20210530135332.png)

`t` 命令可以执行一条或多条指令（CS、IP 所指向地址中的）：

1. 要使用 `t` 命令，需要先修改 CS、IP 寄存器的值，指向需要执行的指令所的地址
2. 然后使用 `t` 命令使得 CPU 执行 CS、IP 指向地址中的指令
3. 使用一次 `t` 命令只会执行一条指令，接着使用 `t` 就可以接着执行后序指令

`a` 命令可以以汇编的形式向内存中写入指令：

![](http://oss.xiefeng.tech/img/20210530140549.png)

