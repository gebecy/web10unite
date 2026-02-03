// onionring.js is made up of four files - onionring-widget.js (this one!), onionring-index.js, onionring-variables.js and onionring.css
// it's licensed under the cooperative non-violent license (CNPL) v4+ (https://thufie.lain.haus/NPL.html)
// it was originally made by joey + mord of allium (蒜) house, last updated 2020-11-24

// === ONIONRING-WIDGET ===
//this file contains the code which builds the widget shown on each page in the ring. ctrl+f 'EDIT THIS' if you're looking to change the actual html of the widget
var tag = document.getElementById(ringID);

const shadow = tag.attachShadow({ mode: "open" });

thisSite = window.location.href;
thisIndex = null;

/* ======================
   ここは普通のJS処理
====================== */

// URL正規化
function getDomain(url) {
  return normalizeUrl(url).split("/")[0];
}

try {
  var thisDomain = getDomain(thisSite);
  for (var i = 0; i < sites.length; i++) {
    if (thisDomain === getDomain(sites[i].url)) {
      thisIndex = i;
      break;
    }
  }
} catch (e) {}

let html = "";

/* ======================
   HTMLを組み立てる
====================== */

if (thisIndex == null) {
  html = `
  <table>
    <tr><td>Web1.0同盟登録中…</td></tr>
  </table>
  `;
} else {
  previousIndex = thisIndex - 1 < 0 ? sites.length - 1 : thisIndex - 1;
  nextIndex = thisIndex + 1 >= sites.length ? 0 : thisIndex + 1;

  const indexText = useIndex
    ? `<a href="${indexPage}" target="_blank">ﾘｽﾄ</a>`
    : "";

  const randomText = useRandom ? `<a href="#" id="randomBtn">ﾗﾝﾀﾞﾑ</a>|` : "";

  html = `
  <table>
    <tr>
      <td class="webring-prev"><a href="${sites[previousIndex].url}">&lt;</a></td>
      <td class="webring-info">
        <a href="https://gebecy.github.io/web10unite/index.html" class="ringName" target="_blank">${ringName}</a><br>
        <span class="webring-links">
          ${randomText}
          ${indexText}
        </span>
      </td>
      <td class="webring-next"><a href="${sites[nextIndex].url}">&gt;</a></td>
    </tr>
  </table>
  `;
}

shadow.innerHTML = `
<style>
/* onionring.js is made up of four files - onionring-widget.js, onionring-index.js, onionring-variables.js and onionring.css (this one!)
// it's licensed under the cooperative non-violent license (CNPL) v4+ (https://thufie.lain.haus/NPL.html)
// it was originally made by joey + mord of allium (蒜) house, last updated 2020-10-24 */

/* === ONIONRING.CSS === */
/* this file affects the style of the widget. remember to replace all instances of #web1_0 with whatever value you have for ringID in the onionring-widget.js file. make sure it still has the # at the front, though! probably easiest to use find+replace to do it */

:host{
  display: inline-block;
  margin: 0 auto;
  padding: 3px; /* creates some space around the widget */
}

table {
  display: inline-block; /* ← 横並びの核心 */
  vertical-align: middle;

  border-collapse: collapse;
  border-spacing: 0;

  font-family: "MS UI Gothic", "ＭＳ ゴシック", monospace;
  font-size: 14px;

  background: #c0c0c0;
  border: 3px ridge #fff;
  height: 45px;
  margin: 2px;
}
.webring-prev a {
  text-align: center;
}
.webring-next a {
  text-align: center;
}
.webring-prev a,
.webring-next a {
  display: table-cell;
  width: 26px;
  height: 35px;
  background: #e0e0e0;
  border: 2px outset #fff;
  color: black;
  text-decoration: none;
  font-weight: bold;
  vertical-align: middle;
}
.ringName {
  font-size: 14px;
  text-decoration: none;
  color: #000;
}
.webring-prev a:active,
.webring-next a:active {
  border: 2px inset #fff;
}

.webring-info {
  padding: 0 10px;
  background: #dcdcdc;
  line-height: 1.3;
}

.webring-links a {
  color: blue;
  text-decoration: none;
  font-size: 11px;
  font-weight: bold;
  margin: 0 3px;
}

.webring-links a:hover {
  color: red;
}

.webring-info {
  letter-spacing: 0.5px;
}
:host(.dark) table {
  background: #111;
  border: 2px solid #00ff00;
  color: #00ff00;
}

:host(.dark) .webring-info {
  background: #000;
}

:host(.dark) .webring-prev a,
:host(.dark) .webring-next a {
  background: #001100;
  border: 1px solid #00ff00;
  color: #00ff00;
}
:host(.dark) .webring-links a {
  color: rgb(0, 255, 255);
}
:host(.dark) .ringName {
  color: #00ff00;
}
</style>

${html}
`;

const btn = shadow.getElementById("randomBtn");
if (btn) {
  btn.addEventListener("click", () => {
    const otherSites = sites.slice();
    otherSites.splice(thisIndex, 1);
    location.href =
      otherSites[Math.floor(Math.random() * otherSites.length)].url;
  });
}
