
export function onRequest(context) {//we're given a context object about the incoming request


	let i = context.request.headers.entries();
	let o = {};
	let duplicate = false;
	for (const [k, v] of i) {
		if (!o[k])
			o[k] = v;
		else
			duplicate = true;
	}

	let o2 = {};
	o2.requestContext = context;
	o2.message = "Hello from this cold2.cc cloudflare pages function!";
	o2.secretLength = (context.env.MY_FIRST_SECRET) ? context.env.MY_FIRST_SECRET.length : 0;
	o2.version = "Version 2024jan9d";
	o2.serverTick = Date.now();
	o2.headers = o;
	o2.headersDuplicate = duplicate;

	return Response.json(o2);
}
