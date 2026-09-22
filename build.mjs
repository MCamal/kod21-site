import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
const root=new URL('./',import.meta.url);
const template=readFileSync(new URL('shell.html',root),'utf8');
const data=JSON.parse(readFileSync(new URL('content.json',root),'utf8'));
const escape=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const routes=[['','Код.21 — думать вместе','Интеллектуальный клуб в Махачкале. Девять программ вокруг одной идеи — думать вместе.'],['about','О клубе — Код.21','Философия, основатели и ведущие интеллектуального клуба Код.21.'],['partners','Партнёрам — Код.21','Поддержите программы клуба или создайте подкаст под задачу вашего бренда.'],['contacts','Контакты — Код.21','Запись в клуб, Telegram @code21, встречи в Махачкале.'],...data.programs.map(p=>[p.slug,p.name+' — Код.21',p.description])];
for(const [slug,title,desc] of routes){const dir=new URL(slug?slug+'/':'./',root);mkdirSync(dir,{recursive:true});const html=template.replace(/<title>.*?<\/title>/,`<title>${escape(title)}</title>`).replace(/(<meta name="description" content=")[^"]*/,`$1${escape(desc)}`).replace(/(<meta property="og:title" content=")[^"]*/,`$1${escape(title)}`).replace(/(<meta property="og:description" content=")[^"]*/,`$1${escape(desc)}`);writeFileSync(new URL('index.html',dir),html)}
console.log(`Built ${routes.length} pages`);
