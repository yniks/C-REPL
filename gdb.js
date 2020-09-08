var globalgdb;
var store=new WeakMap();
var e=require('execa');
var path=require('path')
function getInstance(mainSoFile){
    if (store.has(mainSoFile))return store.get(mainSoFile);
    var gdb=e('gdb',[path.basename(mainSoFile.name)],{cwd:path.dirname(mainSoFile.name)})
    var id=Date.now()+Math.random()
    var Q=[]
    gdb.stdout.on("data", (result) => {
      if (Q.length) Q.shift()[0](result.toString("utf-8"));
    });
    gdb.stderr.on("data", (result) => {
        if (Q.length) Q[0][1](result.toString("utf-8"));
      });
    gdb.initialized = true;
    globalgdb=gdb; 
    async function request(data) {
      if (data[data.length - 1] != "\n") data += "\n";
        return new Promise((res, rej) => {
          Q.push([res,rej]);
          gdb.stdin.write(data);
        });
    }
  return {
    id,
    gdb,
    close:function(){
      delete store[id]
      e.kill()
    },
    async loadso(sofile)
    {
        await this.request(`call dlopen("${sofile.name}",RTLD_NOW)`)
    },
    request,
  };
}
module.exports = getInstance;