// type from next
// with only typing, we can type parameters and the return
import { GetStaticProps } from 'next';
import { usePlayer } from '../contexts/PlayerContext';
import Head from 'next/head';

import Link from 'next/link';
import Image from 'next/image';

import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { api } from '../services/api';

import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';

import styles from './home.module.scss';

// Ways to consume API
// SPA -> useEffect -> runs on Client JavaScript
// SSR -> getServerSideProps -> runs on NextJS Layer
// SSG -> getStaticProps -> getServerSideProps + cache with the same content -> runs on NextJS Layer and caches it

// we can use type or interface
type Episode = {
  id: string;
  title: string;
  members: string;
  thumbnail: string;
  file: {
    url: string;
  };
  published_at: string;
  publishedAt: string;
  duration: number;
  durationAsString: string;
};

type HomeProps = {
  latestEpisodes: Array<Episode>; // can be used Episode[];
  allEpisodes: Array<Episode>; // can be used Episode[];
};

// When state change -> component renders again
export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  // props -> Data already available generate by Next
  const { playList } = usePlayer();

  const episodeList = [...latestEpisodes, ...allEpisodes];

  return (
    <div className={styles.homepage}>
      <Head>
        <title>Home | Podcastr</title>
      </Head>

      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>
        <ul>
          {latestEpisodes.map((episode, index) => {
            return (
              <li key={episode.id}>
                <Image
                  width={192}
                  height={192}
                  src={episode.thumbnail}
                  alt={episode.title}
                  objectFit='cover'
                />

                <div className={styles.episodeDetails}>
                  <Link href={`/episodes/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>
                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </div>

                {/* When we need function with parameters, we have to set a new function */}
                <button
                  type='button'
                  onClick={() => playList(episodeList, index)}
                >
                  <img src='/play-green.svg' alt='Tocar episódio' />
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className={styles.allEpisodes}>
        <h2>Todos episódios</h2>

        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map((episode, index) => {
              return (
                <tr key={episode.id}>
                  <td style={{ width: 72 }}>
                    <Image
                      width={120}
                      height={120}
                      src={episode.thumbnail}
                      alt={episode.title}
                      objectFit='cover'
                    />
                  </td>
                  <td>
                    <Link href={`/episodes/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>
                  </td>
                  <td>{episode.members}</td>
                  <td style={{ width: '100' }}>{episode.publishedAt}</td>
                  <td>{episode.durationAsString}</td>
                  <td>
                    <button>
                      <img
                        src='/play-green.svg'
                        alt='Tocar episódio'
                        onClick={() =>
                          playList(episodeList, index + latestEpisodes.length)
                        }
                      />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

// NextJS Layer
// Execute this function before showing the final content
export const getStaticProps: GetStaticProps = async () => {
  const response = await api.get('/episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc',
    },
  });
  const { data } = response;

  // formating should be done before the component renders
  const episodes: Array<string> = data.map((episode: Episode) => {
    return {
      ...episode,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {
        locale: ptBR,
      }),
      duration: Number(episode.duration),
      durationAsString: convertDurationToTimeString(Number(episode.duration)),
    };
  });

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  // Always need to return props
  return {
    // passed to the component Home
    props: {
      latestEpisodes,
      allEpisodes,
    },
    // number in seconds to call the api again, 8 hours
    revalidate: 60 * 60 * 8,
  };
};
