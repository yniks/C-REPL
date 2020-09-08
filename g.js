i=require('./gdbinterface')
f=await i()
f.request('call 1+1')
await f.request('call 1+1')
await f.request('call 1+1')
await f.request('call 2**2')
await f.request('call 2*2')
await f.request('call 2*2*674534')
await f.request('call 2*2*67453443343443523')
await f.request('call 2*2*674534433434435234355423434234234243423')
await f.request('call 2*2*6745344334344352343554234342342342\')
await f.request('call 2*2*6745344334344352343554234342342342')
await f.request('call 2*2*6745344334344352343554234342')
await f.request('call 2*2*674534433434435234')
await f.request('call 2*2*67453443343443523400')
await f.request('call 2*2*674534433434435234000')
await f.request('call 2*2*67453443343443523400')
await f.request('call 2*2*67453443343443523400')
await f.request('call $10')
await f.request('call $10==$11')
await f.request('call $10==$11')
await f.request('call $10==$11')
await f.request('call $10==$11')
await f.request('call $10==$11')
await f.request('call $10==$11')
await f.request('call $10==$11')
await f.request('call $10==$11')
f.request('call $10==$11').then(console.log);f.request('call 12+300').then(console.log);


f.request('call $10==$11').then(console.log);f.request('call 12+300').then(console.log);
f.request('call $10==$11').then(console.log);f.request('call 12+300').then(console.log);
f.request('call $10==$11').then(console.log);f.request('call 12+300').then(console.log);

process.cwd()