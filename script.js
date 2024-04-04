const apiUrl ='https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
   //fetch data using .then
   fetch(apiUrl)
   .then(response => response.json())
   .then(data => renderTable(data));
    
   //fetch using async/await
   async function fetchData(){
    const response = await fetch(apiUrl);
    const data = await response.json();
    renderTable(data);
   }

   async function renderTable(data){
     const cryptoBody = document.getElementById('cryptoBody');
     cryptoBody.innerHTML= '';
     data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML =`
        <td>${item.name}</td>
        <td>${item.symbol}</td>
        <td>${item.current_price}</td>
        <td>${item.total_volume}</td>
        <td><img src = "${item.image}" alt="${item.name}"</td>
        `;
        cryptoBody.appendChild(row);
     });

            function search(){
            const searchValue = document.getElementById('search').ariaValueMax.toLowerCase();
            const rows = document.querySelectorAll('#cryptoBody tr');
            rows.forEach(row=>{
                const name = row.cells[0].innerText.toLowerCase();
                if(name.includes(searchValue)){
                    row.style.display = ''
                }else{
                    row.style.display = 'none';
                    
                }
            })

            }
            function sort(){
                const rows = Array.from(document.querySelectorAll('#cryptoBody tr'));
                rows.sort((a, b) => {
                  const marketCapA = parseFloat(a.cells[4].innerText.replace(/[^0-9.-]+/g, ''));
                  const marketCapB = parseFloat(b.cells[4].innerText.replace(/[^0-9.-]+/g, ''));
                  return marketCapA - marketCapB;
                });
                const cryptoBody = document.getElementById('cryptoBody');
                rows.forEach(row => cryptoBody.appendChild(row));
            }
                 }           