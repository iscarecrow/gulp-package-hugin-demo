### gulp打包及发布静态资源流程

#### 流程包括
- 压缩
- 加戳
- 替换模版戳
- 拷贝文件

#### 启动命令
gulp build


#### 开发编译流程问题
开发环境编译
- js可能使用requireJs,browserify,es6(import)等各种模块技术
- css可能使用sass,less等
- js可能使用es6,ts等

此过程可以使用webpack或者gulp完成。将src文件生成到static文件。不影响发布对接。