---
title: "通过 Docker Compose 搭建 Miniflux"
date: 2021-03-20 14:04:29
tags: ['miniflux']
---

RSS ( 简易信息聚合 ) ，是一种消息来源格式规范，用以聚合经常发布更新资料的网站，例如博客文章、新闻、音频或视频的网摘。RSS 文件 ( 或称做摘要、网络摘要、或频更新，提供到频道 ) 包含全文或是节录的文字，再加上发布者所订阅之网摘资料和授权的元数据。简单来说 RSS 能够让用户订阅个人网站个人博客，当订阅的网站有新文章是能够获得通知。在这个推荐系统主导的网络世界，自己知道自己想要什么，才是最难能可贵的。

<!-- more -->

## 部署
首先安装 `Docker` 与 `Docker Compose`，参考官网教程 [Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/) 和 [Install Docker Compose](https://docs.docker.com/compose/install/)
```bash
cd ~
mkdir miniflux && cd miniflux
```
在目录下创建 `docker-compose.yml` 文件
```yml
version: "3.3"
services:
  miniflux:
    image: miniflux/miniflux:2.0.27
    container_name: miniflux
    # 映射外部端口
    ports:
      -   "8888:8080"
    depends_on:
      -   db
    environment:
      -   DEBUG=0
      -   LOG_DATE_TIME=1
      # 设置抓取时间 30min
      -   POLLING_FREQUENCY=30
      # 清理周期 180 天
      -   CLEANUP_ARCHIVE_READ_DAYS=180
      -   DATABASE_URL=postgres://miniflux: secret@db/miniflux?sslmode=disable
      # 下面是创建用户
      -   RUN_MIGRATIONS=1
      -   CREATE_ADMIN=1
      -   ADMIN_USERNAME=username
      -   ADMIN_PASSWORD=password
      -   BASE_URL=https://rss.tawawa.moe
  db:
    image: postgres:13.2
    container_name: postgres
    environment:
      -   POSTGRES_USER=miniflux
      -   POSTGRES_PASSWORD=secret
    volumes:
      -   miniflux-db:/var/lib/postgresql/data
volumes:
  miniflux-db:
```
```fish
sudo docker-compose up -d
Creating network "miniflux_default" with the default driver
Creating postgres ... done
Creating miniflux ... done
```
最后可以以 `127.0.0.1` 访问

## Caddy 代理
安装参考 [Install Caddy Server](https://caddyserver.com/docs/install#debian-ubuntu-raspbian)
使用如上方法安装后将会自动启动和运行服务，并且会生成 `caddy.service` 服务。
运行命令 `sudo systemctl status caddy.service` 可以看到
```bash
● caddy.service - Caddy
     Loaded: loaded ( /lib/systemd/system/caddy.service; enabled; vendor preset: enabled )
     Active: active ( running ) since Sun 2021-02-20 00:15:15 CST; 14h ago
       Docs: https://caddyserver.com/docs/
   Main PID: 31355 ( caddy )
      Tasks: 7 ( limit: 1110 )
     Memory: 13.3M
     CGroup: /system.slice/caddy.service
             └─31355 /usr/bin/caddy run --environ --config /etc/caddy/Caddyfile
```
配置文件在 `/etc/caddy/Caddyfile`，在该目录下修改 `Caddyfile` 文件即可，添加代理配置：
```
rss.tawawa.moe {
    encode zstd gzip
    reverse_proxy 127.0.0.1:8888
}
```
重启后通过绑定服务器 ip 的域名即可访问 `rss.tawawa.moe`
![miniflux home](https://cdn.jsdelivr.net/gh/GeeKaven/BlogAssets@v1.0.1/img/miniflux-start.png)

## 参考
-   [https://miniflux.app/docs/installation.html#docker](https://miniflux.app/docs/installation.html#docker)
-   [https://caddyserver.com/docs/install#debian-ubuntu-raspbian](https://caddyserver.com/docs/install#debian-ubuntu-raspbian)
