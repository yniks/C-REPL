var {init:gdblib}=require('talk-to-gdbmi')
var path=require('path')
var compiler=require('./compiler')
var readelf=require('./readelf')
async function init(mainSo)
 {
    var mainexec=await compiler.makeExecObject([mainSo],['-ldl'])
    var gdb=await gdblib(mainexec.name,path.dirname(mainexec.name))
    async function expression(src)
    {
        return await gdb.request(src)
    }
    async function evaluate(src)
    {
        try{
           return await expression(src)

        }
        catch(e)
        {
            var sofile=await compiler.codetoso(src)
            return {sofile,symbols:readelf.readfromSo(sofile)}
        }
    }
    return {evaluate,expression,gdb}
}
async function main()
{
    var {makeObjectFile,makeSharedObject,makeSourceFile,codetoso,makeExecObject}=require('./compiler')
    var sofile=await codetoso(`#include <stdio.h>
#define _GNU_SOURCE
#include <dlfcn.h>

int main(void) {
  printf("Started/n");    
  return 0;
                }

void * store;
void * nikhilesh(char * lib)
{
  return dlopen(lib,RTLD_NOW);
}
`)
return  init(sofile)
}
module.exports={init,main}