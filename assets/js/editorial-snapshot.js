import { validResourceData } from './resource-binary-store.js';
export function reviewSnapshot(item, version) {
  const snapshot = item[version + 'Snapshot'];
  return structuredClone(snapshot || { title: item.title || '', summary: '', category: '', image: item[version + 'Image'] || '', alt: '', sections: [{ title: '', text: item[version] || '' }], resources: [] });
}
export function snapshotReady(snapshot) {
  return (snapshot.resources || []).every(item => validResourceData(item.data, item.type));
}
export function snapshotChanges(before, after) {
  const changes = [];
  for (const [key, label] of [['title', 'Título'], ['summary', 'Resumen'], ['category', 'Categoría'], ['sections', 'Texto'], ['image', 'Imagen de portada'], ['alt', 'Descripción de portada']]) {
    if (JSON.stringify(before[key]) !== JSON.stringify(after[key])) changes.push('Cambio en ' + label.toLocaleLowerCase('es'));
  }
  const previous = before.resources || [], next = after.resources || [];
  for (const item of next) {
    const old = previous.find(entry => entry.id === item.id);
    if (!old) changes.push('Adjunto agregado: ' + item.name);
    else if (JSON.stringify(old) !== JSON.stringify(item)) changes.push('Adjunto actualizado: ' + item.name);
  }
  for (const item of previous) if (!next.some(entry => entry.id === item.id)) changes.push('Adjunto retirado: ' + item.name);
  if (previous.length === next.length && previous.every(item => next.some(entry => entry.id === item.id)) && previous.some((item, index) => item.id !== next[index].id)) changes.push('Orden de adjuntos actualizado');
  return changes;
}
