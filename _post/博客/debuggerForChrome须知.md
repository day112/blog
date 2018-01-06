## table of Contents

- [No matter which mode you choose, you have to start your own server](#no-matter-which-mode-you-choose-you-have-to-start-your-own-server)
- [With `"request": "attach"`, you must launch Chrome with remote debugging enabled](#with-request-attach-you-must-launch-chrome-with-remote-debugging-enabled)
- [Remote debugging port is not a server port](#remote-debugging-port-is-not-a-server-port)
- [Make sure remote debugging port is not occupied](#make-sure-remote-debugging-port-is-not-occupied)
- [Before starting the debugger, open your website in Chrome](#before-starting-the-debugger-open-your-website-in-chrome)

## 目录

- [无论你使用哪种模式，你都必须启动你自己的服务器](#无论你使用哪种模式你都必须启动你自己的服务器)
- [`Attach`模式下，必须以包含调试端口的方式启动Chrome](#attach模式下必须以包含调试端口的方式启动chrome)
- [调试端口不是服务器端口](#调试端口不是服务器端口)
- [确保调试端口没有没占用](#确保调试端口没有没占用)
- [启动调试前，打开你的站点](#启动调试前打开你的站点)



## No matter which mode you choose, you have to start your own server

`Debugger for Chrome` does not start a server by itself, it just attached to your startup server.(Attach here does not mean the `attach` mode)

## With `"request": "attach"`, you must launch Chrome with remote debugging enabled

[Here's](https://github.com/Microsoft/vscode-chrome-debug#attach) how to do that。

After done, You need to verify that the port is working properly：

1. Close all your Chrome

2. launch Chrome with remote debugging enabled

3. If you are following the official steps，open the website [http://localhost:9222](http://localhost:9222) in Chrome（If you use other ports，please visit by this way `http://localhost:<port>`）。If you can open a page similar to the following，indicates that the remote debugging port is operating normally。Otherwise, the remote debugging port may be occupied。

![all](http://opd59bmxu.bkt.clouddn.com/201816121754.png)

This page contains information about your enabled plug-ins and the currently opened website。If you can open this page normally in Chrome，you can open the page [http://localhost:9222/json](http://localhost:9222/json):

![201816133038](http://opd59bmxu.bkt.clouddn.com/201816133038.png)

## Remote debugging port is not a server port

This is a place that can easily be confused.

![201816124252](http://opd59bmxu.bkt.clouddn.com/201816124252.png)

## Make sure remote debugging port is not occupied

The server I used for debugging was `WAMP`. In the beginning, I mistakenly listened to the remote debugging port, causing the debugger to start failing. There is a characteristic of this situation：turn off all Chrome first, and then start the debugger, **Chrome can be launched normally, but the debugger failed to start**。And will report the following error：

![201816135821](http://opd59bmxu.bkt.clouddn.com/201816135821.png)

**This is a very easy to overlook**。Because you visit this website [http://localhost:9222](http://localhost:9222) at this moment，it is able to access normally。

![2018161449](http://opd59bmxu.bkt.clouddn.com/2018161449.png)


## Before starting the debugger, open your website in Chrome 

I guess that when you start the debugger，`Debugger for Chrome` will visit the url [http://localhost:9222/json](http://localhost:9222/json), and see if it contains your website. If you launch Chrome without opening your website, then start the debugger, the debugger will fail to start；If you did not launch Chrome，`Debugger for Chrome` will launch Chrome, and start the debugger。

**The benefits of doing that**：

- Debugging program started quickly。


### NOTE：

- If you close all your Chrome, starting the debugger in `attach` mode will cause the following error:
![201816142445](http://opd59bmxu.bkt.clouddn.com/201816142445.png)

- If you launch Chrome, but did not open your website, start the debugger in `attach` mode will cause the following error
![201816142122](http://opd59bmxu.bkt.clouddn.com/201816142122.png)

- Both URLs ([http://localhost:3000](http://localhost:3000) and [http://localhost:3000/index.html](http://localhost:3000/index.html)) are normally accessible in the browser, but only the previous one can be used in `launch.json`
![20181616656](http://opd59bmxu.bkt.clouddn.com/20181616656.png)


----------


## 无论你使用哪种模式，你都必须启动你自己的服务器

`Debugger for Chrome`并不会启动一个服务器，他只是依附在你启动的服务器中。

## `Attach`模式下，必须以包含调试端口的方式启动Chrome

配置调试端口的方式在这 [attach](https://github.com/Microsoft/vscode-chrome-debug#attach)。

配置完后，你需要验证端口是否正常：

1. 关闭所有的Chrome进程

2. 以调试端口的方式启动Chrome

3. 如果你是跟着官方的步骤，那么打开这个页面[http://localhost:9222](http://localhost:9222)（如果用的其他端口，请这样访问`http://localhost:<port>`）。如果你能打开类似下面的页面，说明你的调试端口是正常的。否则的话，调试端口可能被占用了。

![all](http://opd59bmxu.bkt.clouddn.com/201816121754.png)

这个页面包含了你启用的插件和当前打开的网页的信息。如果你能正常打开这个页面，那你就能打开[http://localhost:9222/json](http://localhost:9222/json):

![201816133038](http://opd59bmxu.bkt.clouddn.com/201816133038.png)


## 调试端口不是服务器端口

这是很容易混淆的一点。

![201816124252](http://opd59bmxu.bkt.clouddn.com/201816124252.png)

## 确保调试端口没有没占用

我调试时使用的服务器是`WAMP`，最开始的时候，我错误的监听了调试端口，导致调试程序启动失败。这种情况会有一个特征：先关闭所有Chrome，再启动调试程序，**Chrome能正常启动，但是调试程序启动失败**。并会报以下的错误：

![201816135821](http://opd59bmxu.bkt.clouddn.com/201816135821.png)

**这是很容易忽视的一点**。因为你这时去访问[http://localhost:9222](http://localhost:9222)，它是能够正常访问的。

![2018161449](http://opd59bmxu.bkt.clouddn.com/2018161449.png)


## 启动调试前，打开你的站点

这是我猜的：当你启动调试时，`Debugger for Chrome`会去[http://localhost:9222/json](http://localhost:9222/json)搜寻你的站点信息，看你是否打开了你的页面。如果你启动了Chrome，而没有打开页面，调试程序将会启动失败；如果你没有启动Chrome，`Debugger for Chrome`会帮你打开Chrome，并启动调试程序。

**这么做的好处**：

- 调试程序启动会很快。


### 注意：

- 在`attach`模式下，如果你关闭了所有的Chrome，它会导致这样的错误
![201816142445](http://opd59bmxu.bkt.clouddn.com/201816142445.png)

- 在`attach`模式下，如果你启动了Chrome，而没有打开页面，它会导致这样的错误：
![201816142122](http://opd59bmxu.bkt.clouddn.com/201816142122.png)

- 虽然[http://localhost:3000](http://localhost:3000)和[http://localhost:3000/index.html](http://localhost:3000/index.html)在浏览器中都能正常访问，但在**launch.json**中，你只能使用前一个url
![20181616656](http://opd59bmxu.bkt.clouddn.com/20181616656.png)





  