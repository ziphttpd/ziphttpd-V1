(function() {
	function callback(info) {
		console.log(info.api + '(' + info.items + ") : " + info.result);
	//	console.log(info);
	};
	function onerror(error) {
		console.log(error);
	};

	const zh = new ZHAPI('apitest');
	zh.Noop()
	.then(function(info, result) {
		callback(info, result);
		return zh.List();
	}).then(function(info, result) {
		callback(info, result);
		return zh.Write({item1: 'writedata1'});
	}).then(function(info) {
		callback(info);
		return zh.List();
	}).then(function(info) {
		callback(info);
		return zh.Read(['item1', 'item2']);
	}).then(function(info) {
		callback(info);
		return zh.Write({item2: 'writedata2'});
	}).then(function(info) {
		callback(info);
		return zh.Write({item3: 'writedata3'});
	}).then(function(info) {
		callback(info);
		return zh.List();
	}).then(function(info) {
		callback(info);
		let raw = JSON.parse(info.result);
		return zh.Read(raw);
	}).then(function(info) {
		callback(info);
		return zh.Delete(['item1']);
	}).then(function(info) {
		callback(info);
		return zh.List();
	}).then(function(info) {
		callback(info);
		return zh.Delete(['item1', 'item2']);
	}).then(function(info) {
		callback(info);
		return zh.List();
	}).then(function(info) {
		callback(info);
		let raw = JSON.parse(info.result);
		return zh.Delete(raw);
	}).then(function(info) {
		callback(info);
		return zh.List();
	}).then(function(info) {
		callback(info);
	}).catch(function(error) {
		onerror(error);
	});
})();
