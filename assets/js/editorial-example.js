import { mountEditorialReview } from './ui-editorial-review.js';
mountEditorialReview(document.querySelector('[data-editorial-example]'), { title: 'Encuentro del equipo', before: 'Encuentro el jueves.', after: 'Encuentro el viernes a las nueve.', resolved: false });
