import { Artwork } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

type Data = {
    results: Artwork[]
}

type Error = {
    error: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | Error>
) {
    res.status(500).json({ error: 'This endpoint is not yet implemented' })
    /* {
        const query = req.query.q

        if (!query) {
            res.status(400).json({
                error: 'Missing query parameter',
            })
            return
        }

        const prisma = new PrismaClient()

        const result = await prisma.artwork.findMany({
            where: {
                title: {
                    search: query
                }
            }
        })

        res.status(200).json({ results: result })
    } */
}
