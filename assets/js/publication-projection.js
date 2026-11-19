import {readItems} from './pending-store.js?v=20261106e';
import {snapshotReady} from './editorial-snapshot.js';
export function publicationProjection(seed){const byId=new Map(seed.map(n=>[n.id,n]));const approved=readItems().filter(r=>r.type==='contenido'&&r.publicationId&&r.resolved&&r.status==='Publicado'&&r.afterSnapshot&&snapshotReady(r.afterSnapshot)).sort((a,b)=>a.resolvedAt.localeCompare(b.resolvedAt));for(const r of approved){byId.set(r.publicationId,{...r.afterSnapshot,id:r.publicationId,date:r.resolvedAt.slice(0,10),reviewId:r.id});}return [...byId.values()];}
