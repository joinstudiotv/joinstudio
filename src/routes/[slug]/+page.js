import { error } from '@sveltejs/kit';
import { talents } from '../data.js';

export function load({ params }) {
	const talent = talents.find((talent) => talent.slug === params.slug);

	if (!talent) error(404);

	return {
		talent
	};
}
