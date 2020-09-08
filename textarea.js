 var blessed = require('blessed')
  , screen;
screen = blessed.screen({
  warnings: false
});
var e=require('execa')
function format(code)
{
    var f=e('./clang-format')
    f.stdin.write(code)
    f.stdin.end()
    var result=[]
     f.stdout.setEncoding('utf-8').on('data',(data)=>result.push(data))
    return new Promise((res,rej)=>{
        f.stdout.setEncoding('utf-8').on('data',(result)=>res(result))
    })
}
function attemptToSubmit(code)
{
    code=code.trim()
    if(code.endsWith(';')||code.endsWith('}')||code.endsWith(')'))
    return true
}
var form = blessed.form({
  parent: screen,
  mouse: true,
  keys: true,
  vi: true,
  left: 0,
  top: 0,
  width: '100%',
  //height: 12,
  style: {
    bg: 'black',
    // border: {
    //   inverse: true
    // },
    scrollbar: {
      inverse: true
    }
  },
  content: 'C/C++',
  scrollable: true,
  // border: {
  //   type: 'ch',
  //   ch: ' '
  // },
  scrollbar: {
    ch: ' '
  }
  //alwaysScroll: true
});

form.on('submit', function(data) {
  output.setContent(JSON.stringify(data, null, 2));
  screen.render();
});

form.key('d', function() {
  form.scroll(1, true);
  screen.render();
});

form.key('u', function() {
  form.scroll(-1, true);
  screen.render();
});


var text = blessed.textarea({
  parent: form,
  mouse: true,
  keys: true,
  border: {
    type: 'line'
  },
  style: {
      bg:'black',
    border: {
      invers: true,
      fg:'white'
    },
  },
  height: '100%-2',
  width: '100%-2',
  left: 'center',
  top: 'center',
  name: 'text'
});
text.enableKeys()

text.on('keypress',(k,l)=>{
    if (l.name=='enter' && attemptToSubmit(text.value))
    form.submit()
    
})
text.on('focus', function() {
  text.readInput();
});

var submit = blessed.button({
  parent: form,
  mouse: true,
  keys: true,
  shrink: true,
  padding: {
    left: 1,
    right: 1
  },
  left: '90%',
  top: '90%',
  shrink: true,
  name: 'submit',
  content: 'submit',
  style: {
    bg: 'blue',
    focus: {
      bg: 'red'
    }
  }

});

submit.on('press', function() {
  form.submit();
});


var output = blessed.scrollabletext({
  parent: form,
  mouse: true,
  keys: true,
  left: 0,
  top: 20,
  height: 5,
  left: 0,
  right: 0,
  style: {
    bg: 'red'
  },
  content: 'foobar'
});


screen.key('q', function() {
  return screen.destroy();
});

form.focus();

form.submit();

screen.render();