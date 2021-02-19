export function hello(): string {
	return 'Hello world!';
}

export function unusedThings(_unusedArgument = 'ok'): unknown {
	const _unusedVariable = 'ok';
	const { _unusedRestSibling, ...rest } = { foo: '100' };
	return rest;
}
