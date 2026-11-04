const link=document.querySelector('[data-compose-return]');
const content=document.querySelector('[data-return-content]');
if(link&&content){
  const origin=link.parentElement;
  const marker=document.createComment('');
  link.before(marker);
  const observer=new MutationObserver(compose);
  function compose(){
    const title=content.querySelector('h1');
    if(title?.parentElement.classList.contains('ui-page-heading')&&link.parentElement===title.parentElement)return;
    observer.disconnect();
    if(title){
      const heading=document.createElement('div');
      heading.className='ui-page-heading';
      title.before(heading);
      heading.append(link,title);
      if(origin.classList.contains('news-heading'))origin.hidden=true;
    }else{
      marker.after(link);
      if(origin.classList.contains('news-heading'))origin.hidden=false;
    }
    observer.observe(content,{childList:true,subtree:true});
  }
  compose();
}
