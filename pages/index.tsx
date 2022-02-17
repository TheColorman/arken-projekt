import Link from 'next/link'
import Header from '../components/header'
import Head from 'next/head'
import Image from 'next/image'
import type { Artwork } from '@prisma/client'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import useSWR from 'swr'

interface Props {
  images: Artwork[]
}

const Home = () => {
  const router = useRouter()
  const search = router.query.search as string | undefined

  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data } = useSWR(search ? `/api/search?q=${search}` : '/api/search', fetcher)
  const images = data as Artwork[] | undefined

  return (
    <>
      <Header />
      <div className="mt-32 w-full">
        <Head>
          <title>Home</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {/* Search bar */}
        <div>
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-2/3 lg:w-1/2 p-3 grid grid-cols-4">
              <div className="bg-white border-2 border-gray-300 rounded-tl-lg rounded-bl-lg shadow-lg p-4 col-span-3">
                <input className="w-full p-3" id="searchBar" type="text" placeholder="Search" onKeyDown={(key) => {
                  if (key.key !== 'Enter') return
                  // Get data from search bar
                  const searchBar = document.getElementById('searchBar') as HTMLInputElement
                  const search = searchBar.value
                  // Redirect to search page
                  window.location.href = `/?search=${search}`
                }} />
              </div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-tr-lg rounded-br-lg" onClick={() => {
                // Get data from search bar
                const searchBar = document.getElementById('searchBar') as HTMLInputElement
                const search = searchBar.value
                // Redirect to search page
                window.location.href = `/?search=${search}`
              }}>
                Search
              </button>
            </div>
          </div>
        </div>
        {search && (
          <div className='flex justify-center'>

            <p className='text-sm'>Search: {search}</p>
          </div>
        )}
        {/* Render images */}
        <div
          className='flex flex-wrap justify-center w-full'
        >
          {!images && <p>Loading...</p>}
          {images && images.map((image, index) => (
            <div key={index}>
              <div className={`m-2 ${styles.card}`}>
                <div className="relative w-full h-full">
                  <a href="https://arken.dk">
                    <Image
                      src={`/images/${image.imagePath}`}
                      alt={image.title}
                      width={300}
                      height={300}
                    />
                  </a>
                </div>
                <a href="https://arken.dk">
                  <h1 className={styles.cardTitle}>{image.title}</h1>
                </a>
                <Link href={`/?search=${encodeURI(image.artist)}`}>
                  <a>
                    <p className={styles.cardSubtitle}>{image.artist}</p>
                  </a>
                </Link>
                <br />
                <Link href={`/?search=${encodeURI(image.collection)}`}>
                  <a>
                    <p className={styles.cardSubtitle}>{image.collection}</p>
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home
