+++
title = "WSL2 初体验"
date = 2020-05-25 19:22:50+08:00
+++

WSL2 已经作为 Windows 10 version 2004 中的标准组件的一部分，虽然还未大范围推送，我也迫不及待的从某渠道下载 iso 文件进行了第一时间的更新。
它的实际安装步骤也很简单，可以参考如下步骤就可完成：

<!-- more -->

-   [适用于 Linux 的 Windows 子系统安装指南 ](https://docs.microsoft.com/zh-cn/windows/wsl/install-win10)

## 开始安装

### 启动 WSL 和 Virtual Machine Platform

使用管理者权限启动 PowerShell，并运行以下命令

```
dism.exe /online /enable-feature /featurename: Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename: VirtualMachinePlatform /all /norestart
```

执行后重启后生效

然后添加设置，并将 WSL2 设置为默认

```
PS C: \Users\xxx> wsl -l
适用于 Linux 的 Windows 子系统分发版:
Ubuntu ( 默认 )
PS C: \Users\xxx> wsl --set-version Ubuntu 2
PS C: \Users\xxx> wsl --set-default-version 2
```

但是并没有生效，执行命令后提示跳转到一个 URL

-   [更新 WSL 2 Linux 内核](https://docs.microsoft.com/zh-cn/windows/wsl/wsl2-kernel)

以上网址会让我们下一个 msi 更新包，选择适合自己系统的下载安装即可。
完成后重新执行以上命令，发现已设置为 WSL2

```
PS C: \Users\xxx> wsl -l -v
  NAME                   STATE           VERSION
-   Ubuntu                 Stopped         2
```

## VSCode 远程开发

我通常将开发环境设置在 WSL，在 Windows 中用 VSCode 进行远程连接，体验像本地一样的开发。

打开 VSCode，点击左下角如图
![vscode-wsl](https://cdn.jsdelivr.net/gh/GeeKaven/BlogAssets@v1.0.0/img/vscode-wsl.png)

出现如下屏幕选择 `Remote-WSL: New Window。如果要在 WSL 中使用多个发行版，可以选择 using Distro..

![vscode-wsl2](https://cdn.jsdelivr.net/gh/GeeKaven/BlogAssets@v1.0.0/img/vscode-wsl2.png)

除了以上，还可以使用 Remote - Containers 模式进行开发，也就是连接一个 Docker Container，而不是连接到 WSL 或 Linux。

-   [Developing inside a Container](https://code.visualstudio.com/docs/remote/containers)

## 与 Docker Desktop 整合

我想以前在 WSL 中使用 docker 是比较复杂的，现在 Docker Desktop 提供了一种方法，仅在 Windows 中打开 `Use the WSL 2 based engine` 即可。

![wsl-docker1](https://cdn.jsdelivr.net/gh/GeeKaven/BlogAssets@v1.0.0/img/wsl-docker1.png)

然后启用集成

![wsl-docker2](https://cdn.jsdelivr.net/gh/GeeKaven/BlogAssets@v1.0.0/img/wsl-docker2.png)

官方文档说，WSL2 有更快的启动速度，和更少的资源消耗

-   [Docker Desktop WSL 2 backend](https://docs.docker.com/docker-for-windows/wsl/)

### 启动 Nginx

下面简单的启动以下 Nginx

```
$ docker run -p 80:80 nginx
```

然后查找 WSL 的 IP 地址

```
$ ifconfig -a
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.20.46.132  netmask 255.255.240.0  broadcast 172.20.47.255
        inet6 fe80::215:5dff: fe1a:932f  prefixlen 64  scopeid 0x20<link>
        ether 00:15:5d:1a:93:2f  txqueuelen 1000 ( Ethernet )
        RX packets 1068  bytes 1304121 ( 1.3 MB )
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 829  bytes 65587 ( 65.5 KB )
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

最后成功访问

![wsl-nginx](https://cdn.jsdelivr.net/gh/GeeKaven/BlogAssets@v1.0.0/img/wsl-nginx.png)

## 与 WSL 的区别

下面列出了一些 WSL1 与 WSL2 的区别

-   [比较 WSL 2 和 WSL 1](https://docs.microsoft.com/zh-cn/windows/wsl/compare-versions)

主要区别如以下 2 点：

-   网络访问
-   更快的磁盘访问与更慢的跨 OS 文件系统性能

### 网络访问

`apt-get update` 时连接超时

1.  创建文件 `/etc/wsl.conf`

2.  将下列填入文件中，用来确保 DNS 修改不会被删除

   ```
   [network]
   generateResolvConf = false
   ```

3.  在 CMD Window 中，执行 `wsl --shutdown`

4.  重启 WSL2

5.  创建文件 `/etc/resolv.conf`，如果已经存在则进行替换

6.  将下列填入文件

   ```
   nameserver 8.8.8.8 # Or use your DNS server instead of 8.8.8.8 which is a Google DNS server
   ```

7.  重复 3,4 步，WSL2 将可以正常访问网络

-   [WSL issues#4285](https://github.com/microsoft/WSL/issues/4285#issuecomment-522201021)

### 连接 Windows 代理

需要注意的点

-   Windows 代理需要允许 LAN 连接
-   防火墙需要允许代理软件连接 ( 卡了很久，最后发现 Windows 防火墙拦掉了 )
-   WSL2 是 IP 是动态变化的，上面已经将 `/etc/resolv.conf` 动态生成关闭，但是 IP 还是会变的
  因此我们需要在 WSL 中获取 IP 然后设置代理，下面是我的代理脚本，可导入至 `.zshrc` 或其他配置文件中

```bash
export hostip=$( ip route | grep default | awk '{print $3}' ) # 获取 ip
proxy ( ) {
    # 开启代理
    export ALL_PROXY="socks5://${hostip}:7891"
    export all_proxy="socks5://${hostip}:7891"
    echo "proxy ${hostip}"
}

unproxy ( ) {
    # 关闭代理
    unset ALL_PROXY
    unset all_proxy
    echo "unproxy"
}
```

之后就可以使用 `proxy` 开启代理，`unproxy` 关闭代理了

### 磁盘访问

由于跨 OS 文件系统性能下降，我们最好确保将项目存储在 Linux 文件系统中，以获得更快的文件访问速度。

## 总结

WSL 的这次更新可以说是改动非常大的了，然后在加上 VSCode 强大的远程开发能力，能在 Windows 中获得 Linux 中的开发体验，我想感觉应该是很不错的。可能 WSL2 还有很多坑没有遇见，我想对于 Web 开发应该是足够了。 ( 配合 Windows Terminal 体验更佳 )
