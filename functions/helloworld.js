
export function onRequest(context) {//we're given a context object about the incoming request
	return new Response("Hello, function cold2b! Version 2023oct23j2");//and must return a Response or a promise of one
}
