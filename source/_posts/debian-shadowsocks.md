---
title: Debian VPS搭建科学上网
date: 2016-04-18 14:23:46
category: 碎碎念
tags:
---
昨天刚入手nexus 5x，为的就是Google的服务。然而在天朝墙越来越高了，索性就入个vps搭建自己的Shadowsocks算了。  
  
## 选择server软件
shadowsocks的server端有好几种，原版是`python`写的。同时还有`GO`,`C with libev`,`C++ with Qt`等。由于我的vps配置比较低，就选了一个占用比较少的`C with libev`。  

## 安装Shadowsocks-libev
第一步： 添加GPG Public key  
```
$ wget -O- http://shadowsocks.org/debian/1D27208A.gpg | sudo apt-key add -
```
第二步： 修改sources.list  
Debian 8：
```
$ echo "deb http://shadowsocks.org/debian wheezy main" >> /etc/apt/sources.list
```
Debian 7：
```
$ echo "deb http://shadowsocks.org/debian squeeze main" >> /etc/apt/sources.list
```
第三步： 安装  
```
$ apt-get update
$ apt-get install shadowsocks-libev
```
## 修改配置文件
打开配置文件
```
$ vim /etc/shadowsocks-libev/config.json
```
内容：
```
{
    "server":"0.0.0.0",  //服务器ip
    "server_port":8388,  //服务端口
    "local_port":1080,   //本地端口
    "password":"lalalala",  //密码
    "timeout":60,   //超时时间，秒
    "method":"aes-256-cfb"   //加密方法
}
```
修改完后：
```
$ /etc/init.d/shadowsocks-libev stop
$ /etc/init.d/shadowsocks-libev start
```

## 设置自启动

```
$ systemctl enable shadowsocks-libev
```

到此配置完成，可以到[这里](https://shadowsocks.com/client.html)下载客户端即可。
