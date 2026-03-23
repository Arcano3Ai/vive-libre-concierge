(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})(),((e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports))((()=>{document.addEventListener(`DOMContentLoaded`,async()=>{let e=e=>document.getElementById(e),t=()=>{window.lucide&&window.lucide.createIcons()};window.addEventListener(`scroll`,()=>{let t=window.pageYOffset;document.querySelectorAll(`.parallax-bg`).forEach(e=>{e.style.transform=`translateY(${t*.3}px)`});let n=e(`navbar`);window.scrollY>50?n.classList.add(`scrolled`):n.classList.remove(`scrolled`)});let n=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&e.target.classList.add(`active`)})},{threshold:.1}),r=async()=>{let r=e(`cabin-grid`);if(r)try{let e=await(await fetch(`./cabins_data.json`)).json();r.innerHTML=e.map(e=>{let t=e.images.map(t=>`
          <div class="swiper-slide">
            <img src="${t}" alt="${e.title}" />
          </div>
        `).join(``);return`
          <div class="cabin-card reveal">
            <div class="swiper cabin-swiper" id="swiper-${e.id}">
              <div class="swiper-wrapper">
                ${t}
              </div>
              <div class="swiper-pagination"></div>
              <div class="swiper-button-next"></div>
              <div class="swiper-button-prev"></div>
            </div>
            <div class="cabin-details">
              <span class="price">Desde $${Math.round(e.price).toLocaleString()} MXN</span>
              <h3>${e.title}</h3>
              <div class="cabin-actions">
                <a href="https://wa.me/528121912778?text=Hola,%20quisiera%20información%20sobre%20${e.title}" target="_blank" class="btn-primary">RESERVAR</a>
              </div>
            </div>
          </div>
        `}).join(``),t(),document.querySelectorAll(`.reveal`).forEach(e=>n.observe(e)),e.forEach(e=>{new Swiper(`#swiper-${e.id}`,{loop:!0,pagination:{el:`.swiper-pagination`,clickable:!0},navigation:{nextEl:`.swiper-button-next`,prevEl:`.swiper-button-prev`}})})}catch(e){console.error(`Error loading cabins:`,e)}},i=e(`bot-messages`),a=e(`bot-input`),o=e(`send-bot-msg`),s=e(`bot-window`),c=e(`bot-launcher`),l=e(`close-bot`),u=[],d=(e,t)=>{let n=document.createElement(`div`);return n.className=`msg ${t}`,n.innerHTML=e.replace(/\n/g,`<br>`),i.appendChild(n),i.scrollTop=i.scrollHeight,n},f=async e=>{let t=d(`...`,`bot`);try{let n=await(await fetch(`/api/chat`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({message:e,history:u})})).text();t.innerHTML=n.replace(/\n/g,`<br>`),u.push({role:`user`,text:e},{role:`bot`,text:n})}catch{t.innerText=`He perdido la conexión. Por favor reintente.`}};c&&(c.onclick=()=>s.classList.add(`active`)),l&&(l.onclick=()=>s.classList.remove(`active`)),o&&(o.onclick=()=>{let e=a.value.trim();e&&(d(e,`user`),a.value=``,f(e))}),a&&(a.onkeypress=e=>{e.key===`Enter`&&o.click()}),window.flatpickr&&window.flatpickr(`#date-range`,{mode:`range`,minDate:`today`,dateFormat:`d M, Y`,locale:`es`,onOpen:(e,t,n)=>n.calendarContainer.classList.add(`luxury-picker`)}),r(),(()=>{let t=e(`hero-visual`);if(!t||!window.THREE)return;let n=new THREE.Scene,r=new THREE.PerspectiveCamera(75,t.offsetWidth/t.offsetHeight,.1,1e3);r.position.z=25;let i=new THREE.WebGLRenderer({alpha:!0,antialias:!0});i.setSize(t.offsetWidth,t.offsetHeight),t.appendChild(i.domElement);let a=new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(12,1)),new THREE.LineBasicMaterial({color:15238443,transparent:!0,opacity:.15}));n.add(a);let o=()=>{a.rotation.y+=.005,a.rotation.z+=.002,i.render(n,r),requestAnimationFrame(o)};o()})(),t()})}))();