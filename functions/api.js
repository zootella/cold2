
export function onRequest(context) {//we're given a context object about the incoming request

	var o = {};
	o.requestContext = context;
	o.message = "Hello from this cold2.cc cloudflare pages function!";
	o.secretLength = (context.env.MY_FIRST_SECRET) ? context.env.MY_FIRST_SECRET.length : 0;
	o.version = "Version 2023nov5d";
	o.serverTick = Date.now();

	return Response.json(o);
}
