### gulp打包及发布静态资源流程

#### 流程包括
- 合并
- 压缩
- 加戳
- 替换模版戳
- 拷贝文件

#### 启动命令
gulp build


#### 生成结果
请看build文件夹

```
  -- static
    -- js 带戳
    -- css 带戳
  -- view
    -- html js,css戳替换过了
  -- rev-xxx.json 戳到map文件
```


#### 开发编译流程问题
开发环境编译
- js可能使用requireJs,browserify,es6(import)等各种模块技术
- css可能使用sass,less等
- js可能使用es6,ts等

此过程可以使用webpack或者gulp完成。将src文件生成到static文件。不影响发布对接。


#### 新手知识补充

1.打戳的目的是什么？
答：假设没有戳，比如你有一个/xxx/xxx/a.js,代码变动后，对外的链接还是a.js，浏览器会缓存。当处理成/xxx/xxx/a.djfksjdfkj.js的时候，就能主动让浏览器重新发请求获取最新的js。


2.打戳是否有其他方案？
答：有的，可以使用`gulp-usemin`替换`gulp-rev-all`和`gulp-rev-replace`,此库同时处理了合并和替换两个工作。如果是不需要编译的js，可使用这个方案，灵活简单。PS:有疑问可留言:)