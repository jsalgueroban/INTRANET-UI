import {mountReservation} from './reservation-form.js?v=20261123';
mountReservation(document.querySelector('[data-request-stage]'),new URLSearchParams(location.search));
