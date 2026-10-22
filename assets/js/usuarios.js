const search=document.querySelector('[data-search]');
const filters=[...document.querySelectorAll('[data-filter]')];
const rows=[...document.querySelectorAll('.user-row')];
const empty=document.querySelector('[data-empty]');
const resultCount=document.querySelector('[data-result-count]');
const siteHeader=document.querySelector('[data-header]');
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)');
let activeFilter='all';

function syncHeader(){siteHeader?.classList.toggle('is-scrolled',window.scrollY>28);}
addEventListener('scroll',syncHeader,{passive:true});
syncHeader();

function updateResults(){
  const query=search.value.trim().toLocaleLowerCase('es');
  let visible=0;
  rows.forEach(row=>{
    const matchesFilter=activeFilter==='all'||row.dataset.status===activeFilter;
    const matchesQuery=`${row.dataset.name} ${row.dataset.email}`.toLocaleLowerCase('es').includes(query);
    row.hidden=!(matchesFilter&&matchesQuery);
    if(!row.hidden)visible+=1;
  });
  resultCount.textContent=String(visible);
  empty.hidden=visible!==0;
  const detail=document.querySelector('.user-detail');
  detail.hidden=visible===0;
  const selected=rows.find(row=>row.classList.contains('is-selected'));
  if(visible>0&&selected?.hidden){rows.find(row=>!row.hidden)?.click();}
}

filters.forEach(button=>button.addEventListener('click',()=>{
  activeFilter=button.dataset.filter;
  filters.forEach(item=>{const selected=item===button;item.classList.toggle('is-active',selected);item.setAttribute('aria-pressed',String(selected));});
  updateResults();
}));

search.addEventListener('input',updateResults);
document.addEventListener('keydown',event=>{if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();search.focus();}});

rows.forEach(row=>row.addEventListener('click',()=>{
  rows.forEach(item=>{const selected=item===row;item.classList.toggle('is-selected',selected);item.setAttribute('aria-pressed',String(selected));});
  document.querySelector('[data-detail-initials]').textContent=row.dataset.initials;
  document.querySelector('[data-detail-name]').textContent=row.dataset.name;
  const email=document.querySelector('[data-detail-email]');
  email.textContent=row.dataset.email;
  email.href=`mailto:${row.dataset.email}`;
  document.querySelector('[data-detail-status]').textContent=row.dataset.status==='active'?'Activo':'Pendiente';
  if(!reduceMotion.matches){
    document.querySelectorAll('.detail-identity,.detail-boundary,.detail-list').forEach((node,index)=>node.animate(
      [{opacity:.72,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],
      {duration:180+index*25,easing:'cubic-bezier(.23,1,.32,1)'}
    ));
  }
}));
