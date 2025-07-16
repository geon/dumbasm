export type ParseResult<T> =
	| {
			consumed: number;
			parsed: T;
	  }
	| undefined;

export type Parser<T> = (input: string, fromIndex: number) => ParseResult<T>;
