const prefix = 'banasan-resource-';
export const supportedTypes = ['image/png', 'image/jpeg', 'image/webp', 'application/pdf', 'text/plain', 'video/mp4', 'video/webm'];
export function validResourceData(value, type) {
  return typeof value === 'string' && supportedTypes.includes(type) && value.startsWith('data:' + type + ';base64,');
}
export function resourceData(id) {
  const value = sessionStorage.getItem(prefix + id);
  return supportedTypes.some(type => validResourceData(value, type)) ? value : null;
}
export function writeResource(id, value) { sessionStorage.setItem(prefix + id, value); }
export function deleteResource(id) { sessionStorage.removeItem(prefix + id); }
