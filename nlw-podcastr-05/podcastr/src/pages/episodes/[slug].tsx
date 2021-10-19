import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { usePlayer } from '../../contexts/PlayerContext';
import Head from 'next/head';

import Link from 'next/link';
import Image from 'next/image';

import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

import { api } from '../../services/api';

import styles from './episode.module.scss';

type Episode = {
  id: string;
  title: string;
  members: string;
  published_at: string;
  thumbnail: string;
  description: string;
  file: {
    url: string;
    type: string;
    duration: string;
  };

  publishedAt: string;
  duration: number;
  durationAsString: string;
};

type EpisodeProps = {
  episode: Episode;
};

export default function Episode({ episode }: EpisodeProps) {
  // const router = useRouter();

  // we only need this if we have fallback: true
  // if (router.isFallback) {
  //   return <p>Carregando...</p>;
  // }

  const { play } = usePlayer();

  return (
    <div className={styles.episode}>
      <Head>
        <title>{episode.title} | Podcastr</title>
      </Head>

      <div className={styles.thumbnailContainer}>
        <Link href='/'>
          <button type='button'>
            <img src='/arrow-left.svg' alt='Voltar' />
          </button>
        </Link>
        <Image
          width={700}
          height={160}
          src={episode.thumbnail}
          objectFit='cover'
        />
        <button type='button' onClick={() => play(episode)}>
          <img src='/play.svg' alt='Tocar episódio' />
          <p></p>
        </button>
      </div>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </header>

      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: episode.description }}
      />
    </div>
  );
}

// to use dynamic static pages, like [slug].tsx, we need to use getStaticPaths
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    // we pass the path we want to generate static pages
    paths: [],
    // if "paths" is empty, will make request defined in getStaticProps
    // client -> nextjs layer (nodejs) -> server (back-end)
    // false -> the request will not be sent (404)
    // true -> the request will be sent from client
    // blocking -> the request will be sent from nextjs layer (when data already available)
    fallback: 'blocking', // incremental static regeneration
  };
};

// to access slug, we use context in params
export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params;

  const { data } = await api.get(`/episodes/${slug}`);

  const episode = {
    ...data,
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', {
      locale: ptBR,
    }),
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(Number(data.file.duration)),
  };

  return {
    props: {
      episode,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
