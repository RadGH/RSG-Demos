import{G as a}from"./game-BIPbtpcd.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&c(s)}).observe(document,{childList:!0,subtree:!0});function d(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function c(e){if(e.ep)return;e.ep=!0;const t=d(e);fetch(e.href,t)}})();const n=document.getElementById("game");n.style.position="absolute";n.style.inset="0";n.width=window.innerWidth;n.height=window.innerHeight;const r=document.getElementById("ui-root");r.style.position="absolute";r.style.inset="0";r.style.pointerEvents="none";const l=new a(n,r);l.init().then(()=>{l.start()}).catch(i=>{console.error("Game initialization failed:",i);const o=document.getElementById("loading-screen");o&&(o.innerHTML=`
      <div style="text-align:center;color:#e74c3c">
        <h2 style="margin-bottom:12px">Failed to load</h2>
        <p style="color:#8890b0;font-size:14px">${i.message}</p>
        <button onclick="location.reload()" style="margin-top:20px;padding:8px 20px;background:#f5c842;color:#0d0f1a;border:none;border-radius:6px;cursor:pointer;font-size:14px">
          Retry
        </button>
      </div>
    `)});
