const config = {
  title: "zsc导航",
  subtitle: "unofficial",
  logo_icon: "location arrow", //https://semantic-ui.com/elements/icon.html
  search:true,
  search_engine:[ //choose search engine which you use
    {
      name:"百 度",
      template:"https://www.baidu.com/s?wd=$s"
    },
    {
      name:"谷 歌",
      template:"https://www.google.com/search?q=$s"
    },
    {
      name:"必 应",
      template:"https://www.bing.com/search?q=$s"
    },
    {
      name:"搜 狗",
      template:"https://www.sogou.com/web?query=$s"
    }
  ],
  lists: [
    {
      name:"主功能",
      icon:"home",
      list:[
        {
          url:"http://www.zsc.edu.cn/",
          name:"学校官网",
          desc:"这里什么都有"
        },
        {
          url:"http://jwgln.zsc.edu.cn/jsxsd/",
          name:"教务系统",
          desc:"选课、查分数之类的"
        },
        {
          url:"http://210.38.224.229/suzhi/index.jsp",
          name:"素拓系统",
          desc:"素拓分管理"
        },
        {
          url:"https://zsc.fanya.chaoxing.com/portal",
          name:"课程平台",
          desc:"学校的学习通课程汇总"
        },
      ]
    },
    {
      name:"小功能",
      icon:"graduation cap",
      list:[
        {
          url:"http://210.38.224.228:8889/dormitory/homepage.jsp",
          name:"宿舍管理",
          desc:"暂无简介"
        },
      ]
    },
    {
      name:"其他",
      icon:"flask",
      list:[
        {
          url:"http://srv.zsc.edu.cn/f/jkUnList?uaid=6bea5e596cf848498191ac0627b173f7&uid=24f69af1707a4bf1a3600a711f4cf8bb&type=s",
          name:"健康打卡",
          desc:"计算机学院没打卡信息"
        },
        {
          url:"mailto:contact@lechnolocy.cn",
          name:"联系站长",
          desc:"点击即可发送邮件"
        },
      ]
    }
  ]
}
const el = (tag, attrs, content) => `<${tag} ${attrs.join(" ")}>${content}</${tag}>`;

async function handleRequest(request) {
  const init = {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  }
  return new Response(renderHTML(renderIndex(),config.selling_ads? renderSeller() :null), init);
}
addEventListener('fetch', event => {
  return event.respondWith(handleRequest(event.request))
})

function getFavicon(url){
  if(url.match(/https{0,1}:\/\//)){
    return "https://www.google.cn/s2/favicons?sz=64&domain_url=" + url;
  }else{
    return "https://www.google.cn/s2/favicons?sz=64&domain_url=http://" + url;
  } 
}

function renderIndex(){
  const footer = el('footer',[],el('div',['class="footer"'], el('a',['class="ui label"','href="https://github.com/LRWF/navigation_zsc-unofficial"','target="_blank"'],el('i',['class="github icon"'],"") + 'Modify by LRWF')));
  return renderHeader() + renderMain() + footer;
}

function renderHeader(){
  const item = (template,name) => el('a',['class="item"',`data-url="${template}"`],name);

  var title = el('h1',['class="ui inverted header"'],el('i',[`class="${config.logo_icon} icon"`],"") + el('div',['class="content"'],config.title + el('div',['class="sub header"'],config.subtitle)));
  var menu = el('div',['id="sengine"','class="ui bottom attached tabular inverted secondary menu"'],el('div',['class="header item"'],'&nbsp;') + config.search_engine.map((link,key) =>{
    if(key == 0){
      return el('a',['class="active item"',`data-url="${link.template}"`],link.name);
    }else{
      return item(link.template,link.name);
    }
  }).join(""))
  var input = el('div',['class="ui left corner labeled right icon fluid large input"'],el('div',['class="ui left corner label"'],el('img',['id="search-fav"','class="left floated avatar ui image"','src="https://www.baidu.com/favicon.ico"'],"")) + el('input',['id="searchinput"','type="search"','placeholder="搜索你想要知道的……"','autocomplete="off"'],"") + el('i',['class="inverted circular search link icon"'],""));
  return el('header',[],el('div',['id="head"','class="ui inverted vertical masthead center aligned segment"'],(config.hitokoto ? el('div',['id="nav"','class="ui container"'],nav) : "") + el('div',['id="title"','class="ui text container"'],title + (config.search ? input + menu :"") + `${config.selling_ads ? '<div><a id="menubtn" class="red ui icon inverted button"><i class="heart icon"></i> 喜欢此域名 </a></div>' : ''}`)))
}

function renderMain() {
  var main = config.lists.map((item) => {
    const card = (url,name,desc)=> el('a',['class="card"',`href=${url}`,'target="_blank"'],el('div',['class="content"'],el('img',['class="left floated avatar ui image"',`src=${getFavicon(url)}`],"") + el('div',['class="header"'],name) + el('div',['class="meta"'],desc)));
    const divider = el('h4',['class="ui horizontal divider header"'],el('i',[`class="${item.icon} icon"`],"")+item.name);

    var content = el('div',['class="ui four stackable cards"'],item.list.map((link) =>{
      return card(link.url,link.name,link.desc);
    }).join(""));

    return el('div',['class="ui basic segment"'],divider + content);
  }).join("");
  
  return el('main',[],el('div',['class="ui container"'],main));
}


function renderHTML(index) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>${config.title} - ${config.subtitle}</title>
      <link href="https://cdn.jsdelivr.net/npm/semantic-ui-css@2.4.1/semantic.min.css" rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/gh/LRWF/navigation_zsc-unofficial@1.0.0/style.css" rel="stylesheet">
      <script src="https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/semantic-ui-css@2.4.1/semantic.min.js"></script>
  </head>
  <body>
    ${index}
    <script>
      $('#sengine a').on('click', function (e) {
        $('#sengine a.active').toggleClass('active');
        $(e.target).toggleClass('active');
        $('#search-fav').attr('src',$(e.target).data('url').match(`+/https{0,1}:\/\/\S+\//+`)[0] + '/favicon.ico') ;
      });
      $('.search').on('click', function (e) {
          var url = $('#sengine a.active').data('url');
          url = url.replace(`+/\$s/+`,$('#searchinput').val());
          window.open(url);
      });
      /* 鼠标聚焦时，回车事件 */
      $("#searchinput").bind("keypress", function(){
          if (event.keyCode == 13){
          // 触发需要调用的方法
          $(".search").click();
          }
      });
    </script>
  </body>
  </html>`
}
