declare module 'sort-by' {
	function type(type: string): (arg: any) => boolean;
	function sort<V>(property: string, map: (property: string, value: V) => V): (a: object, b: object) => number;
	export default function sortBy(...args: any[]): (obj1: object, obj2: object) => number;
}
