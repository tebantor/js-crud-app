(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function r(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(n){if(n.ep)return;n.ep=!0;const s=r(n);fetch(n.href,s)}})();const L="/assets/javascript-8dac5379.svg",w="/vite.svg";class y{constructor({id:t,isActive:r,balance:a,avatar:n,firstName:s,lastName:c,gender:m}){this.id=t,this.isActive=r,this.balance=a,this.avatar=n,this.firstName=s,this.lastName=c,this.gender=m}}const g=e=>{const{avatar:t,balance:r,first_name:a,gender:n,id:s,isActive:c,last_name:m}=e;return new y({avatar:t,balance:r,firstName:a,gender:n,id:s,isActive:c,lastName:m})},f=async(e=1)=>{const t=`http://localhost:3001/users?_page=${e}`;return(await(await fetch(t)).json()).map(g)},o={currentPage:0,users:[]},P=async()=>{const e=await f(o.currentPage+1);e.length!==0&&(o.currentPage+=1,o.users=e)},b=async()=>{const e=await f(o.currentPage-1);o.currentPage!==1&&(o.currentPage-=1,o.users=e)},T=e=>{let t=!1;o.users=o.users.map(r=>r.id===e?(t=!0,e):r),o.users.length<10&&!t&&o.users.push(e)},$=async()=>{const e=await f(o.currentPage);if(e.length===0){await b();return}o.users=e},l={loadNextPage:P,loadPreviousPage:b,onUserChanged:T,reloadPage:$,getUsers:()=>[...o.users],getCurrentPage:()=>o.currentPage},S=`<div class="modal-dialog">\r
    <form novalidate>\r
        <span>User</span>\r
        <input type="text" name="firstName" placeholder="First Name" />\r
        <input type="text" name="lastName" placeholder="Last Name" />\r
        <input type="number" name="balance" placeholder="Balance" />\r
\r
        <div>\r
            <input type="checkbox" id="is-active" name="isActive" checked/>\r
            <label for="is-active">is active?</label>\r
        </div>\r
\r
        <button type="submit">\r
            Save\r
        </button>\r
\r
    </form>\r
\r
</div>\r
`;const E=async e=>{const t=`http://localhost:3001/users/${e}`,a=await(await fetch(t)).json();return g(a)};let i,d,p={};const N=async e=>{if(i==null||i.classList.remove("hide-modal"),p={},!e)return;const t=await E(e);A(t)},v=()=>{i==null||i.classList.add("hide-modal"),d==null||d.reset()},A=e=>{d.querySelector('[name="firstName"]').value=e.firstName,d.querySelector('[name="lastName"]').value=e.lastName,d.querySelector('[name="balance"]').value=e.balance,d.querySelector('[name="isActive"]').checked=e.isActive,p=e},U=(e,t)=>{i||(i=document.createElement("div"),i.innerHTML=S,i.className="modal-container hide-modal",d=i.querySelector("form"),i.addEventListener("click",r=>{r.target.className==="modal-container"&&v()}),d.addEventListener("submit",async r=>{r.preventDefault();const a=new FormData(d),n={...p};for(const[s,c]of a){if(s==="balance"){n[s]=Number(c);continue}if(s==="isActive"){n[s]=c==="on";continue}n[s]=c}await t(n),v()}),e.append(i))},x=async e=>{const t=`http://localhost:3001/users/${e}`,a=await(await fetch(t,{method:"DELETE"})).json();return console.log({deleteResult:a}),!0};let u;const M=()=>{const e=document.createElement("table"),t=document.createElement("thead");t.innerHTML=`
        <tr>
            <th>#ID</th>
            <th>Balance</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Active</th>
            <th>Actions</th>
        </tr>
    `;const r=document.createElement("tbody");return e.append(t,r),e},B=e=>{const t=e.target.closest(".select-user");if(!t)return;const r=t.getAttribute("data-id");N(r)},H=async e=>{const t=e.target.closest(".delete-user");if(!t)return;const r=t.getAttribute("data-id");try{await x(r),await l.reloadPage(),document.querySelector("#current-page").innerText=l.getCurrentPage(),h()}catch(a){console.log(a),alert("No se pudo eliminar")}},h=e=>{const t=l.getUsers();u||(u=M(),e.append(u),u.addEventListener("click",B),u.addEventListener("click",H));let r="";t.forEach(a=>{r+=`
            <tr>
                <td>${a.id}</td>
                <td>${a.balance}</td>
                <td>${a.firstName}</td>
                <td>${a.lastName}</td>
                <td>${a.isActive}</td>
                <td>
                    <a href="#" class="select-user" data-id="${a.id}">Select</a>
                    |
                    <a href="#" class="delete-user" data-id="${a.id}">Delete</a>
                </td>
            </tr>
        `}),u.querySelector("tbody").innerHTML=r};const q=e=>{const t=document.createElement("button");t.innerText="Next >";const r=document.createElement("button");r.innerText="< Prev";const a=document.createElement("span");a.id="current-page",a.innerText=l.getCurrentPage(),e.append(r,a,t),t.addEventListener("click",async()=>{await l.loadNextPage(),a.innerText=l.getCurrentPage(),h(e)}),r.addEventListener("click",async()=>{await l.loadPreviousPage(),a.innerText=l.getCurrentPage(),h(e)})};const j=e=>{const t=document.createElement("button");t.innerText="+",t.className="fab-button",e.append(t),t.addEventListener("click",()=>{N()})},C=e=>{const{avatar:t,balance:r,firstName:a,gender:n,id:s,isActive:c,lastName:m}=e;return{avatar:t,balance:r,first_name:a,gender:n,id:s,isActive:c,last_name:m}},O=async e=>{const t=new y(e);if(!t.firstName||!t.lastName)throw"First & Last name are required";const r=C(t);let a;return t.id?a=await D(r):a=await k(r),g(a)},k=async e=>{const a=await(await fetch("http://localhost:3001/users",{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}})).json();return console.log({newUser:a}),a},D=async e=>{const t=`http://localhost:3001/users/${e.id}`,a=await(await fetch(t,{method:"PATCH",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}})).json();return console.log({updatedUser:a}),a},F=async e=>{e.innerHTML="Loading...",await l.loadNextPage(),e.innerHTML="",h(e),q(e),j(e),U(e,async t=>{const r=await O(t);l.onUserChanged(r),h()})};document.querySelector("#app").innerHTML=`
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${w}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${L}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
    
    </div>
  </div>
`;const _=document.querySelector(".card");F(_);
