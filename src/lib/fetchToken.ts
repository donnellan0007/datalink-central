import prisma from './prisma'
import { toNumber } from 'lodash'

/**
 * Fetches a token from {@link prisma} model User.
 * @param {Number} id - Id of the user.
 * @param {Boolean} debug - If true, returns null if no token is found.
 * @returns {String} 
 */
async function get(id: Number, debug?: Boolean) {
    let data = await prisma.user.findUnique({
        where: {
            id: toNumber(id)
        }
    })
    
    if (data) {
        return data.token
    } else if (!data) {
        if (!debug) {
        return 'No token found for this user!'
        } else if (debug === true) {
            return null
        }
    } else {
        return data
    }
}


async function test() {

    console.log(await prisma.user.findMany())
    console.log(await get(1))

}


// test()

export default get