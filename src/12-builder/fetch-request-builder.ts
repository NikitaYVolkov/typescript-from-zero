type FetcherMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export class FetchRequestBuilder {
	private url: string | URL | undefined = undefined;
	private method: FetcherMethod = 'GET';
	private mode: RequestMode = 'cors';
	private cache: RequestCache = 'default';
	private credentials: RequestCredentials = 'same-origin';
	private redirect: RequestRedirect = 'follow';
	private referrerPolicy: ReferrerPolicy = 'no-referrer-when-downgrade';
	private headers: Headers = new Headers();
	private body: string | URLSearchParams | undefined = undefined;

	setUrl(url: string | URL): this {
		this.url = url;
		return this;
	}

	setMethod(method: FetcherMethod): this {
		this.method = method;
		return this;
	}

	setMode(mode: RequestMode): this {
		this.mode = mode;
		return this;
	}

	setCache(cache: RequestCache): this {
		this.cache = cache;
		return this;
	}

	setCredentials(credentials: RequestCredentials): this {
		this.credentials = credentials;
		return this;
	}

	setRedirect(redirect: RequestRedirect): this {
		this.redirect = redirect;
		return this;
	}

	setReferrerPolicy(referrerPolicy: ReferrerPolicy): this {
		this.referrerPolicy = referrerPolicy;
		return this;
	}

	setBody(body: string | URLSearchParams): this {
		this.body = body;
		return this;
	}

	addHeader(name: string, value: string): this {
		this.headers.append(name, value);
		return this;
	}

	exec(): Promise<Response> {
		if (this.url === undefined) throw new Error("Can't fetch an undefined URL.");
		const requestInit: RequestInit = {
			method: this.method,
			mode: this.mode,
			cache: this.cache,
			credentials: this.credentials,
			redirect: this.redirect,
			referrerPolicy: this.referrerPolicy,
			headers: this.headers
		}
		if (this.body !== undefined) requestInit.body = this.body;
		return fetch(this.url, requestInit);
	}
}

function createUrlWithSearchParam(url: URL, paramName: string, paramValue: string): URL {
	const returnUrl = new URL(url);
	returnUrl.searchParams.set(paramName, paramValue);
	return returnUrl;
}

export async function FetchRequestBuilderTest() {
	const getPiUrl = new URL('https://test.k6.io/pi.php');

	console.log('1. Get Pi with 5 decimals');
	const response1 = await new FetchRequestBuilder()
		.addHeader('MyHeaderName', 'MyHeaderValue')
		.setUrl(createUrlWithSearchParam(getPiUrl, 'decimals', '5'))
		.exec();
	console.log('HTTP status: ' + response1.status);
	console.log(await response1.text());

	const typicodeUrl = 'https://jsonplaceholder.typicode.com';

	console.log("2. Make a post at typicode mock");
	const createNewPostResponse = await new FetchRequestBuilder()
		.setUrl(typicodeUrl.concat('/posts'))
		.setMethod('POST')
		.setBody('My post about cats.')
		.exec();
	console.log('HTTP status: ' + createNewPostResponse.status);
	console.log(await createNewPostResponse.json());
}
