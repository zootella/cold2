
export function onRequest(context) {//we're given a context object about the incoming request

	var o = {};
	o.requestContext = context;
	o.message = "Hello from this cold2.cc cloudflare pages function!";
	o.version = "Version 2023oct25a";
	o.serverTick = Date.now();

	return Response.json(o);
}
