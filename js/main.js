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

  let now = 0;
  let timer;
  window.onresize = function () {
    contentBind()
    cList.style.top = -now * ((document.documentElement.clientHeight || document.body.clientHeight) - header.offsetHeight) + 'px'
    arrow.style.left = liNodes[now].offsetLeft + liNodes[now].offsetWidth / 2 - arrow.offsetWidth / 2 + 'px'
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

  navMove(1)
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