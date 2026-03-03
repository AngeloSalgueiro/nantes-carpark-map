async function getData() {
    const limit = 100
    const url = "https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/512042839_composteurs-quartier-nantes-metropole/records?limit=" + limit

    try {
        const reponse = await fetch(url)
        const result = await reponse.json()

        const count = result.total_count / limit
        let data = result.results
        for (let i = 1; i < count; i += 1) {
            const reponse = await fetch(url + "&offset=" + i * limit)
            console.log(url + "&offset=" + i * limit)
            if (!reponse.ok) {
                throw new Error(`Statut de réponse : ${reponse.status}`);
            }

            const result = await reponse.json();
        }

        console.log(typeof data)

        return data

    } catch (error) {
        throw error
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const map = L.map('map').setView([47.21725, -1.55336], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    try {
        const data = await getData()

        data.forEach((element) => {
            const marker = L.marker([element.location.lat, element.location.lon]).addTo(map);

            marker.bindPopup(element.nom).openPopup();

        });

    } catch (error) {
        console.log(error)
    }
})