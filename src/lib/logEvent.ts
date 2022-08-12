import prisma from './prisma'
import { toInteger } from 'lodash'

/**
 * Logs an event to {@link prisma} model Log.
 * @param {Number} id - Id of the user.
 * @param {string} type - Type of the event.
 * @param {string} trace - Trace of the event.
 * @param {string} error_message - Error message of the event.
 * @returns {String} 
 */
async function main(id: Number, type: string, trace: string, error_message: string) {
    await prisma.log.create({
        data: {
            assocId: toInteger(id),
            trace: trace,
            type: type,
            message: error_message
        }
    })
}

export default main