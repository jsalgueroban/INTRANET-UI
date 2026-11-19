const key = 'banasan-document-library-proposal-v1';
const initial = {
  records: [
    {id:'guia-bienestar',code:'MA-PGH-001',title:'Guía de orientación',type:'PDF',company:'banasan',audience:'general',download:false,status:'Vigente',version:'1',file:'assets/demo/guia-bienestar.pdf'},
    {id:'formato-orientacion',code:'FR-PGH-019',title:'Formato de orientación',type:'Word',company:'banasan',audience:'general',download:true,status:'Vigente',version:'1',file:'assets/demo/formato-orientacion.docx'},
    {id:'seguimiento',code:'FR-PGH-049',title:'Seguimiento de actividades',type:'Excel',company:'banasan',audience:'procesos',download:true,status:'Vigente',version:'1',file:'assets/demo/seguimiento-actividades.xlsx'},
    {id:'calendario-2026',code:'CAL-2026',title:'Calendario Bananero 2026',type:'PDF',company:'banasan',audience:'general',download:false,status:'Vigente',version:'1',file:'assets/demo/calendario-2026.pdf'}
  ],
  placements: [{page:'beneficios',document:'guia-bienestar'},{page:'beneficios',document:'formato-orientacion'}]
};
export function readLibrary(){
  try { const saved=JSON.parse(sessionStorage.getItem(key)||'null');
    return saved&&Array.isArray(saved.records)&&Array.isArray(saved.placements)?saved:structuredClone(initial);
  } catch { return structuredClone(initial); }
}
function write(state){sessionStorage.setItem(key,JSON.stringify(state));window.dispatchEvent(new Event('banasan-library-change'));}
export function addDocument(input){
  const state=readLibrary(),code=input.code.trim(),title=input.title.trim();
  if(!code||!title)throw new Error('Completa el código y el nombre.');
  if(state.records.some(item=>item.company===input.company&&item.code.toLocaleLowerCase('es')===code.toLocaleLowerCase('es')))throw new Error('Ya existe ese código en la empresa.');
  const record={id:crypto.randomUUID(),code,title,type:input.type,company:input.company,audience:input.audience,download:input.download,status:'Vigente',version:'1',file:input.file};
  state.records.push(record);write(state);return record;
}
export function updatePolicy(id,policy){
  const state=readLibrary(),record=state.records.find(item=>item.id===id);
  if(!record)throw new Error('Documento no disponible.');
  record.audience=policy.audience;record.download=policy.download;write(state);
}
export function setPlacement(page,document){
  const state=readLibrary(),record=state.records.find(item=>item.id===document);
  if(!record||record.status!=='Vigente')throw new Error('Selecciona un documento vigente.');
  if(state.placements.some(item=>item.page===page&&item.document===document))return;
  state.placements.push({page,document});write(state);
}
export function removePlacement(page,document){const state=readLibrary();state.placements=state.placements.filter(item=>item.page!==page||item.document!==document);write(state);}
export function documentsForPage(page){const state=readLibrary();return state.placements.filter(item=>item.page===page).map(item=>state.records.find(record=>record.id===item.document)).filter(Boolean);}
