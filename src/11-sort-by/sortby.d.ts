declare module 'sort-by' {
	function type(type: string): (arg: any) => boolean;
	function sort<V, T extends object>(property: string, map: (property: string, value: V) => V): (a: T, b: T) => number;
	export default function sortBy<V, T extends object>(...args: (string | ((property: string, value: V) => V))[]): (obj1: T, obj2: T) => number;
}
