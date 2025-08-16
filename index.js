import{a as u,S as f,i as a}from"./assets/vendor-BK_rxH-O.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const p="51729967-cf115d8e1e17df6f8ee5ef85d",m="https://pixabay.com/api/";async function y(s){return(await u.get(m,{params:{key:p,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0}})).data}const l=document.querySelector(".gallery"),d=document.querySelector(".loader");let h=new f(".gallery a");function g(s){const o=s.map(t=>`
    <li>
      <a href="${t.largeImageURL}">
        <img src="${t.webformatURL}" alt="${t.tags}" />
      </a>
      <div class="info">
        <p>Likes: ${t.likes}</p>
        <p>Views: ${t.views}</p>
        <p>Comments: ${t.comments}</p>
        <p>Downloads: ${t.downloads}</p>
      </div>
    </li>`).join("");l.insertAdjacentHTML("beforeend",o),h.refresh()}function L(){l.innerHTML=""}function w(){d.classList.remove("hidden")}function c(){d.classList.add("hidden")}const b=document.querySelector(".form");b.addEventListener("submit",async s=>{s.preventDefault();const o=s.target.elements["search-text"].value.trim();if(!o){a.warning({message:"Please enter a search term!",position:"topRight"});return}L(),w();try{const{hits:t}=await y(o);if(c(),t.length===0){a.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}g(t)}catch{c(),a.error({message:"Something went wrong. Try again later.",position:"topRight"})}});
//# sourceMappingURL=index.js.map
