const key='banasan-content-organization-v1';
const seed={categories:['Cultura','Bienestar','Operación'].map(name=>({id:name,name,active:true})),featured:'encuentro-equipos'};
export function readOrganization(){const value=JSON.parse(sessionStorage.getItem(key)||'null');return value||structuredClone(seed);}
export function saveCategory(id,name){name=name.trim();if(!name)throw new Error('Escribe el nombre de la categoría.');const state=readOrganization();if(state.categories.some(c=>c.id!==id&&c.name.toLocaleLowerCase('es')===name.toLocaleLowerCase('es')))throw new Error('Ya existe una categoría con ese nombre.');const item=state.categories.find(c=>c.id===id);if(item)item.name=name;else state.categories.push({id:crypto.randomUUID(),name,active:true});sessionStorage.setItem(key,JSON.stringify(state));}
export function toggleCategory(id){const state=readOrganization();const c=state.categories.find(c=>c.id===id);if(!c)throw new Error('La categoría ya no está disponible.');c.active=!c.active;sessionStorage.setItem(key,JSON.stringify(state));}
export function featureNews(id){const state=readOrganization();state.featured=id;sessionStorage.setItem(key,JSON.stringify(state));}
