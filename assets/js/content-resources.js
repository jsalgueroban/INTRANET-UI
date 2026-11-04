import { readDrafts, saveDraft } from './editorial-store.js';
import { writeResource, deleteResource } from './resource-binary-store.js';
export { resourceData, supportedTypes } from './resource-binary-store.js';
export function updateResources(id, change) {
  const draft = readDrafts().find(item => item.id === id);
  if (!draft) throw new Error('missing draft');
  return saveDraft({ ...draft, resources: change(draft.resources || []) });
}
export function addResource(draftId, file, data) {
  const resource = { id: crypto.randomUUID(), name: file.name, originalName: file.name, description: '', type: file.type, size: file.size };
  writeResource(resource.id, data);
  try { return updateResources(draftId, items => [...items, resource]); }
  catch (error) { deleteResource(resource.id); throw error; }
}
export function removeResource(draftId, id) {
  const draft = updateResources(draftId, items => items.filter(item => item.id !== id));
  deleteResource(id);
  return draft;
}
