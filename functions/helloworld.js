
export function onRequest(context) {//we're given a context object about the incoming request
	return new Response("Hello, function cold2!");//and must return a Response or a promise of one
}
