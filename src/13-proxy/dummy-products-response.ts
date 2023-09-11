import { FetchRequestBuilder } from '../12-builder/fetch-request-builder';

class DummyProductsClient {
	private dummyProductsUrlBase = 'https://dummyjson.com/products/';

	async getProduct(productId: number): Promise<DummyProductResponse> {
		const url = this.dummyProductsUrlBase + productId;
		const productResponse = await new FetchRequestBuilder().setUrl(url).exec();
		return productResponse.json();
	}
}

interface DummyProductResponse {
	id: number;
	title: string;
	description: string;
	price: number;
	discountPercentage: number;
	rating: number;
	stock: number;
	brand: string;
	category: string;
	thumbnail: string;
	images: string[];
}

class DummyProductsRestrictingProxy extends DummyProductsClient {
	constructor(private client: DummyProductsClient) {
		super()
	}

	override async getProduct(productId: number): Promise<DummyProductResponse> {
		if (productId >= 10) {
			throw new Error('Access restricted!');
		}
		return this.client.getProduct(productId);
	}
}

async function LogPromiseSynchronously<T>(promise: Promise<T>): Promise<void> {
	await promise.then(response => console.log(response)).catch(err => console.error(err));
}

export async function DummyProductsClientTest() {
	const directClient = new DummyProductsClient();
	const proxyClient = new DummyProductsRestrictingProxy(directClient);
	console.log('1. Request restricted product #10 via direct API client');
	await LogPromiseSynchronously(directClient.getProduct(10));
	console.log('2. Request unrestricted product #9 via API client proxy');
	await LogPromiseSynchronously(proxyClient.getProduct(9));
	console.log('3. Request restricted product #10 via API client proxy');
	await LogPromiseSynchronously(proxyClient.getProduct(10));
	console.log('END OF TEST');
}
