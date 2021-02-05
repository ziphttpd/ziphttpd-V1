/**
 * Bootstrap5 accordion support
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

function Accordion(id, issort) {
	this.holder = document.querySelector("#" + id);
	this.holder.classList.add("accordion");
	this.issort = issort;
	this.itemIds = [];
};
// ホルダー
Accordion.prototype.Holder = function() {
	return this.holder;
}
// ホルダーID
Accordion.prototype.HolderId = function() {
	return this.holder.id;
}
// アイテムID
Accordion.prototype.ItemId = function(id) {
	const holderId = this.HolderId();
	const itemId = `accordion-item-${holderId}_${id}`;
	return itemId;
}
Accordion.prototype.AddItem = function(id, title, body, data, beforeItem, expand) {
	const itemId = this.ItemId(id);
	const index = this.itemIds.findIndex(elem => elem.id > id);
	if (this.issort && index>=0) {
		beforeItem = this.Item(this.itemIds[index].id);
		this.itemIds.splice(index, 0, {id:id, data:data});
	} else {
		this.itemIds.push({id:id, data:data});
	}
	const item = createAccordionItem(this.holder, id, title, body, beforeItem, expand);
	return item;
}
Accordion.prototype.RemoveItem = function(id) {
	const index = this.itemIds.findIndex(elem => elem.id > id);
	if (index<0) {
		return null;
	}
	this.itemIds.splice(index, 1);
	return this.holder.removeChild(this.Item(id));
}
Accordion.prototype.HasItem = function(id) {
	// TODO: keyIds を使う
	const itemId = this.ItemId(id);
	return document.querySelector("#" + itemId)!=undefined;
}
Accordion.prototype.Item = function(id) {
	const itemId = this.ItemId(id);
	return document.querySelector("#" + itemId);
}
Accordion.prototype.ItemData = function(id) {
	const elem = this.itemIds.find(elem => elem.id = id);
	return elem.data;
}
Accordion.prototype.Body = function(id) {
	const holderId = this.HolderId();
	const bodyId = `accordion-body-${holderId}_${id}`;
	return document.querySelector("#" + bodyId);
}

function createAccordionItem(holder, id, title, body, beforeItem, expand) {
	const holderId = holder.id;

	const itemId = `accordion-item-${holderId}_${id}`;
	const item_attr = {
		id: itemId
		, class: "accordion-item"
	};
	const item = createElement("div", item_attr);

	// ヘッダ部
	const headerId = `accordion-heading-${holderId}_${id}`;
	const h_attr = {class:"accordion-header", id: headerId};
	const header = createElement("h2", h_attr);
	item.appendChild(header);

	// 開閉ボタン
	const collapseId = `accordion-collapse-${holderId}_${id}`;
	const button_attr = {
		class: "accordion-button" + (expand ? "" : " collapsed")
		, type: "button"
		, "data-bs-toggle": "collapse"
		, "data-bs-target": "#" + collapseId
		, "aria-expanded": expand ? true : false
		, "aria-controls": collapseId
	};
	const accordionbutton = createElement("button", button_attr);
	if ("string"==typeof(title)) {
		// タイトルが文字列なら、文字列エレメントとして追加
		accordionbutton.appendChild(document.createTextNode(title));
	} else {
		// タイトルがエレメントなら、そのまま追加
		accordionbutton.appendChild(title);
	}
	header.appendChild(accordionbutton);

	// 開閉部
	const collapse_attr = {
		id: collapseId
		, class: "accordion-collapse collapse" + (expand ? " show" : "")
		, "aria-labelledby": headerId
		, "data-bs-parent": "#" + holderId
	};
	const collapse = createElement("div", collapse_attr);

	// 開閉部コンテンツ
	const bodyId = `accordion-body-${holderId}_${id}`;
	const body_attr = {
		id: bodyId
		, class: "accordion-body"
	};
	const accordionbody = createElement("div", body_attr);
	if (body) {
		accordionbody.appendChild(body);
	}
	collapse.appendChild(accordionbody);
	item.appendChild(collapse);

	// アコーディオンに追加
	holder.insertBefore(item, beforeItem);

	return item;
}
