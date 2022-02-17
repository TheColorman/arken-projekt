import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (!req.query.q) {
        const data = await prisma.artwork.findMany()
        return res.status(200).json(data)
    }
    const query = req.query.q as string

    const data = await prisma.artwork.findMany({
        where: {
            OR: [
                {
                    artist: {
                        contains: query
                    }
                }, {
                    collection: {
                        contains: query
                    }
                }, {
                    title: {
                        contains: query
                    }
                }, {
                    tag: {
                        contains: query
                    }
                }

            ]
        }
    })
    res.status(200).json(data)
}
