# 从Gulp切换到Webpack：新手教程

> 原文： [How to switch from Gulp to Webpack: a tutorial to get you started](https://www.valentinog.com/blog/from-gulp-to-webpack-quickstart/)
>
> 作者： **[Valentino Gagliardi](http://www.valentinog.com/)**


从Gulp切换到**Webpack**也许会有点痛苦。对于大多数开发者而言，**Webpack**只是另一个晦涩难懂的JavaScript工具。

![蜕变](http://opd59bmxu.bkt.clouddn.com/201812121447.png)

我不是太关心Webpack，直到我发现它能够和gulp做一样的事。再加上我渴望尽快学习Webpack。这就是为什么我开始考虑把我的所有项目从gulp切换到webpack。

**最新更新**：2017年11月1日

人们常争论说Gulp是一个`task runner`， 而Webpack不是。无论如何，我用Webpack做到了我原来使用Gulp做到的事。并且使用更少的代码和声明性配置。

这个切换进行的很好，接下来我将指导你做切换。我希望你喜欢它。

**免责声明**：这不是Gulp和Webpack之间的对比。Gulp和Webpack，挑一个你喜欢的使用就行。这篇文章是写给那些同样需要从gulp切换到webpack的开发者。我并不认为工具A比工具B更好。

## 目录

<!-- TOC depthFrom:2 -->

- [目录](#目录)
- [从Gulp切换到Webpack：目标](#从gulp切换到webpack目标)
- [从Gulp切换到Webpack：配置项目](#从gulp切换到webpack配置项目)
- [从Gulp切换到Webpack：通过模板生成HTML文件，并最小化标签](#从gulp切换到webpack通过模板生成html文件并最小化标签)
- [从Gulp切换到Webpack：优化图片](#从gulp切换到webpack优化图片)
- [从Gulp切换到Webpack：将SASS编译成CSS，生成压缩后版本，并给CSS添加浏览器厂商前缀](#从gulp切换到webpack将sass编译成css生成压缩后版本并给css添加浏览器厂商前缀)
- [从Gulp切换到Webpack：用babel转译JavaScript](#从gulp切换到webpack用babel转译javascript)
- [从Gulp切换到Webpack：监听文件，保存时重新编译](#从gulp切换到webpack监听文件保存时重新编译)
- [从Gulp切换到Webpack：webpack学习资源](#从gulp切换到webpackwebpack学习资源)

<!-- /TOC -->

## 从Gulp切换到Webpack：目标

通过Gulp，我一般会完成下面6步：

1. 通过一个或多个HTML文件，生成最终的HTML文件，并且生成压缩后的版本。
2. 优化图片
3. 将SASS编译成CSS，生成压缩后的版本
4. 给CSS添加浏览器厂商前缀
5. 使用Babel转译JavaScript
6. 监听文件，保存后重新编译（Webpack Dev Server， 热加载）

准备好了吗？

## 从Gulp切换到Webpack：配置项目

首先，创建一个项目文件夹

```bash
mkdir from-gulp-to-webpack
```

然后，创建静态资源文件目录

```bash
cd from-gulp-to-webpack
mkdir -p src/{js,img,_scss}
```

通过执行以下命令初始化项目：

```
npm init -y
```

我们需要安装Webpack：

```bash
npm i webpack --save-dev
```

为了使用npm脚本执行webpack，我们需要在`package.json`中添加两条脚本命令：

```json
"scripts": {
  "build": "webpack",
  "watch": "webpack --watch"
}
```

我们进行的很好！

**NOTE**：构建脚本可以以一个简单的命令构建资源。我们可以运行`watch`脚本来监控文件，让其保存时就编译一次。

## 从Gulp切换到Webpack：通过模板生成HTML文件，并最小化标签

首先， **Webpack不像Gulp**。Webpack专门为JavaScript而生。这意味着webpack不知道如何去处理其他的文件类型。

这些活都是由**loader**来完成。

你可以把Webpack的loader认为是“变形金刚”。

为了正确处理HTML文件，webpack需要两个额外的模块：**html-webpack-plugin**和**html-loader**。

把它们添加到项目中：

```
npm i html-webpack-plugin html-loader --save-dev
```

当你在项目目录中执行webpack的时候，它会自动寻找**配置文件**。在根目录创建一个`webpack.config.js`文件，并添加一些基本配置：

```js
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = {
  entry: ["./src/js/index.js"],
  output: {
    filename: "js/index.js",
    path: path.join(__dirname, "./build/")
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{ loader: "html-loader", options: { minimize: true } }]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
```

你需要知道的有关webpack配置的最重要的事：

1. **entry**：这是我们的主要JavaScript文件（入口），所有的应用程序的代码在这个文件被导入
2. **output**：output属性告诉webpack在哪里输出它所创建的bundles，以及如何命名这些文件。
3. **module and rules**： 在这里你可以配置**loader**
4. **plugins**： 在这里配置webpack用到的插件

> 要清晰的了解这些概念，建议你读到这的时候，先去webpack官网把[概念](https://doc.webpack-china.org/concepts/#-entry-)这一部分通读一遍，了解各个配置的作用

配置完后，我们可以生成第一个HTml文件了。但首先我们需要一个模板作为入口。

创建`./scr/index.html`:

```html
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Webpack</title>
</head>
<body>
    <section class="main">
        <h1>Hello Webpack!!</h1>
    </section>
</body>
</html>
```

再创建一个JavaScript文件，`./scr/js/index.js`

```js
console.log(`I've been required by Webpack`);
```

现在你可以进行第一次构建：

```bash
npm run build
```

在webpack完成后，检查`./build/`文件夹

你可以看到压缩后的HTML文件。另外，如果你在浏览器中打开该文件，你将看到预期的输出：

![201812144135](http://opd59bmxu.bkt.clouddn.com/201812144135.png)

控制台中会出现“I’ve been required by Webpack”的消息。

使用webpack，不需要在html文件中包含你的javascript。这个bundle会被`html-webpack-plugin`插件自动注入到`<script> </script>`中。

## 从Gulp切换到Webpack：优化图片

优化图像在现代网络开发中至关重要。你肯定不想在一个手机端网页中传一个250KB的图片。

你应该已经知道在Gulp中可以使用`gulp-imagemin`来优化图片。webpack的优化图片的方法和gulp并不同，为了优化图片，你必须确保有两个插件：[img-loader](https://www.npmjs.com/package/img-loader)和[url-loader](https://webpack.js.org/loaders/url-loader/)

首先，将下面的依赖安装到你的项目：

```bash
npm i img-loader url-loader file-loader --save-dev
```

**img-loader**是负责优化图像的实际加载器。但最先添加的应该是**url-loader**，它被配置为低于指定限制的任何图像将转为base64​​格式。

加载图像作为base64​​有其自身的好处：浏览器不必从外部加载图像。这是虽然很好，但它有一些限制：你不应该把大的图像转化base64格式。

![Smaller PNG images can be loaded as a Base64 URL](http://opd59bmxu.bkt.clouddn.com/201812145425.png)

还有，你可能想知道我为什么安装了**file-loader**。好吧，这是一个后手。如果图像大小高于配置的限制，webpack会直接加载图像，而不是转为base64。（tips：安装了`url-loader`，可以不用安装`file-loader`，他们的功能差不多。具体可以看[url-loader](https://doc.webpack-china.org/loaders/url-loader/#-)的介绍）

可以通过在先前的HTML模板中添加两幅图像来测试这些。你可以从互联网上下载一些PNG并保存在这里面`./src/img/`，分别为**big-image.png**和**small-image.png**：

```html
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Webpack</title>
</head>
<body>
    <section class="main">
        <h1>Hello Webpack!!</h1>
        <img src="img/big-image.png">
        <img src="img/small-image.png">
    </section>
</body>
</html>
```

然后我们可以通过添加这些`loaders`来更新webpack配置：

```js
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = {
  entry: ["./src/js/index.js"],
  output: {
    filename: "js/index.js",
    path: path.join(__dirname, "./build/")
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{ loader: "html-loader", options: { minimize: true } }]
      },
      {
        test: /\.(png|jpe?g)/i,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "./img/[name].[ext]",
              limit: 10000
            }
          },
          {
            loader: "img-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
```

再次运行`build`命令

```
npm run build
```

发生了两件事：

1. 大图片被优化
2. 小图片被转化为base64，并插入了HTML的标签中

![20181215725](http://opd59bmxu.bkt.clouddn.com/20181215725.png)

## 从Gulp切换到Webpack：将SASS编译成CSS，生成压缩后版本，并给CSS添加浏览器厂商前缀

我不知道有些开发人员是否仍在编写普通的CSS。我现在通常写的都是SASS。

![201812151041](http://opd59bmxu.bkt.clouddn.com/201812151041.png)

长话短说，一个sass文件不能被浏览器直接解析，所以你必须把它转换成普通的css。另外，你可能希望添加供应商前缀以确保（几乎）所有浏览器都能解析你的CSS。

这意味：

1. 获取sass文件并将其编译为css
2. 获取CSS和添加供应商前缀
3. 获取CSS和缩小代码

在Gulp中，我不得不采取某种魔法(`pipe()`)来让事情按顺序进行。在webpack中，只要在配置中添加`loader`就行。

但你必须使用`extracttextplugin`插件来提取的CSS文件，因为webpack不会默认这样做。开始这会有点奇怪，但我保证你会习惯的。

让我们添加下面的依赖：

```
npm i css-loader sass-loader postcss-loader node-sass extract-text-webpack-plugin --save-dev
```

另外，webpack配置需要一些更改:

```js
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");
module.exports = {
  entry: ["./src/js/index.js", "./src/_scss/main.scss"],
  output: {
    filename: "js/index.js",
    path: path.join(__dirname, "./build/")
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{ loader: "html-loader", options: { minimize: true } }]
      },
      {
        test: /\.(png|jpe?g)/i,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "./img/[name].[ext]",
              limit: 10000
            }
          },
          {
            loader: "img-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: { minimize: true }
            },
            { loader: "postcss-loader" },
            { loader: "sass-loader" }
          ]
        })
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new ExtractTextPlugin({
      filename: "css/main.css"
    })
  ]
};
```

现在在里面`./src/_scss/main.scss`创建一个sass文件:

```scss
$color-orange: #f98a09;
.main {
  background: $color-orange;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
```

在根目录中添加一个postcss配置文件。文件名为`postcss.config.js`：

```js
module.exports = {
  plugins: [require("autoprefixer")]
};
```

最后，打开`package.json`，配置浏览器列表：

```json
"browserslist": ["last 2 versions"]
```

现在，再次运行`build`命令：

```
npm run build
```

你会看到：

1. sass文件被编译成css
2. 浏览器厂商前缀被添加到CSS
3. 如预期的那样，CSS被缩小了

也不需要在html文件中包含css：它通过`html-webpack-plugin`插件自动注入到`<link> </link>`标签中。

在浏览器中打开index.html并启动控制台，你将看到css是如何起作用的：

![201812152448](http://opd59bmxu.bkt.clouddn.com/201812152448.png)

目前为止，一切顺利！

## 从Gulp切换到Webpack：用babel转译JavaScript

![201812152553](http://opd59bmxu.bkt.clouddn.com/201812152553.png)

第一次听说“转译”，我以为是个玩笑。其实不是这样。

转译就是将一些现代的JavaScript语法转换成老式浏览器能够理解的语法。

换句话说，如果你喜欢使用es6和朋友，你必须先用babel编译你的代码。

看这个例子：

```js
(() => {
  const IAmES6 = `I must be transpiled by Babel`;
  console.log(IAmES6);
})();
```

它并不能在任意地方运行。这时，Babel就起作用了。它能将上面的代码转换成每个浏览器都能理解的代码。

webpack可以用babel来转译我们的代码。但是它首先需要一些加载器：`babel-core`，`babel-loader`和`babel-preset-env`。

安装：

```
npm i babel-core babel-loader babel-preset-env --save-dev
```

更新webpack配置`webpack.config.js`，为了简洁起见，我省略了文件的其余部分。

```js
//..
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"]
          }
        }
      }
//..
```

现在，打开`./src/js/index.js`，添加一个新`import`:

```js
console.log(`I've been required by Webpack`);
import './es6code'; // hello there!!
```

创建`./src/js/es6code.js`:

```js
(() => {
  const IAmES6 = `I've been transpiled by Babel`;
  console.log(IAmES6);
})();
```

最后，再次执行`build`命令：

```
npm run build
```

查看`build/js/index.js`文件。注意转译后的代码，它现在已经能在老式浏览器运行。

```js
//
(function () {
  var IAmES6 = "I've been transpiled by Babel";
  console.log(IAmES6);
})();
//
```

## 从Gulp切换到Webpack：监听文件，保存时重新编译

我们已经有了一个监视文件并在保存时重新编译的机制。它就是`package.josn`的`watch`命令：

```js
"scripts": {
  "build": "webpack",
  "watch": "webpack --watch"
}
```

这很好，但我们可以做的更好。使用[Webpack Dev Server](https://webpack.js.org/configuration/dev-server/).

那么**Webpack Dev Server**服务器究竟做了什么？

**Webpack Dev Server**服务器只需要3行配置即可运行。一旦配置完成，运行npm脚本，webpack将在浏览器中启动你的应用程序/网站。

安装**Webpack Dev Server**：

```
npm i webpack-dev-server --save-dev
```

然后在`package.json`中通过添加以下行来配置服务器：

```js
devServer: {
  contentBase: "./build"
}
```

保存文件。

打开`package.json`，添加`start`脚本命令：

```js
"scripts": {
  "start": "webpack-dev-server --open",
  "build": "webpack",
  "watch": "webpack --watch"
}
```

保存并关闭文件。

现在运行：

```
npm start
```

**Webpack Dev Server**将在浏览器中启动你的应用程序。

另外，每次在修改后保存文件，**Webpack Dev Server**服务器都会自动刷新浏览器的窗口。

这太棒了，不是吗？

现在怎么样了？你已经把你所有的项目从gulp切换到webpack了吗？

你是否能够为你的`task`编写合适JavaScript？坚持使用gulp，你是否更喜欢声明配置而不是JavaScript？试试webpack吧，你不会后悔的。

对于我来说，写这样的webpack配置比写专门给gulp的JavaScript要好。

说到底，这只是个人喜好问题。几乎所有的JavaScript领域都是。我并不想说服你。

请注意，react，vuejs和许多其他项目使用webpack作为默认的模块打包器。Laravel也从gulp切换到了webpack。在2018年，如果你想与时俱进，忽视webpack并不是一个好的选择。

另外，你可以看一下[Brunch](http://brunch.io/)。


## 从Gulp切换到Webpack：webpack学习资源

webpack生态系统是庞大的。在一篇文章中涵盖所有内容几乎是不可能的。一旦你完成阅读，可以去看以下的资源：

[Webpack documentation](https://doc.webpack-china.org/guides/)

[Webpack Academy by Sean Larkin](https://webpack.academy/)

[Webpack for Everyone by Jeffrey Way](https://laracasts.com/series/webpack-for-everyone)

我把一些模板放在一起，以便你开始。这篇文章的Github仓库是：[from-gulp-to-webpack](https://github.com/valentinogagliardi/from-gulp-to-webpack)

这篇文章的意大利版本在这：[Come passare da Gulp a Webpack: una guida per iniziare](https://www.valentinog.com/blog/passare-da-gulp-a-webpack/)

你是否在我的代码中发现任何错误？在下面的评论中写出来！

感谢阅读！

