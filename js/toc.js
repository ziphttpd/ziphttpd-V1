'use strict';

// 目次作成
function createToc(holder, tocsobj, base) {
	const iam = location.pathname.substr(base.length);
	const filesdic = tocsobj.files;
	const tocs = tocsobj.tocs;
	holder.classList.add("toc");
	const makelink = toc => {
		// toc : {"file": "index", "anchor":"", "text": "概要"}
		let file = filesdic[toc.file];
		file = ((file===iam) ? "" : file) + "#";
		const a = document.createElement("a");
		a.setAttribute("href", file + toc.anchor);
		a.appendChild(document.createTextNode(toc.text));
		return a;
	};
	tocs.forEach(block => {
		// トビック
		const toc = document.createElement("div");
		toc.classList.add("toc_h2");
		toc.appendChild(makelink(block.topic));
		toc.appendChild(document.createElement("br"));
		holder.appendChild(toc);
		if (block.chapter) {
			// チャプター
			block.chapter.forEach(toc => {
				const subtoc = document.createElement("div");
				subtoc.classList.add("toc_h3");
				subtoc.appendChild(makelink(toc));
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
