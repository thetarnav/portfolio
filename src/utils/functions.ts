import { copyArray } from './fp'

export function random(
	min: number,
	max: number,
	math?: 'floor' | 'round' | 'ceil',
): number {
	const result = Math.random() * (max - min) + min
	if (math) {
		// eslint-disable-next-line default-case
		switch (math) {
			case 'floor':
				return Math.floor(result)
			case 'round':
				return Math.round(result)
			case 'ceil':
				return Math.ceil(result)
		}
	}
	return result
}

export const clamp = (value: number, min: number, max: number): number =>
	Math.min(Math.max(value, min), max)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function isNullish(val: any): boolean {
	return [null, undefined, false].indexOf(val) !== -1
}

export const deleteRandom = (array: any[]): boolean =>
	array.splice(random(0, array.length, 'floor'), 1).length > 0

export function getRandom<T>(iterable: T[]): T
export function getRandom(iterable: string): string
export function getRandom(iterable: any[] | string): any {
	return iterable[random(0, iterable.length, 'floor')]
}

export function filterDuplicates(iterable: string): string
export function filterDuplicates<T>(iterable: T[]): T[]
export function filterDuplicates(iterable: any[] | string): any {
	const isString = typeof iterable === 'string',
		result: any[] = []
	new Set(iterable).forEach(x => result.push(x))
	return isString ? result.join('') : result
}

/**
 * Mutates the array!
 * @returns deleted item or undefined */
export function removeFromArray<T>(array: T[], item: T): T | undefined
export function removeFromArray<T>(
	array: T[],
	iterator: (value: T, index: number, obj: T[]) => boolean,
): T | undefined
export function removeFromArray<T>(
	array: T[],
	b: T | ((value: T, index: number, obj: T[]) => boolean),
): T | undefined {
	if (typeof b === 'function' && array.indexOf(b as T) === -1) {
		const index = array.findIndex(
			b as (value: T, index: number, obj: T[]) => boolean,
		)
		return array.splice(index, 1)[0]
	}
	return array.splice(array.indexOf(b as T), 1)[0]
}

export function removeFromArrayCopy<T>(
	array: readonly T[],
	item: T,
): { array: T[]; deleted: T | undefined }
export function removeFromArrayCopy<T>(
	array: readonly T[],
	iterator: (item: T) => boolean,
): { array: T[]; deleted: T | undefined }
export function removeFromArrayCopy<T>(
	array: readonly T[],
	b: T | ((value: T, index: number, obj: T[]) => boolean),
): { array: T[]; deleted: T | undefined } {
	const copy = copyArray(array)
	const deleted = removeFromArray<T>(copy, b as any)
	return { array: copy, deleted }
}

export const arraySplit = <T>(array: T[], splitIndex: number): [T[], T[]] => [
	array.slice(0, splitIndex),
	array.slice(splitIndex),
]

export const keyLookup = <T extends Record<string, any>, K extends keyof T>(
	list: T[],
	key: K,
): Record<T[K], number> =>
	list.reduce((a, e) => {
		a[e[key]] = ++a[e[key]] || 1
		return a
	}, {} as Record<K, number>)

export function getObjectDuplicates<
	T extends Record<string, any>,
	K extends keyof T,
>(list: T[], key: K): T[] {
	const lookup = keyLookup(list, key)
	return list.filter(e => lookup[e[key]] > 1)
}

export const wait = (time: number): Promise<number> =>
	new Promise(resolve => setTimeout(() => resolve(time), time))

export function promiseWhile(
	conditionFunc: () => boolean,
	actionPromise: () => Promise<any>,
): Promise<void> {
	const whilst = (): Promise<void> =>
		conditionFunc() ? actionPromise().then(whilst) : Promise.resolve()
	return whilst()
}

export const animateWithClass = (
	element: HTMLElement | Element,
	className: string,
): void => {
	element.classList.remove(className)
	// eslint-disable-next-line no-void
	void (element as HTMLElement).offsetWidth
	element.classList.add(className)
}

export const coinFlip = (p = 0.5): boolean => Math.random() < p

export const lerp = (current: number, goal: number, p: number): number =>
	(1 - p) * current + p * goal

export const flipP = (p: number): number =>
	p >= 0 ? Math.abs(p - 1) : Math.abs(p) - 1

export const flipVal = (val: number, min: number, max: number): number =>
	Math.abs(val * (Math.sign(val) || 1) - max) + min

export const pToVal = (p: number, zero: number, hundred: number): number =>
	p * (hundred - zero) + zero

export function valToP(value: number, min: number, max: number): number {
	if (min > max) {
		;[min, max] = [max, min]
		value = flipVal(value, min, max)
	}
	return (value - min) / (max - min)
}

export function valToPwMid(
	value: number,
	min: number,
	max: number,
	turn = pToVal(0.5, min, max),
): number {
	if (min > max) {
		;[min, max] = [max, min]
		turn = flipVal(turn, min, max)
		value = flipVal(value, min, max)
	}
	return value < turn
		? (value - turn) / (turn - min)
		: (value - turn) / (max - turn)
}

export const isInRange = (
	n: number,
	min: number,
	max: number,
	exc = false,
): boolean => {
	if (min > max) {
		const tmpMin = min
		min = max
		max = tmpMin
	}
	return exc ? n > min && n < max : n >= min && n <= max
}

export const isClose = (n: number, goal: number, range: number): boolean =>
	isInRange(n, goal - range, goal + range)

export function roundNumber(num: number, scale: number): number {
	if (!('' + num).includes('e')) {
		return +(Math.round(parseFloat(num + 'e+' + scale)) + 'e-' + scale)
	} else {
		const arr = ('' + num).split('e')
		let sig = ''
		if (+arr[1] + scale > 0) {
			sig = '+'
		}
		return +(
			Math.round(parseFloat(+arr[0] + 'e' + sig + (+arr[1] + scale))) +
			'e-' +
			scale
		)
	}
}

export function capitalize(string: string): string {
	return string.charAt(0).toUpperCase() + string.slice(1)
}

/** Mutates the array! */
export const reorderArray = (array: any[], from: number, to: number): void => {
	array.splice(from < to ? to - 1 : to, 0, array.splice(from, 1)[0])
}

/** Returns a reordered array */
export const reorderArrayCopy = <T>(
	array: readonly T[],
	from: number,
	to: number,
): T[] => {
	const copy = copyArray(array)
	reorderArray(copy, from, to)
	return copy
}
