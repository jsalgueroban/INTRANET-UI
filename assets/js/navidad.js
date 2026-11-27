// Preview-only seasonal presentation; controls remain those of the source proposal.
const enabled = new URLSearchParams(location.search).get('christmas') !== 'off';
document.body.classList.add(enabled ? 'season-on' : 'season-off');
const login = document.querySelector('.archive-shell');
const host = login || document.querySelector('.hero');
const ornaments = `<div class="season-art" aria-hidden="true"><svg viewBox="0 0 680 720" fill="none"><defs><radialGradient id="gold" cx=".3" cy=".25" r=".8"><stop stop-color="#fff2bd"/><stop offset=".3" stop-color="#e9c171"/><stop offset=".7" stop-color="#a47125"/><stop offset="1" stop-color="#684514"/></radialGradient><radialGradient id="blue" cx=".3" cy=".2" r=".8"><stop stop-color="#418599"/><stop offset=".5" stop-color="#124958"/><stop offset="1" stop-color="#052b38"/></radialGradient><filter id="glow" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="5"/></filter><linearGradient id="leaf"><stop stop-color="#0d443d"/><stop offset=".5" stop-color="#43745a"/><stop offset="1" stop-color="#123e35"/></linearGradient><g id="leafsprig"><path d="M0 0Q55 75 82 205" stroke="#ae985d" stroke-width="2"/><path d="M20 37Q-65 12-28 84Q-9 106 39 83Q22 77 20 37ZM38 78Q100 9 115 68Q118 108 54 119Q58 99 38 78ZM52 116Q-32 83-12 151Q3 181 68 162Q58 143 52 116ZM67 156Q133 98 139 155Q142 188 79 194Q78 173 67 156Z" fill="url(#leaf)" stroke="#a6b97a" stroke-opacity=".18"/></g></defs><use href="#leafsprig" transform="translate(520 -75) rotate(48) scale(1.9)"/><use href="#leafsprig" transform="translate(700 100) rotate(105) scale(1.35)"/><use href="#leafsprig" transform="translate(380 -130) rotate(24) scale(1.2)"/><path d="M110 0Q255 185 450 115T710 180" stroke="#a28c4f" stroke-width="1.5"/><g fill="#ffdf94" filter="url(#glow)" opacity=".8"><circle cx="175" cy="59" r="10"/><circle cx="252" cy="103" r="10"/><circle cx="335" cy="125" r="10"/><circle cx="422" cy="122" r="10"/><circle cx="516" cy="106" r="10"/><circle cx="610" cy="123" r="10"/></g><g fill="#ffe8b0"><circle cx="175" cy="59" r="3.5"/><circle cx="252" cy="103" r="3.5"/><circle cx="335" cy="125" r="3.5"/><circle cx="422" cy="122" r="3.5"/><circle cx="516" cy="106" r="3.5"/><circle cx="610" cy="123" r="3.5"/></g><path d="M505 108V246M613 130V355M402 126V193" stroke="#e4c380" stroke-width="1"/><rect x="495" y="243" width="20" height="12" rx="3" fill="#c9a458"/><circle cx="505" cy="294" r="43" fill="url(#gold)"/><ellipse cx="493" cy="276" rx="9" ry="15" fill="#fff5d2" opacity=".3" transform="rotate(30 493 276)"/><path d="M467 294Q505 321 544 294M470 280Q505 307 541 280" stroke="#fff0bc" stroke-opacity=".35"/><rect x="604" y="350" width="18" height="11" rx="3" fill="#d8b66a"/><circle cx="613" cy="393" r="38" fill="url(#blue)"/><path d="M613 367V419M587 393H639M595 375L631 411M595 411L631 375" stroke="#c9ae67" stroke-width="1" opacity=".7"/><path d="M402 192l6 16 18 1-14 11 4 18-14-10-15 10 5-18-15-11 19-1Z" fill="#edce87"/><g fill="#f8df9e"><path d="M570 480l3 9 9 3-9 3-3 9-3-9-9-3 9-3Z"/><path d="M442 370l2 6 6 2-6 2-2 6-2-6-6-2 6-2Z"/><circle cx="649" cy="530" r="2"/><circle cx="535" cy="555" r="1.5"/></g><use href="#leafsprig" transform="translate(720 725) rotate(143) scale(1.2)"/></svg></div>`;
if (host) host.insertAdjacentHTML('beforeend', ornaments);
const content = document.querySelector(login ? '.archive-manifesto' : '.hero-content');
if(enabled && content){
  content.querySelector('h1').innerHTML = login ? 'Celebramos lo que<br>construimos juntos.' : 'La Navidad<br>crece aquí.';
  content.querySelector('p').textContent = login ? 'Gracias por ser parte de Banasan. Que esta temporada nos encuentre más unidos.' : 'Celebramos nuestra gente y todo lo que construimos juntos. Tus herramientas de siempre, aquí.';
}



const seasonalDetail = `<svg class="season-detail" aria-hidden="true" viewBox="0 0 240 140" fill="none"><path d="M228 14Q157 25 58 99" stroke="#b39758" stroke-width="1.5"/><g fill="#356556"><path d="M200 25Q160-8 145 7Q145 30 200 25Z"/><path d="M182 36Q213 40 214 72Q185 74 182 36Z"/><path d="M155 51Q110 20 104 39Q113 63 155 51Z"/><path d="M134 64Q163 68 160 98Q133 98 134 64Z"/><path d="M107 80Q64 51 60 71Q66 90 107 80Z"/><path d="M83 93Q106 104 98 126Q76 121 83 93Z"/></g><path d="M181 38V83" stroke="#b39758"/><circle cx="181" cy="99" r="16" fill="#c9a456"/><path d="M169 96Q180 108 194 97" stroke="#f6de9e"/><path d="M141 12l3 7 8 2-6 5 1 8-6-4-7 4 2-8-6-5 8-2Z" fill="#c9a456"/><g fill="#e7c16f"><circle cx="221" cy="16" r="2.5"/><circle cx="164" cy="43" r="2.5"/><circle cx="120" cy="71" r="2.5"/><circle cx="66" cy="95" r="2.5"/></g></svg>`;
document.querySelectorAll('.quick-section,.news-section,.jobs-section,.site-footer,.archive-access').forEach(section=>section.insertAdjacentHTML('beforeend',seasonalDetail));

if (!host) {
  document.body.classList.add('season-interior');
  const main = document.querySelector('main') || document.body;
  if (main) {
    const ribbon = document.createElement('div');
    ribbon.className = 'season-ribbon';
    ribbon.setAttribute('aria-hidden', 'true');
    ribbon.innerHTML = '<span class="season-thread"></span>' + seasonalDetail;
    main.prepend(ribbon);
  }
}
