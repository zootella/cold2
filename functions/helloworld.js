
export function onRequest(context) {//we're given a context object about the incoming request

	var s = JSON.stringify(context);

	var o = {};
	o.message = "Hello, function!";
	o.version = "Version 2023oct23i3";
	o.serverTick = Date.now();

	return Response.json(o);
}




/*


these work:

export function onRequest(context) {//we're given a context object about the incoming request
	return new Response("Hello, function world! Version 2023oct23i2");//and must return a Response or a promise of one
}

*/
