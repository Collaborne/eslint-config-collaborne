export const A_CONSTANT_VALUE = 500;

export interface Interface {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	camel_case_should_be_used: boolean;
}

export class Class {
	private foo = 3;

	getFoo() {
		return this.foo;
	}
}

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
