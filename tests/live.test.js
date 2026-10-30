const {test,after}=require('node:test');const assert=require('node:assert/strict');const {server}=require('../server');
let base;
async function api(action,body={}){const r=await fetch(base+'/api/'+action,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});return {status:r.status,data:await r.json()}}
test('live session: create, join, first-buzz arbitration, incorrect reopen, correct award, leaderboard, end',async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));base='http://127.0.0.1:'+server.address().port;
 const c=await api('session/create');assert.equal(c.status,200);const sessionId=c.data.sessionId,teacherToken=c.data.teacherToken;
 const join=async name=>{const r=await api('session/join',{sessionId,name,avatar:'🦊'});assert.equal(r.status,200);return {sessionId,studentId:r.data.studentId,studentToken:r.data.studentToken}};
 const a=await join('Alex'),b=await join('Sara');
 assert.equal((await api('session/join',{sessionId,name:'Alex'})).status,409);
 assert.equal((await api('round/open',{sessionId,teacherToken,questionLabel:'Relationships',points:20})).status,200);
 assert.equal((await api('student/buzz',a)).status,200);
 assert.equal((await api('student/buzz',b)).status,409);
 assert.equal((await api('round/reopen',{sessionId,teacherToken})).status,200);
 assert.equal((await api('student/buzz',a)).status,409);
 assert.equal((await api('student/buzz',b)).status,200);
 assert.equal((await api('round/correct',{sessionId,teacherToken})).status,200);
 const end=await api('session/end',{sessionId,teacherToken});assert.equal(end.status,200);const sar=end.data;
 assert.equal((await api('student/buzz',b)).status,409);
 const qr=await fetch(base+'/api/qr?url='+encodeURIComponent(base+'/student.html?session='+sessionId));assert.equal(qr.status,200);assert.match(await qr.text(),/<svg/);
 const page=await fetch(base+'/student.html');assert.equal(page.status,200);
 const teacher=await fetch(base+'/');assert.equal(teacher.status,200);
 const s=require('../server').sessions.get(sessionId);assert.equal(s.students.get(b.studentId).points,20);assert.equal(s.students.get(a.studentId).incorrect,1);assert.equal(s.leaderboard,true);
});
after(()=>server.close());
