window.onload = function () {

  // 获取dom元素
  /* 头部dom元素 */
  let header = document.querySelector('#header')
  let liNodes = document.querySelectorAll('#header .headMain nav > .list > li')
  let upNodes = document.querySelectorAll('#header .headMain nav > .list > li .up')
  let arrow = document.querySelector('#header .headMain .arrow')
  let firstLiNode = liNodes[0]
  let firstUpNode = firstLiNode.querySelector('.up')
  /*内容区 */
  let content = document.querySelector('#content')
  let cLiNodes = document.querySelectorAll('#content .list > li ')
  let cList = document.querySelector('#content .list  ')

  /*第一屏 */
  let home1 = document.querySelector('#content .list .home .home1')
  let home1LiNodes = document.querySelectorAll('#content .list .home .home1>li')
  let home2LiNodes = document.querySelectorAll('#content .list .home .home2>li')


  let now = 0; // 内容屏切换下表
  let timer;
  window.onresize = function () {
    contentBind()
    cList.style.top = -now * ((document.documentElement.clientHeight || document.body.clientHeight) - header.offsetHeight) + 'px'
    arrow.style.left = liNodes[now].offsetLeft + liNodes[now].offsetWidth / 2 - arrow.offsetWidth / 2 + 'px'
  }

  let oldIndex = 0;
  let autoIndex = 0;
  let timer3D;
  home3D();
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

  //contentScroll();
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
        navMove(index);
        now = index;
      })
    })
  }

  // navMove(1)
  function navMove(index) {

    let li = liNodes[index];
    let up = upNodes[index];
    upNodes.forEach((upNode) => {
      upNode.style.width = '0'
    })
    up.style.width = '100%'
    arrow.style.left = li.offsetLeft + li.offsetWidth / 2 - arrow.offsetWidth / 2 + 'px'
    cList.style.top = -index * ((document.documentElement.clientHeight || document.body.clientHeight) - header.offsetHeight) + 'px'
  }
}