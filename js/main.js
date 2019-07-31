window.onload = function () {

  // 获取dom元素
  let wrap = document.querySelector('#wrap')
  /* 头部dom元素 */

  let header = document.querySelector('#header')
  let liNodes = document.querySelectorAll('#header .headMain nav > .list > li')
  let upNodes = document.querySelectorAll('#header .headMain nav > .list > li .up')
  let arrow = document.querySelector('#header .headMain .arrow')
  let firstLiNode = liNodes[0]
  let firstUpNode = firstLiNode.querySelector('.up')
  /*内容区 */
  let content = document.querySelector('#content')
  let cLiNodes = document.querySelectorAll('#content >.list > li ')
  let cList = document.querySelector('#content >.list  ')

  /*第一屏 */
  let home1 = document.querySelector('#content >.list .home .home1')
  let home1LiNodes = document.querySelectorAll('#content >.list .home .home1>li')
  let home2LiNodes = document.querySelectorAll('#content >.list .home .home2>li')

  /*第四屏 */
  let about3UlNodes = document.querySelectorAll('#content >.list .about .about3 > .item > ul')

  /*第五屏 */
  let team3 = document.querySelector('#content >.list .team .team3 ');
  let team3UlNode = document.querySelector('#content >.list .team .team3>.list');

  /*获取页面导航圆点 */
  let navDots = document.querySelectorAll('#content>.dots>li');

  /* 音频 */
  let music = document.querySelector("#header .headMain .music")
  let audio = document.getElementById("myaudio")

  /* 开机动画 */
  let mask = document.querySelector("#mask")
  let items = document.querySelectorAll("#mask div")
  let line = document.querySelector("#mask .line")

  let now = 0; // 内容屏切换下表
  let preIndex = 0; // 上一页
  let timer;
  window.onresize = function () {
    contentBind()
    cList.style.top = -now * ((document.documentElement.clientHeight || document.body.clientHeight) - header.offsetHeight) + 'px'
    arrow.style.left = liNodes[now].offsetLeft + liNodes[now].offsetWidth / 2 - arrow.offsetWidth / 2 + 'px'
  }

  // 出入场动画
  let arrAni = [
    {
      inAn() {
        let home1 = document.querySelector('#content >.list .home .home1')
        let home2 = document.querySelector('#content >.list .home .home2')
        home1.style.transform = "translateY(0px)"
        home2.style.transform = "translateY(0px)"

        home1.style.opacity = 1
        home2.style.opacity = 1
      },
      outAn() {
        let home1 = document.querySelector('#content >.list .home .home1')
        let home2 = document.querySelector('#content >.list .home .home2')

        home1.style.transform = "translateY(-400px)"
        home2.style.transform = "translateY(200px)"

        home1.style.opacity = 0
        home2.style.opacity = 0
      }
    },
    {
      inAn() {
        let plane1 = document.querySelector('#content .course .plane1')
        let plane2 = document.querySelector('#content .course .plane2')
        let plane3 = document.querySelector('#content .course .plane3')

        plane1.style.transform = "translate(0px,0px)"
        plane2.style.transform = "translate(0px,0px)"
        plane3.style.transform = "translate(0px,0px)"
      },
      outAn() {
        let plane1 = document.querySelector('#content .course .plane1')
        let plane2 = document.querySelector('#content .course .plane2')
        let plane3 = document.querySelector('#content .course .plane3')

        plane1.style.transform = "translate(-200px,-200px)"
        plane2.style.transform = "translate(-200px,200px)"
        plane3.style.transform = "translate(200px,-200px)"
      }
    },
    {
      inAn() {
        let pencel1 = document.querySelector('#content .works .pencel1')
        let pencel2 = document.querySelector('#content .works .pencel2')
        let pencel3 = document.querySelector('#content .works .pencel3')

        pencel1.style.transform = "translateY(0px)"
        pencel2.style.transform = "translateY(0px)"
        pencel3.style.transform = "translateY(0px)"
      },
      outAn() {
        let pencel1 = document.querySelector('#content .works .pencel1')
        let pencel2 = document.querySelector('#content .works .pencel2')
        let pencel3 = document.querySelector('#content .works .pencel3')

        pencel1.style.transform = "translateY(-100px)"
        pencel2.style.transform = "translateY(100px)"
        pencel3.style.transform = "translateY(100px)"
      }
    },
    {
      inAn() {
        let item1 = document.querySelector("#content > .list .about .about3 > .item:nth-child(1) ")
        let item2 = document.querySelector("#content > .list .about .about3 > .item:nth-child(2) ")
        item1.style.transform = "rotate(0deg)"
        item2.style.transform = "rotate(0deg)"
      },
      outAn() {
        let item1 = document.querySelector("#content > .list .about .about3 > .item:nth-child(1) ")
        let item2 = document.querySelector("#content > .list .about .about3 > .item:nth-child(2) ")
        item1.style.transform = "rotate(45deg)"
        item2.style.transform = "rotate(-45deg)"
      }
    },
    {
      inAn() {
        let team1 = document.querySelector("#content > .list .team .team1 ")
        let team2 = document.querySelector("#content > .list .team .team2 ")
        team1.style.transform = "translateX(0px)"
        team2.style.transform = "translateX(0px)"
      },
      outAn() {
        let team1 = document.querySelector("#content > .list .team .team1 ")
        let team2 = document.querySelector("#content > .list .team .team2 ")
        team1.style.transform = "translateX(-200px)"
        team2.style.transform = "translateX(200px)"
      }
    }
  ]
  arrAni.forEach(arr => {
    arr.outAn();
  })

  setTimeout(() => {
    arrAni[0].inAn();
  }, 2000)

  // 开机动画
  loadAni();
  function loadAni() {
    let flag = 0;
    let arr = ['bg1.jpg', 'bg2.jpg', 'bg3.jpg', 'bg4.jpg', 'bg5.jpg', 'about1.jpg', 'about2.jpg', 'about3.jpg', 'about4.jpg', 'worksimg1.jpg', 'worksimg2.jpg', 'worksimg3.jpg', 'worksimg4.jpg', 'team.png', 'greenLine.png'];
    arr.forEach((a) => {
      var img = new Image();
      img.src = "../img/" + a;
      img.onload = function () {
        flag++;
        line.style.width = flag / arr.length * 100 + "%";

      }
    })
    line.addEventListener('transitionend', function () {
      items.forEach(item => item.style.height = 0);
      line.remove();
    })
    items[0].addEventListener('transitionend', function () {
      mask.remove();
      home3D();
      audioPlay();
    })
  }

  // 音频播放

  function audioPlay() {


    player();

    music.addEventListener('click', function () {
      // wrap.removeEventListener('mouseenter', fn)
      if (audio.paused) {
        audio.play()
        audio.muted = false;
      } else {
        audio.muted = true;
        audio.pause();
      }
    })

    function player() {
      var t2 = 2222500; //音频的长度，确保能够完整的播放给用户
      var play = false;
      function run() {
        if (play) {
          return false;
        }
        audio.currentTime = 0; //设置播放的音频的起始时间
        audio.volume = 0.5; //设置音频的声音大小
        audio.muted = false; //关闭静音状态
        play = true;
        setTimeout(function () {
          play = false;
          audio.muted = true; //播放完毕，开启静音状态
        }, t2);
      }
      setInterval(function () {
        run(); //假装在轮询服务器，或者从websocket拉取数据
      }, 1);
    }

  }

  // 点击导航圆点，切换导航
  changeDots();
  function changeDots() {


    navDots.forEach((dot, index) => {
      dot.addEventListener('click', (ev) => {
        ev = ev || event;
        preIndex = now;
        navMove(index)
        now = index;


      })
    })
  }

  // 生成team图片li
  team3Li();
  function team3Li() {
    let w = team3UlNode.offsetWidth;
    for (let i = 0; i < 8; i++) {
      let li = document.createElement('li');
      li.style.width = w / 8 + "px";
      li.style.backgroundPosition = -i * (w / 8) + "px 0px"
      team3UlNode.appendChild(li)
    }
  }

  // team 气泡效果
  bubbleFun();
  function bubbleFun() {
    let oc = null;
    let timer1, timer2
    let teamLiNodes = document.querySelectorAll('#content >.list .team .team3 > .list> li');
    teamLiNodes.forEach((liNode, index) => {
      liNode.onmouseenter = function () {
        teamLiNodes.forEach((li, index) => {
          li.style.opacity = 0.2;
        })
        this.style.opacity = 1
        createCanvas(liNode);
      }
    })
    team3.onmouseleave = function () {
      teamLiNodes.forEach((li, index) => {
        li.style.opacity = 1;
      })
      removeCanvas();
    }
    function removeCanvas() {
      if (oc) {
        oc.remove()
        oc = null;
        clearInterval(timer1)
        clearInterval(timer2)
      }
    }
    // canvas动画
    function createCanvas(liNode) {
      if (!oc) {
        oc = document.createElement("canvas");
        oc.width = teamLiNodes[0].offsetWidth;
        oc.height = teamLiNodes[0].offsetHeight * 2 / 3;
        createBubble(oc);
        team3.appendChild(oc)
      }
      oc.style.left = liNode.offsetLeft + 'px';
      oc.style.top = liNode.offsetTop + 'px';
    }

    // 生成气泡
    function createBubble(oc) {
      let bubbles = []
      let ctx = oc.getContext('2d')
      // 定时绘制气泡曲线 运动
      timer1 = setInterval(() => {
        ctx.clearRect(0, 0, oc.width, oc.height);
        bubbles.forEach((b, i) => {
          b.deg += 5;
          b.x = b.startX + Math.sin(b.deg * Math.PI / 180) * b.step * 2
          b.y = b.startY - b.deg * Math.PI / 180 * b.step
          if (b.y <= 100) {
            bubbles.splice(i, 1)
          }

        });
        bubbles.forEach((b) => {
          let rgba = "rgba(" + b.red + "," + b.green + "," + b.blue + "," + b.alp + ")"
          ctx.save()
          ctx.beginPath()
          ctx.fillStyle = rgba;
          ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI, true)
          ctx.fill()
          ctx.restore();
        })

      }, 1000 / 60)

      // 定时添加气泡元素
      timer2 = setInterval(() => {
        let red = Math.round(Math.random() * 255)
        let green = Math.round(Math.random() * 255)
        let blue = Math.round(Math.random() * 255)
        let alp = 1
        let r = Math.random() * 10 + 2
        let x = oc.width * Math.random();
        let y = oc.height - r;

        //曲线运动
        let deg = 0
        let step = Math.random() * 20 + 10
        let startX = x;
        let startY = y;
        let bubble = {
          red,
          green,
          blue,
          alp,
          r,
          x,
          y,
          deg,
          step, startX, startY
        }
        bubbles.push(bubble)
      }, 50)
    }
  }


  // about picture炸裂效果
  picBound();
  function picBound() {
    let w = about3UlNodes[0].offsetWidth;
    let h = about3UlNodes[0].offsetHeight;

    about3UlNodes.forEach((ul, index) => {
      createLi(ul, index)
      ul.addEventListener('mouseenter', (ev) => {
        ev = ev || event;
        changePosEnter(ul)
      })
      ul.addEventListener('mouseleave', (ev) => {
        ev = ev || event;
        changePosLeave(ul)
      })
    })
    function createLi(ul, index) {
      let imgSrc = ul.dataset.src;
      for (let i = 0; i < 4; i++) {
        let li = document.createElement('li')
        li.style.width = w / 2 + 'px'
        li.style.height = h / 2 + 'px'
        let img = document.createElement('img')
        img.src = imgSrc;
        li.appendChild(img)
        liPosition(img, i)
        ul.appendChild(li)
      }
    }
    function liPosition(img, i) {
      let nw = i % 2;
      let nh = parseInt(i / 2);
      img.style.left = -nw * (w / 2) + "px";
      img.style.top = -nh * (h / 2) + "px";


    }

    function changePosEnter(ul) {
      let imgNodes = ul.querySelectorAll('li>img');
      imgNodes[0].style.top = h / 2 + 'px';
      imgNodes[1].style.left = -w + 'px';
      imgNodes[2].style.left = w / 2 + 'px';
      imgNodes[3].style.top = -h + 'px';

    }
    function changePosLeave(ul) {
      let imgNodes = ul.querySelectorAll('li>img');
      imgNodes[0].style.top = 0 + 'px';
      imgNodes[1].style.left = -w / 2 + 'px';
      imgNodes[2].style.left = 0 + 'px';
      imgNodes[3].style.top = -h / 2 + 'px';
    }
  }
  // home3D动画
  let oldIndex = 0;
  let autoIndex = 0;
  let timer3D;

  function home3D() {
    home2LiNodes.forEach((h, index) => {
      h.addEventListener('click', () => {
        clearInterval(timer3D)
        changeDots(index);
        changeContent(index);
        oldIndex = index;
        autoIndex = index;
        autoMove();
      })
    })

    function changeDots(index) {
      home2LiNodes.forEach(h => {
        h.classList.remove('active')
      })
      home2LiNodes[index].classList.add('active')
    }

    function changeContent(index) {

      // 从左往右 leftHide rightShow
      if (index > oldIndex) {

        changeContentRightShow(index)
      }

      // 从右往左 leftShow rightHide
      if (index < oldIndex) {
        changeContentLeftShow(index)

      }

    }

    function changeContentRightShow(index) {
      home1LiNodes[index].classList.remove('leftHide')
      home1LiNodes[index].classList.remove('rightHide')
      home1LiNodes[index].classList.remove('leftShow')
      home1LiNodes[index].classList.add('rightShow')

      home1LiNodes[oldIndex].classList.remove('rightShow')
      home1LiNodes[oldIndex].classList.remove('leftShow')
      home1LiNodes[oldIndex].classList.remove('leftHide')
      home1LiNodes[oldIndex].classList.add('leftHide')
    }

    function changeContentLeftShow(index) {
      home1LiNodes[index].classList.remove('rightHide')
      home1LiNodes[index].classList.remove('leftHide')
      home1LiNodes[index].classList.remove('rightShow')
      home1LiNodes[index].classList.add('leftShow')

      home1LiNodes[oldIndex].classList.remove('leftShow')
      home1LiNodes[oldIndex].classList.remove('leftHide')
      home1LiNodes[oldIndex].classList.remove('rightShow')
      home1LiNodes[oldIndex].classList.add('rightHide')
    }

    /*自动轮播 */
    autoMove();
    function autoMove() {
      timer3D = setInterval(() => {
        autoIndex++;
        if (autoIndex == home1LiNodes.length) {
          autoIndex = 0
        }
        changeDots(autoIndex);
        changeContentRightShow(autoIndex)
        oldIndex = autoIndex
      }, 2000)
    }

    home1.onmouseenter = function () {
      clearInterval(timer3D)
    }
    home1.onmouseleave = function () {
      autoMove()
    }
  }

  contentScroll();
  function contentScroll() {

    if (content.addEventListener) {
      content.addEventListener('DOMMouseScroll', function (ev) {
        ev = ev || event;
        clearTimeout(timer);
        timer = setTimeout(() => {
          fn(ev)
        }, 200)
      })

    }
    content.onmousewheel = function (ev) {
      ev = ev || event;
      clearTimeout(timer);
      timer = setTimeout(() =>
        fn(ev)
        , 200)
    }

    function fn(ev) {
      var dir = "";
      if (ev.wheelDelta) {
        dir = ev.wheelDelta > 0 ? 'up' : 'down'
      } else if (ev.detail) {
        dir = ev.detail < 0 ? 'up' : 'down'
      }
      preIndex = now;
      switch (dir) {
        case 'up':
          if (now > 0) {
            now--
            navMove(now)
          }
          break;
        case 'down':
          if (now < liNodes.length - 1) {
            now++
            navMove(now)
          }
          break;
      }

      if (ev.preventDefault) {
        ev.preventDefault()
      }
      return false;
    }
  }

  // 初始化内容区
  contentBind();
  function contentBind() {
    content.style.height = (document.documentElement.clientHeight || document.body.clientHeight) - header.offsetHeight + 'px'
    cLiNodes.forEach((li) => {
      li.style.height = (document.documentElement.clientHeight || document.body.clientHeight) - header.offsetHeight + 'px'
    })
  }

  // 初始化头部
  headBind();
  function headBind() {
    arrow.style.left = firstLiNode.offsetLeft + firstLiNode.offsetWidth / 2 - arrow.offsetWidth / 2 + 'px'
    firstUpNode.style.width = '100%'

    liNodes.forEach((liNode, index) => {
      liNode.addEventListener('click', function () {
        preIndex = now;
        navMove(index);
        now = index;
      })
    })
  }

  function navMove(index) {

    let li = liNodes[index];
    let up = upNodes[index];
    upNodes.forEach((upNode) => {
      upNode.style.width = '0'
    })
    up.style.width = '100%'
    arrow.style.left = li.offsetLeft + li.offsetWidth / 2 - arrow.offsetWidth / 2 + 'px'
    cList.style.top = -index * ((document.documentElement.clientHeight || document.body.clientHeight) - header.offsetHeight) + 'px'
    navDots.forEach((node) => {
      node.classList.remove('active')
    });
    navDots[index].classList.add('active')

    // 出入场
    if (arrAni[index] && typeof arrAni[index]["inAn"] === 'function') {
      arrAni[index].inAn();
    }
    if (arrAni[preIndex] && typeof arrAni[preIndex]["outAn"] === 'function') {
      arrAni[preIndex].outAn();
    }


  }
}