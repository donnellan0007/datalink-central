// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import setToken from '../../../lib/setToken'
import fetchToken from '../../../lib/fetchToken'
import validateToken from '../../../lib/validateSession'
import prisma from '../../../lib/prisma'
import { toNumber } from 'lodash'
import { Data } from '../../../lib/types/types'
import { withSentry } from '@sentry/nextjs'
import validate from '../../../lib/validateFloat'
import updateFlag from '../../../lib/updateFlag'

const handler = async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const body = req.body;
    const { id, token, name, value } = body;
    if (id && token && value) {
        if (await validateToken(toNumber(id), token.toString()) === true) {
            if (await validate(value) === true) {
                try {
                    updateFlag(name, value, id);
                    res.status(200).json({ code: 200, status: `Success` })
                } catch (e) {
                    res.status(500).json({ code: 500, status: `Error` })
                }
            } else {
                res.status(400).json({ code: 400, status: 'Bad Request' })
            }
        } else {
            res.status(400).json({ code: 401, status: 'Unauthorized' })
        }
    } else {
        res.status(400).json({ code: 400, status: 'Bad Request' })
    }
}

export default withSentry(handler)