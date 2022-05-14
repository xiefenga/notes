vscode 添加 `*/** @type {HTMLCanvasElement} \*/*`  即可拥有 canvas 提示

# 图形

1. 画线

   ```js
   const canvas = document.getElementById('canvas');
   const ctx = canvas.getContext('2d');
   ctx.beginPath();
   ctx.moveTo(100, 100);
   ctx.lineTo(200, 200);
   ctx.stroke();
   ```

2. 矩形

   ```js
   ctx.beginPath();
   ctx.rect(100, 100, 200, 200);
   ctx.stroke();
   // or
   ctx.beginPath();
   ctx.strokeRect(100, 100, 200, 200);
   
   // 填充矩形
   ctx.beginPath();
   ctx.fillRect(100, 100, 200, 200);
   ```

3. 圆弧

   - `arc(x, y, radius, startAngle, endAngle, acticlockwise)`   

     `endAngle` 是顺时针方向来数，开始和结束的弧度都需要传弧度（`Math.PI`），最后一个参数是否逆时针

   ```js
   ctx.beginPath();
   ctx.arc(100, 100, 50, 0, 60 * Math.PI / 180, false);
   ctx.stroke();
   ```

   - `arcTo(x1, y1, x2, y2, radius)`

     `arcTo()` 方法在画布上创建介于两个切线之间的弧/曲线。

     ![](https://oss.xiefeng.tech/images/20210906202258.png)

   ```js
   ctx.beginPath();
   ctx.moveTo(110, 100);
   ctx.arcTo(200, 100, 200, 150, 10);
   ctx.arcTo(200, 200, 100, 200, 10);
   ctx.arcTo(100, 200, 100, 100, 10);
   ctx.arcTo(100, 100, 200, 100, 10);
   ctx.stroke();
   ```

# 坐标轴的变换

`translate(x, y)`、`rotate(angle)` 、`scale(x, y)`

`save()` 、 `restore()`    用于存储坐标系的平移数据，缩放数据，旋转数据

# 背景填充

背景的填充都是从canvas的原点开始的

1. 纯色填充

   ```js
   ctx.fillStyle = "red";
   ```

2. 图片填充

   ```js
   ctx.beginPath();
   const img = new Image();
   img.src = './1.jpg';
   img.onload = function () {
       const bg = ctx.createPattern(img, 'no-repeat');
       ctx.fillStyle = bg;
       ctx.translate(100, 100);
       ctx.fillRect(0, 0, 200, 200);
   }
   ```

3. 线性渐变

   ```js
   ctx.beginPath();
   var bg = ctx.createLinearGradient(0, 0, 200, 0);
   ctx.fillStyle = bg;
   ctx.translate(100, 100);
   bg.addColorStop(0, "white");
   bg.addColorStop(0.5, "black");
   bg.addColorStop(1, "white");
   ctx.fillRect(0, 0, 200, 200);
   ```

4. 辐射渐变

   ```js
   ctx.beginPath();
   var bg = ctx.createRadialGradient(100, 100, 0, 100, 100, 100);
   ctx.fillStyle = bg;
   ctx.translate(100, 100);
   bg.addColorStop(0, "white");
   bg.addColorStop(0.5, "black");
   bg.addColorStop(1, "white");
   ctx.fillRect(0, 0, 200, 200);
   ```

# 其他

1. 阴影

   ```js
   ctx.shadowColor = "red";ctx.shadowBlur = 10;ctx.shadowOffsetX = 0;ctx.shadowOffsetY = 0;ctx.strokeRect(100, 100, 100, 100);
   ```

2. 文字

   `ctx.strokeText(text, x, y)`    空心文字

   `ctx.font = "20px consolas"`

   `ctx.fillText(text, x, y)`   实心文字

   `ctx.textAlign`、`ctx.textBaseline` 设置文字对齐方式

   ![](https://oss.xiefeng.tech/images/20210906202258.png)

3. 线段样式

   ```js
   ctx.lineCap = "butt | round | square";ctx.lineJoin = "bevel | miter | round";ctx.miterLimit = 5;
   ```

4. 属性合成

   `ctx.globalCompositeOperation`  属性设置或返回如何将一个源（新的）图像绘制到目标（已有）的图像上，该属性需要设置在两个图形绘制的中间

   <img src="https://oss.xiefeng.tech/images/20210906202258.png" style="zoom: 33%;" />

   ```js
   ctx.beginPath();ctx.fillStyle = "#eee";ctx.fillRect(100, 100, 100, 100);ctx.globalCompositeOperation = "source-out";  // 位置很重要ctx.beginPath();ctx.fillStyle = "#aaa";ctx.fillRect(150, 150, 100, 100);
   ```

# 图像处理

1. 设置图片

   `drawImage()` 方法在画布上绘制图像、画布或视频，也能够绘制图像的某些部分，以及/或者增加或减少图像的尺寸。

   1. 定位

   ```js
   ctx.drawImage(img,x,y);
   ```

   1. 在画布上定位图像，并规定图像的宽度和高度

   ```js
   ctx.drawImage(img,x,y,width,height);
   ```

   1. 剪切图像，并在画布上定位被剪切的部分

   参数：开始剪切的 x y坐标，被剪切图像的宽高，在画布上放置图像的坐标，要使用的图像的宽高（放大/缩小）

   ```js
   ctx.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
   ```

2. 将 canvas 导出为图片

   `canvas.toDataURL()` 可以将该 canvas 的整个内容导出为一个base64的图片

3. 得到图片的信息

   `ctx.getImageData(x, y, width, height)` 可以得到指定区域的像素点信息

   `ctx.putImageData(imgData,x,y,dirtyX,dirtyY,dirtyWidth,dirtyHeight)` 将图像数据（从指定的 `ImageData` 对象）放回画布上

   参数：`ImageData` 对象左上角的坐标，在画布上放置图像的位置（可选），在画布上绘制图像所使用的宽高（可选）





 