import type { GetStaticProps, NextPage } from 'next'
import Header from '../components/header'
import Head from 'next/head'
import Image from 'next/image'
import { readdirSync } from 'fs'

interface Props {
  images: string[]
}

export const getStaticProps: GetStaticProps<Props> = async () => { // must be async
  const images = readdirSync('public/images')
  
  return {
    props: {
      images,
    },
  }
}


const Home: NextPage = ({ images }: { images: string[] }) => {
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
          <div className="m-2" key={index}>
              <Image
                src={`/images/${image}`}
                alt={image}
                width={200}
                height={200}
              />
          </div>
        ))}
        </div>
      </div>
    </>
  )
}

export default Home
