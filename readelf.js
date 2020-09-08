const e=require('execa')
async function readfromPath(path)
{
    var result=await e.command(`readelf -s ${path} | grep \'FUNC\\|OBJECT\'  | awk '$3 > 0  {printf "%d %s %s\\n ",$3,$8,$4;}' `,{shell:true})
    return result.stdout.split("\n").map(s=>s.split(" ").filter(c=>c)).sort((a,b)=>Number(a[0])-Number(b[0])).filter(a=>a.length).map(l=>({size:l[0],type:l[1],name:l[2]}))
}
async function readfromSo(sofile)
{
    if (sofile.type!='sofile')console.warn("SOfile was expected !");
    return readfromPath(sofile.name)
}
module.exports={readfromPath,readfromSo}