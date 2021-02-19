export function hello(): string {
	return 'Hello world!';
}

export function unusedThings(_unusedArgument = 'ok'): unknown {
	const _unusedVariable = 'ok';
	const { _unusedRestSibling, ...rest } = { foo: '100' };
	return rest;
}

export function alwaysReturnExample(): void {
	const promise = Promise.resolve('a value');

	void promise.then(value => {
		console.log(`We got a value: ${value}`);
	});
}
