function animate(obj,target) {
    clearInterval(obj.timer);
    var speed = obj.offsetLeft < target ? 15: -15; // 用来判断是＋5 还是－5
    obj.timer = setInterval(function () {
        var result = target-obj.offsetLeft;    //它们的差值不会超过5
        obj.style.left = obj.offsetLeft + speed +"px";
        if (Math.abs(result)<=15){   //如果它们的差值小于5 说明到位置了
            clearInterval(obj.timer);
            obj.style.left = target;    //因为有5像素的差距所以需要直接等于目标位置
        }
    },10)
}
window.onload = function () {
    // 1.获取元素
    var slider = document.getElementById("slider");
    var ul = document.getElementById("ul");
    var ulLis = ul.children;
    // 2.操作元素
    //无缝滚动 克隆第一张放在最后
    ul.appendChild(ulLis[0].cloneNode(true));
    // ul.insertBefore(ulLis[5].cloneNode(true),ulLis[0]);//克隆最後一張放到最前面
    //创建ol,li
    var ol = document.createElement("ol");
    slider.appendChild(ol);
    for (var i = 0; i < ulLis.length - 1; i++) {
        var li = document.createElement("li");
        li.innerHTML = i + 1;
        ol.appendChild(li);
    }
    ol.children[0].className = "current";
    // 3.制作动画
    var olLis = ol.children;
    for (var i = 0; i < olLis.length; i++) {
        olLis[i].index = i;
        olLis[i].onmouseover = function () {
            for (var j = 0; j < olLis.length; j++) {
                olLis[j].className = "";
            }
            this.className = "current";
            animate(ul, -this.index * 730);
        }
    }
    // 4.设置定时器
    var timer = null;
    var key = 0;  //控制播放张数的索引值
    var square = 0;   //控制播放方块数的索引值
    timer = setInterval(autoPlay, 2000);
    function autoPlay() {
        key++;
        if (key > ulLis.length - 1) {
            ul.style.left = "0";
            key = 1;
        }
        animate(ul, -key * 730);
        square++;
        if (square > olLis.length - 1) {
            square = 0;
        }
        for (var i = 0; i < olLis.length; i++) {
            olLis[i].className = "";
        }
        olLis[square].className = "current";
    }

    function autoplay1() {
        key--;
        if (key<0){
            ul.style.left = -3650+"px";//5*730
            key=5;
        }
        animate(ul,-key*730);
        square--;
        if (square<0) {
            square = olLis.length - 1;
        }
            for (var i = 0;i<olLis.length;i++){
                olLis[i].className = "";
            }
            olLis[square].className = "current";
    }
    //    当鼠标经过大盒子，清除定时器
    var timer1=null;
    slider.onmouseover = function () {
        clearInterval(timer);
        arr.style.display = "block";
    }
    slider.onmouseout = function () {
        // clearInterval(timer1);
        timer = setInterval(autoPlay, 2000);
        arr.style.display = "none";
    }
    // 每点击一次 走一个图片的长度
    function $(id){return document.getElementById(id);}
    $("left").onclick = function() {
        autoplay1();
        // clearInterval(timer);

    }
    $("right").onclick = function () {
        autoPlay();
    }
    //	缓动动画


}