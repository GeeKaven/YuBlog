---
title: "VPS开始必做的事"
date: 2021-01-12T23:51:50+08:00
tags: ['VPS']
categories:
    - 'tec'
description: '记录下拿到新 VPS 后需要做的一些操作'
image: 'https://cdn.jsdelivr.net/gh/GeeKaven/BlogAssets@v1.0.2/img/start-vps-cover.jpeg'
---
*本设置基于Ubuntu*
# ssh安全设置
## 账户设置
添加新账户
```bash
useradd tawawa -m -G sudo
```
设置密码
```bash
passwd tawawa
```
如果每次`sudo`后输入密码麻烦可以用`visudo`命令修改`sudoers`文件
```bash
# 默认nano，如果不行可以修改默认编辑器
sudo update-alternatives --config editor
visudo
```
然后在后面的`ALL`添加`NOPASSWD:`
```bash
%sudo   ALL=(ALL:ALL) NOPASSWD: ALL
```
## SSH文件配置
```bash
sudo vim /etc/ssh/sshd_config
```
修改默认端口(默认22)
```bash
#Port 22
Port 3333 
```
禁止Root用户登录
```bash
PermitRootLogin no
```
ssh公钥登录
```bash
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys  #公钥文件
```
上传本地公钥
```bash
ssh user@host 'mkdir -p .ssh && cat >> .ssh/authorized_keys' < ~/.ssh/id_rsa.pub
```
重启SSH
```bash
sudo systemctl restart sshd.service
```
本地SSH配置文件
```
Host server-alias # ssh登录设置的主机别名
HostName ip_addr # 服务器ip地址
Port port # ssh端口
User 用户名
IdentityFile ~/.ssh/id_rsa # 私钥位置
PreferredAuthentications publickey
```
常用的ssh配置项有：
* Host 别名
* HostName 主机名
* Port 端口
* User 用户名
* IdentityFile 密钥文件的路径
* IdentitiesOnly 只接受SSH key 登录
* PreferredAuthentications 强制使用Public Key验证  

退出主机可尝试用配置文件登录
```bash
ssh 用户名@别名
```
登录成功后可以取消密码登录
```bash
sudo vim /etc/ssh/sshd_config   #打开配置文件
PasswordAuthentication no     #找到PasswordAuthentication改成no
sudo systemctl restart sshd.service   #重启ssh服务
```
我们取消了 root 和密钥登录，需要保存好私钥，要不然有可能登录不了服务器

# 参考资料
> - [how-to-add-and-delete-users-on-ubuntu-18-04](https://www.digitalocean.com/community/tutorials/how-to-add-and-delete-users-on-ubuntu-18-04)
> - [SSH原理与应用](http://www.ruanyifeng.com/blog/2011/12/ssh_remote_login.html)
> - [how-to-change-visudo-editor-from-nano-to-vim](https://askubuntu.com/questions/539243/how-to-change-visudo-editor-from-nano-to-vim)