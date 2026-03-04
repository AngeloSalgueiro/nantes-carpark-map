"use strict"
const limit = 100
const url = "https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/512042839_composteurs-quartier-nantes-metropole/records?limit=" + limit

export const dataDAO = {

    findAll : async () => {
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
            
            return data

        } catch (error) {
            throw error
        }
    }
}