const {argv:{_:text}}=require('yargs')
    
const e=require('execa')
async function main()
{
    await e('gcc',[text])
    var result=await e('./a.out')
    console.log("code: ",text.join("\n##\n"))
    console.log("\noutput:",result.stdout)
}
main()