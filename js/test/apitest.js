(function() {
	function callback(info) {
		console.log(info.api + '(' + info.items + ") : " + info.result);
		if (info.error) {
			console.log("    error : " + info.error);
		}
	};

	const zh = new ZHAPI('apitest');
	zh.Noop()
	.then(function(info) {
		// noop({}) : null
		callback(info);
		return zh.List();
	}).then(function(info) {
		// list({}) : []
		callback(info);
		return zh.Write({"item1": 'writedata1'});
	}).then(function(info) {
		// write({"item1":"writedata1"}) : ["item1"]
		callback(info);
		return zh.List();
	}).then(function(info) {
		// list({}) : ["item1"]
		callback(info);
		return zh.Read(['item1', 'item2']);
	}).then(function(info) {
		// read(["item1","item2"]) : {"item1":"writedata1", "item2":""}
		callback(info);
		return zh.Write({'item2': 'writedata2', 'item3': 'writedata3'});
	}).then(function(info) {
		// write({"item2":"writedata2","item3":"writedata3"}) : ["item2", "item3"]
		callback(info);
		return zh.List();
	}).then(function(info) {
		// list({}) : ["item1", "item2", "item3"]
		callback(info);
		return zh.Read(info.decoded);
	}).then(function(info) {
		// read(["item1","item2","item3"]) : {"item1":"writedata1", "item2":"writedata2", "item3":"writedata3"}
		callback(info);
		return zh.Delete(['item1']);
	}).then(function(info) {
		// delete(["item1"]) : ["item1"]
		callback(info);
		return zh.List();
	}).then(function(info) {
		// list({}) : ["item2", "item3"]
		callback(info);
		return zh.Delete(['item1', 'item2']);
	}).then(function(info) {
		// delete(["item1","item2"]) : ["item2"]
		callback(info);
		return zh.List();
	}).then(function(info) {
		// list({}) : ["item3"]
		callback(info);
		return zh.Delete(info.decoded);
	}).then(function(info) {
		// delete(["item3"]) : ["item3"]
		callback(info);
		return zh.List();
	}).then(function(info) {
		// list({}) : []
		callback(info);
	}).catch(function(info) {
		callback(info);
	});
})();
