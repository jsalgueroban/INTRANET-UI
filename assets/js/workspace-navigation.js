const nav=document.querySelector('.ui-workspace-nav');
function reveal(){const active=nav?.querySelector('[aria-current="page"]');if(!active)return;const a=active.getBoundingClientRect(),n=nav.getBoundingClientRect();nav.scrollLeft+=a.left-n.left-(nav.clientWidth-a.width)/2;}
reveal();window.addEventListener('resize',reveal);
