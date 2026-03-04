"use strict"
import { dataDAO } from "./dao/dataDAO.js";

document.addEventListener("DOMContentLoaded", async () => {
    const map = L.map('map', { zoomControl: false }).setView([47.21725, -1.55336], 13);
    const markerGroup = L.layerGroup().addTo(map);

    L.control.zoom({
        position: 'bottomright'
    }).addTo(map);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    try {
        const data = await dataDAO.findAll()

        data.forEach((element) => {
            const marker = L.marker([element.location.lat, element.location.lon]).addTo(markerGroup);

            marker.bindPopup("<h3>" + element.nom + "</h3>" + "<br>" + element.adresse).openPopup();

        });

    } catch (error) {
        console.log(error)
    }

    const submit = document.querySelector(".search")
    const input = document.querySelector('input[name="search"]')

    submit.addEventListener("click", async (e) => {

        console.log(input.value)
        if (input.value || input.value != "") {
            markerGroup.clearLayers()

            try {
                const data = await dataDAO.find(input.value)

                data.forEach((element) => {
                    const marker = L.marker([element.location.lat, element.location.lon]).addTo(markerGroup);

                    marker.bindPopup("<h3>" + element.nom + "</h3>" + "<br>" + element.adresse).openPopup();

                });

            } catch (error) {
                console.log(error)
            }
        }
    })
})