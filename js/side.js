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

hljs.initHighlightingOnLoad();

function googleTranslateElementInit() {
  const layout = google.translate.TranslateElement.InlineLayout.VERTICAL;
  new google.translate.TranslateElement(
    { pageLanguage: navigator.language, layout: layout },
    "google_translate_element"
  );
}

// TODO: fetch API を使うべき？
wget("toc.json")
  .then((info) => {
    const result = info.result;
    const holder = document.getElementById("toc");
    const tocsobj = JSON.parse(result);
    //	alert(result + location.pathname);
    const base = location.pathname.split("/", 4).join("/") + "/";
    const version = tocsobj.version;
    const copyright = tocsobj.copyright;
    if (document.readyState === "loading") {
      window.addEventListener("DOMContentLoaded", (e) => {
        const verElem = document.querySelector(".version");
        if (verElem) verElem.innerHTML = version;
        const verCopyright= document.querySelector(".copyright");
        if (verCopyright) verCopyright.innerHTML = copyright;
        if (holder) createToc(holder, tocsobj, base);
        linkRewriter(tocsobj, base);
      });
    } else {
      const verElem = document.querySelector(".version");
      if (verElem) verElem.innerHTML = version;
      const verCopyright= document.querySelector(".copyright");
      if (verCopyright) verCopyright.innerHTML = copyright;
      if (holder) createToc(holder, tocsobj, base);
      linkRewriter(tocsobj, base);
    }
  })
  .catch((info) => {
    console.log(info.result);
  });
