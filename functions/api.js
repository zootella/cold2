
export function onRequest(context) {//we're given a context object about the incoming request

	var s = JSON.stringify(context);

	var o = {};
	o.message = "Hello, API!";
	o.version = "Version 2023oct23k4";
	o.serverTick = Date.now();
	o.requestContext = context;

	return Response.json(o);
}




