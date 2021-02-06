/**
 * ユーティリティです。
 * jQuery その他のフレームワークとの共存を図るため、バニラでの実装です。
 *
 * 【ライセンス】
 *	The MIT License
 *	Copyright (c) <2021> <copyright ZipHttpd.com>
 *	以下に定める条件に従い、本ソフトウェアおよび関連文書のファイル（以下「ソフトウェア」）の複製を取得するすべての人に対し、ソフトウェアを無制限に扱うことを無償で許可します。
 *	これには、ソフトウェアの複製を使用、複写、変更、結合、掲載、頒布、サブライセンス、および/または販売する権利、およびソフトウェアを提供する相手に同じことを許可する権利も無制限に含まれます。
 *	上記の著作権表示および本許諾表示を、ソフトウェアのすべての複製または重要な部分に記載するものとします。
 *	ソフトウェアは「現状のまま」で、明示であるか暗黙であるかを問わず、何らの保証もなく提供されます。
 *	ここでいう保証とは、商品性、特定の目的への適合性、および権利非侵害についての保証も含みますが、それに限定されるものではありません。 
 *	作者または著作権者は、契約行為、不法行為、またはそれ以外であろうと、ソフトウェアに起因または関連し、あるいはソフトウェアの使用またはその他の扱いによって生じる一切の請求、損害、その他の義務について何らの責任も負わないものとします。
 */
"use strict";

// wget
function wget(url) {
	return new Promise(function (callback, onerror) {
		const xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
				const info = {
					result: xhr.response,
					request: xhr
				};
				switch (xhr.status) {
					case 200:	// OK
						try {
							callback(info);
						} catch (e) {
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
		xhr.send();
	});
}


// 目次作成
function createToc(holder, tocsobj, base) {
	const iam = location.pathname.substr(base.length);
	const filesdic = tocsobj.files;
	const tocs = tocsobj.tocs;
	holder.classList.add("toc");
	const makelink = (file, toc) => {
		// toc : {"file": "index", "anchor":"", "text": "概要"}
		file = ((file===iam) ? "" : file) + "#";
		const a = document.createElement("a");
		a.setAttribute("href", file + toc.anchor);
		a.appendChild(document.createTextNode(toc.text));
		return a;
	};
	tocs.forEach(block => {
		// ファイル
		const file = filesdic[block.file];
		// トビック
		const toc = document.createElement("div");
		toc.classList.add("toc_h2");
		toc.appendChild(makelink(file, block.topic));
		toc.appendChild(document.createElement("br"));
		holder.appendChild(toc);
		if (block.chapter) {
			// チャプター
			block.chapter.forEach(toc => {
				const subtoc = document.createElement("div");
				subtoc.classList.add("toc_h3");
				subtoc.appendChild(makelink(file, toc));
				subtoc.appendChild(document.createElement("br"));
				holder.appendChild(subtoc);
			});
		}
	});
}

// ハイパーリンクチェック
function linkCheck() {
	const outerlink = [];
	const anames = document.querySelectorAll("a[name]");
	const names = {"#":""};
	anames.forEach(aname => {
		const name = "#"+aname.name;
		if (names[name]) {
			console.log("!!!!! duplicate name: " + name);
			console.log("    " + aname.outerHTML);
			console.log("    " + names[name].outerHTML);
		}
		names[name] = aname;
	});
	const ahrefs = document.querySelectorAll("a[href]");
	ahrefs.forEach(ahref => {
		const href = decodeURI(ahref.href);
		const elems = href.split("#");
		if (elems.length==1) {
			// 外部リンク
			outerlink.push(href);
			return;
		}
		if (! elems[0].endsWith(location.pathname)) {
			// 外部リンク
			outerlink.push(href);
			return;
		}
		if (! names.hasOwnProperty("#"+elems[1])) {
			console.log("!!!!! missing href: " + href);
			console.log("    " + ahref.outerHTML);
		}
	});
	return outerlink;
}
