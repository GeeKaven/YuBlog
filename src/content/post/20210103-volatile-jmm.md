---
title: 'JMM 角度解析 volatile 关键字作用与基础原理'
date: 2021-01-03 21:53:38
slug: 'volatile-jmm'
tags: ['Java', 'JMM']
type: Blog
---

首先看下面一段代码：
在 main 中开启一个线程，输出 thread start，当 flag 为 true 时线程死循环运行。然后暂停 3 秒，将 flag 改成 false，我们预期的此时会输出 thread end 线程结束，然后程序结束。
但是当运行程序后会发现输出 thread start 后程序就卡死了，循环没有退出，程序也没有结束。

```java
public class Test {
    boolean flag = true;

    public static void main ( String[] args ) throws InterruptedException {
        Test t = new Test ( ) ;
        new Thread ( t:: run, "t1" ) .start ( ) ;

        Thread.sleep ( 3000 ) ;

        t.flag = false;
    }

    public void run ( ) {
        System.out.println ( "thread start" ) ;
        while ( flag ) {
            // 死循环
        }
        System.out.println ( "thread end" ) ;
    }
}
```

如果想让程序正常执行需要将 boolean flag = true;，修改为 volatile boolean flag = true;，程序正常等待 3 秒后输出退出。这是为什么呢？这就涉及到 Java 内存模型了。

## Java 内存模型 ( Java Memory Model, JMM )

JMM 就是一种符合内存模型规范的，屏蔽了各种硬件和操作系统的访问差异的，保证了 Java 程序在各种平台下对内存的访问都能保证效果一致的机制及规范。
在 JMM 中规定了所有的变量都存储在主内存中，每条线程还有自己的工作内存，线程的工作内存中保存了该线程中是用到的变量的主内存副本拷贝，线程对变量的所有操作都必须在工作内存中进行，而不能直接读写主内存。不同的线程之间也无法直接访问对方工作内存中的变量，线程间变量的传递均需要自己的工作内存和主存之间进行数据同步进行。
也就是说在 cpu 多线程环境中，每个线程都有一个工作内存，首先将主内存中的数据读到工作内存中，然后在工作内存中进行修改，比如+1 操作，然后在写会主内存中。

所以以上的代码是怎么执行的呢。
首先，Test 对象的 flag 变量存在堆内存中。
启动 t1 线程后，会先将主存中的 flag 变量 copy 到自己的工作内存中，然后运行。此时我们 while 死循环中使 cpu 忙碌，不会在去同步主存中的数据了。
在 main 线程中，也是将 flag 变量先读取到自己的工作内存中，然后进行修改，修改之后发现与主内存中数据不一致，就将自己工作内存中的数据刷新回主内存。
此时出现 t1 线程中的数据与主内存不一致，而也不会重新去读，所以这时候 t1 线程结束不了。

## volatile 功能及作用

volatile 的一个作用就是保证变量在多线程中是可见的。
当一个变量被 volatile 修饰时，任何线程对它的写操作都会立即刷新到主内存中，并且会强制让缓存了该变量的线程中的数据清空，必须从主内存重新读取最新数据。
回到以上代码使用 volatile boolean flag = true;
当 main 线程修改 flag = false 时。t1 线程会重新读取主内存中的数据，刷新自己的工作内存。此刻 t1 线程中的 flag 被刷新为 false，因此循环结束，线程结束。

volatile 使用较为简单，除了可以保证变量的可见性还可以禁止指令重排。

不过使用 volatile 还是需要注意一些问题：

1.  volatile 不能解决多个线程修改同一变量带来的不一致问题，也就是不能保证原子性
2.  volatile 只能修饰变量

所以 volatile 还是不能代替 synchronized 的。synchronized 既保证可见性，也保证原子性。
不过 volatile 更为轻量，效率是 synchronized 的很多倍，以下两个常见可以代替 synchronized：

1.  运算结果并不依赖变量的当前值，或者能够确保只有单一的线程会修改变量的值。
2.  变量不需要与其他状态变量共同参与不变约束。
