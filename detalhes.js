document.addEventListener('DOMContentLoaded', async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const countryId = urlParams.get('id');
    
    if (countryId) {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryId}`);
            const countryData = await response.json();
            const country = countryData[0]; 

            document.getElementById('nomeOficial').textContent = country.name.official;
            document.getElementById('bandeira').src = country.flags.png;
            document.getElementById('bandeira').alt = `Bandeira de ${country.name.common}`;
            document.getElementById('capital').textContent = country.capital ? country.capital[0] : 'N/A';
            document.getElementById('continente').textContent = country.continents ? country.continents[0] : 'N/A';
            document.getElementById('lingua').textContent = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
            document.getElementById('moeda').textContent = country.currencies ? Object.values(country.currencies).map(currency => currency.name).join(', ') : 'N/A';
            document.getElementById('populacao').textContent = country.population.toLocaleString();
            document.getElementById('area').textContent = country.area.toLocaleString();
            document.getElementById('mapsLink').href = country.maps.googleMaps;

        } catch (error) {
            console.error('Erro ao buscar dados do país:', error);
            alert('Erro ao buscar dados do país. Por favor, tente novamente mais tarde.');
        }
    } else {
        alert('Nenhum país selecionado!');
        window.location.href = 'index.html';
    }
});
