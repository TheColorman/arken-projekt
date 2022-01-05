import type { GetStaticProps } from 'next'
import Header from '../components/header'
import Head from 'next/head'
import Image from 'next/image'
import { PrismaClient } from '@prisma/client'
import type { Artwork } from '@prisma/client'
import styles from '../styles/Home.module.css'

interface Props {
  images: Artwork[]
}

export const getStaticProps: GetStaticProps<Props> = async () => { // must be async
  const prisma = new PrismaClient()
  const images = await prisma.artwork.findMany()

  return {
    props: {
      images,
    },
  }
}


const Home = ({ images }: { images: Artwork[] }) => {
  return (
    <>
      <Header />
      <div className="mt-32 w-full">
        <Head>
          <title>Home</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {/* Render images */}
        <div
          className='flex flex-wrap justify-center w-full'
        >
          {images.map((image, index) => (
            <a href="https://arken.dk" key={index}>
              <div className={`m-2 ${styles.card}`}>
                <div className="relative w-full h-full">
                  <Image
                    src={`/images/${image.imagePath}`}
                    alt={image.title}
                    width={300}
                    height={300}
                  />
                </div>
                <h1 className={styles.cardTitle}>{image.title}</h1>
                <p className={styles.cardSubtitle}>{image.artist}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home
