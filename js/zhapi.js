/**
 * ZipHttpd-API へのアクセス用クラスのリファレンス実装です。
 * jQuery その他のフレームワークとの共存を図るため、バニラでの実装です。
 *
 * 【ライセンス】
 *	The MIT License
 *	Copyright (c) <2020> <copyright ZipHttpd.com>
 *	以下に定める条件に従い、本ソフトウェアおよび関連文書のファイル（以下「ソフトウェア」）の複製を取得するすべての人に対し、ソフトウェアを無制限に扱うことを無償で許可します。
 *	これには、ソフトウェアの複製を使用、複写、変更、結合、掲載、頒布、サブライセンス、および/または販売する権利、およびソフトウェアを提供する相手に同じことを許可する権利も無制限に含まれます。
 *	上記の著作権表示および本許諾表示を、ソフトウェアのすべての複製または重要な部分に記載するものとします。
 *	ソフトウェアは「現状のまま」で、明示であるか暗黙であるかを問わず、何らの保証もなく提供されます。
 *	ここでいう保証とは、商品性、特定の目的への適合性、および権利非侵害についての保証も含みますが、それに限定されるものではありません。 
 *	作者または著作権者は、契約行為、不法行為、またはそれ以外であろうと、ソフトウェアに起因または関連し、あるいはソフトウェアの使用またはその他の扱いによって生じる一切の請求、損害、その他の義務について何らの責任も負わないものとします。
 */

function ZHAPI(holder) {
	this.holder = holder;
	this.version = "1";
};

ZHAPI.prototype.Api = function(api, data) {
	const param = {
		api: api,
		holder: this.holder,
		items: data,
		version: this.version,
	};
	return new Promise(function(callback, onerror) {
		const xhr = new XMLHttpRequest();
		const localToken = window.localStorage.token;
		const sessionToken = window.sessionStorage.token;
		const token = sessionToken ? sessionToken : localToken;
		const zhapilogin = function(redirectto) {
			document.write("<form name='zhapilogin'><input type='text' name='redirectto' value='" + redirectto + "'></form>");
			var f = document.forms["zhapilogin"];
			f.method = "POST";
			f.action = "/login";
			f.submit();
		};
		const form  = new FormData();
		form.append('data', JSON.stringify(param));

		xhr.open("POST", "/api", true);
		xhr.setRequestHeader('X-Requested-With', token);
		xhr.onreadystatechange = function() {
			if (xhr.readyState==4) {
				const info = {
					api: param.api,
					holder: param.holder,
					version: param.version,
					items: JSON.stringify(param.items),
					result: xhr.response,
					request: xhr
				};
				switch ( xhr.status ) {
				case 401:	// Unauthorized
					zhapilogin(location.pathname);
					break;

				case 200:	// OK
					try {
						try {
							if (info.result) {
								info.decoded = JSON.parse(info.result);
							}
						} catch (error) {
							info.error = error;
						}
						callback(info);
					} catch(e) {
						info.error = e;
						onerror(info);
					}
					break;

				default:
					onerror(info);
					break;
				}
			}
		};

		xhr.send(form);
	});
};

ZHAPI.prototype.Noop = function() {
	return this.Api('noop', {});
}

ZHAPI.prototype.List = function() {
	return this.Api('list', {});
}

ZHAPI.prototype.Write = function(data) {
	return this.Api('write', data);
}

ZHAPI.prototype.Read = function(data) {
	return this.Api('read', data);
}

ZHAPI.prototype.Delete = function(data) {
	return this.Api('delete', data);
}

ZHAPI.prototype.Dirs = function() {
	return this.Api('dirs', {});
}
