
import { productCountArgs, productFindManyArgs } from "../../generated/prisma/models/product";
import { prisma } from "../../lib/prisma";

export class productController {

    /**
     * Créer un produit
     * @param ref 
     * @param name 
     * @param manufacturer 
     * @param quantity 
     */
    public async createProduct(ref: string, name: string, manufacturer: string, quantity: number) {
        await prisma.product.create({
            data: {
                ref: ref,
                name: name,
                manufacturer: manufacturer,
                quantity: quantity,
            }
        })

    }

    /**
     * Récupère le nombre de produits correspondant à la recherche et 12 produits en fonction de la pagination.
     * Peut filtrer les résultats en fonction du nom ou de la ref.
     * @param page - pagination
     * @param name 
     * @param ref 
     * @param sort - Trie les résultats en fonction de la quantité
     * @returns 
     */
    public async getProducts(page: number, name: string, ref: string, sort: string) {

        let params: productFindManyArgs = {};

        params.skip = page * 12;
        params.take = 12;

        let where = {
            name: {
                contains: name
            },
            ref: {
                contains: ref
            }
        }

        let orderBy = {};

        switch (sort) {
            case "asc":
                orderBy = {
                    quantity: 'asc'
                }
                break;
            case "desc":
                orderBy = {
                    quantity: 'desc'
                }
                break;

            default:
                break;
        }

        params.where = where;
        params.orderBy = orderBy;



        let countParams: productCountArgs = {};

        countParams.where = where;

        try {
            return { count: await prisma.product.count(countParams), products: await prisma.product.findMany(params) }

        } catch (error) {
            return error
        }

    }


    public async getUniqueProduct(ref: string) {
        try {
            return await prisma.product.findUnique({ where: { ref: ref } })
        } catch (error) {
            return (error)
        }
    }

    public async updateProduct(oldRef: string, newRef: string, name: string, manufacturer: string, quantity: number) {
        try {
            await prisma.product.update({
                where: { ref: oldRef },
                data: {
                    ref: newRef,
                    name: name,
                    manufacturer: manufacturer,
                    quantity: quantity,
                }
            })
            return ("succès")
        } catch (error) {
            return error
        }
    }

    public async deleteProduct(ref: string) {
        try {
            await prisma.product.delete({ where: { ref: ref } })
        } catch (error) {
            return error
        }
    }
}
