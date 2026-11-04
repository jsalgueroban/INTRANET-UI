import { reviewSnapshot, snapshotReady } from './editorial-snapshot.js';
import { writeResource, deleteResource } from './resource-binary-store.js';
import { readItems, revisionToken } from './pending-store.js';
import { news } from './news-data.js';
const key='banasan-editorial-drafts-v1';
export function readDrafts(){const raw=sessionStorage.getItem(key);const list=raw?JSON.parse(raw):[];if(!Array.isArray(list))throw new Error('invalid drafts');return list;}
export function saveDraft(draft){const list=readDrafts();const entry={...draft,updatedAt:new Date().toISOString()};const index=list.findIndex(item=>item.id===entry.id);if(index<0)list.push(entry);else list[index]=entry;sessionStorage.setItem(key,JSON.stringify(list));return entry;}
export function newDraft(sourceId){const source=news.find(item=>item.id===sourceId);const existing=source&&readDrafts().find(item=>item.sourceId===sourceId);if(existing)return existing;return saveDraft({id:crypto.randomUUID(),sourceId:source?.id||null,title:source?.title||'',summary:source?.summary||'',category:source?.category||'',image:source?.image||'',alt:source?.alt||'',sections:source?structuredClone(source.sections):[{title:'',text:''}]});}


function saveRecovered(snapshot, metadata) {
  if (!snapshotReady(snapshot)) throw new Error('resource unavailable');
  const created = [];
  try {
    const resources = (snapshot.resources || []).map(resource => {
      const id = crypto.randomUUID(); writeResource(id, resource.data); created.push(id);
      const { data, ...details } = resource;
      return { ...details, id };
    });
    return saveDraft({ ...snapshot, id: crypto.randomUUID(), sourceId: null, ...metadata, resources, recoveredAt: new Date().toISOString() });
  } catch (error) { created.forEach(deleteResource); throw error; }
}
export function recoverRevision(item, version) {
  if (!['before', 'after'].includes(version) || item.type !== 'contenido') throw new Error('invalid revision');
  return saveRecovered(reviewSnapshot(item, version), { sourceReview: item.id, sourceVersion: version, sourceRound: item.round || 1 });
}
export function resumeCorrection(reviewId, expectedRevision) {
  const item = readItems().find(entry => entry.id === reviewId && entry.type === 'contenido');
  if (!item || item.status !== 'Devuelto' || revisionToken(item) !== expectedRevision) throw new Error('review unavailable');
  const existing = readDrafts().find(draft => draft.correctionOf === reviewId && draft.sourceRound === (item.round || 1));
  if (existing) return existing;
  return saveRecovered(reviewSnapshot(item, 'after'), { sourceReview: item.id, sourceRound: item.round || 1, sourceVersion: 'after', correctionOf: item.id, feedback: item.reason, reviewer: item.actor, feedbackAt: item.resolvedAt });
}
