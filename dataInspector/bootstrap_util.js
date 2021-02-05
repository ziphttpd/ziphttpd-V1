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

var bootstrip_util_seq = 0;

function createTextArea(id, title, value, buttonAttributes) {
	const holder = createElement("div", {class:"input-group"});
	holder.appendChild(createSpan(title, {class:"input-group-text"}));
	const text = createElement("textarea", {id:id, class:"form-control", "aria-label":"With textarea"});
	text.value = value;
	holder.appendChild(text);
	// ボタン
	if (buttonAttributes && typeof(buttonAttributes)=="object") {
		const button_id = `bootstrip_util_id-button_${bootstrip_util_seq}`;
		const button = createElement("input", {id:button_id, type:"button", class:"btn btn-outline-secondary"});
		setAttributes(button, buttonAttributes);
		holder.appendChild(button);
		setAttributes(text, {"aria-describedby": button_id});
	}
	return holder;
}

function createInputText(id, title, value, placeholder, buttonAttributes) {
	const holder = createElement("div", {class:"input-group mb-3"});
	bootstrip_util_seq ++;
	// ラベル
	const temp_id = `bootstrip_util_id-label_${bootstrip_util_seq}`;
	holder.appendChild(createSpan(title, {id:temp_id, class:"input-group-text"}));
	// テキスト
	const text = createElement("input", {id:id, type:"text", class:"form-control", placeholder:placeholder, "aria-label":placeholder, "aria-describedby":temp_id});
	text.value = value;
	holder.appendChild(text);
	// ボタン
	if (buttonAttributes && typeof(buttonAttributes)=="object") {
		const button_id = `bootstrip_util_id-button_${bootstrip_util_seq}`;
		const button = createElement("input", {id:button_id, type:"button", class:"btn btn-outline-secondary"});
		setAttributes(button, buttonAttributes);
		holder.appendChild(button);
		setAttributes(text, {"aria-describedby": button_id});
	}
	return holder;
}
