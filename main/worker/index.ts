import Kiribi from '../src';
import client from '../src/client';
import rest from '../src/rest';
import { KiribiJobWorker } from '../src/job-worker';

export default class extends Kiribi {
	client = client;
	rest = rest;
}

// you can split this class into another worker
export class SlowJob extends KiribiJobWorker {
	async perform(payload: number | string) {
		await new Promise((r) => setTimeout(r, payload ? Number(payload) : 30000));
	}
}

export class FlakyJob extends KiribiJobWorker {
	async perform(payload: number | string) {
		const chance = payload ? Number(payload) : 0.5;
		if (Math.random() > chance) throw new Error('Failed to perform job because of your daily behavior');
	}
}
