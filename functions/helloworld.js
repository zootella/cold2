
export function onRequest(context) {//we're given a context object about the incoming request
	return new Response("Hello, world! Version 2023oct22b.");//and must return a Response or a promise of one
}
