var tmp = require('tmp');
var tmpdir = tmp.dirSync();
var fs=require('fs')
var crypto=require('crypto')
var md5sum=crypto.createHash('md5')
var e=require('execa');
const { cwd } = require('process');
async function makeSourceFile(textSrc) {
  var file = tmp.fileSync({ dir: tmpdir.name, postfix: ".c" });
  fs.writeFileSync(file.fd, textSrc);
  return {
    id: file.name.split(".")[0],
    name: file.name,
    type: "sfile", 
    src: textSrc,
    time:Date.now()
  };
}
async function makeObjectFile(sfile) {
  var filename = sfile.id + ".o";
  var gccCompileOptions = ["-w",
    "-g",
    "-Wall",
    "-fPIC",
    "-c",
    sfile.name,
    "-o",
    filename
  ];
  var out = await e("gcc", gccCompileOptions);
  if (out.stderr)throw out.stderr
  return {
    id: sfile.id,
    name: filename,
    src: sfile,
    type: "ofile",
    _gcc_result: out,
    time:sfile.time
  };
}
async function makeSharedObject(ofile) {
  var filename = ofile.id + ".so";
  var gccLinkerOptions = ["-w","-shared", "-g", ofile.name, "-o", filename,"-ldl"];
  var out = await e("gcc", gccLinkerOptions);
  if (out.stderr)throw out.stderr
  return {
    id: ofile.id,
    name: filename,
    src: ofile,
    type: "sofile",
    _gcc_result: out,
    time:ofile.time
  };
}
async function codetoso(textSrc)
{
    var s=await makeSourceFile(textSrc)
    var o=await makeObjectFile(s)
    var so=await makeSharedObject(o)
    return so
}
async function makeExecObject(sofiles,options=[])
{
  var sofilenames=sofiles.map(sofile=>path.basename(sofile.name)).sort()
  var hash=md5sum.copy().update(sofilenames.join("")).digest('hex')
  var filename = path.join(tmpdir.name,hash + ".a");
  var gccLinkerOptions = [`-Wl,-rpath=${tmpdir.name}`, "-g","-o", path.basename(filename)].concat(sofilenames).concat(options);
  var out = await e("gcc", gccLinkerOptions,{cwd:tmpdir.name,env:{LD_LIBRARY_PATH :tmpdir.name}});
  if (out.stderr)throw out.stderr
  return {
    id: hash,
    name: filename,
    src: sofiles,
    type: "afile",
    _gcc_result: out,
    time:Date.now()
  };
}
module.exports={makeObjectFile,makeSharedObject,makeSourceFile,codetoso,makeExecObject}