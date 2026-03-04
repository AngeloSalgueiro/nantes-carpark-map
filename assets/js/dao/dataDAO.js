"use strict"
import { data } from "../data/data.js"

export const dataDAO = {

    findAll: async () => {
        try {
            return await data()
        } catch (error) {
            throw error
        }
    },

    find: async (name) => {
        try {
            if (!name || name == "") {
                return dataDAO.findAll()
            }

            const result = await data()

            return result.filter((e) => e.nom.toUpperCase().includes(name.trim().toUpperCase()))
        } catch (error) {
            throw error
        }
    },
}