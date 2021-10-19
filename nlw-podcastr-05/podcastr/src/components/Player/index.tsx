// CSS Module: styles.module.scss -> create style for specific component
// This module never share its styling with other components
import styles from './styles.module.scss';

import { useRef, useEffect, useState } from 'react';
import { usePlayer } from '../../contexts/PlayerContext';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import Image from 'next/image';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

export function Player() {
  // * refs -> like document.getElementById to manipulate an element
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);

  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    isLooping,
    isShuffling,
    togglePlay,
    toggleLoop,
    toggleShuffle,
    setPlayingState,
    playNext,
    playPrevious,
    hasNext,
    hasPrevious,
    clearPlayState,
  } = usePlayer();

  const episode = episodeList[currentEpisodeIndex];

  function setupProgressListener() {
    audioRef.current.currentTime = 0;

    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime));
    });
  }

  function handleSeek(amount: number) {
    audioRef.current.currentTime = amount;
    setProgress(amount);
  }

  function handleEpisodeEnded() {
    if (hasNext) {
      playNext();
    } else {
      clearPlayState();
    }
  }

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className={styles.playerContainer}>
      <header>
        <img src='/playing.svg' alt='Tocando agora' />
        <strong>Tocando agora</strong>
      </header>

      {episode ? (
        <div className={styles.currentEpisode}>
          <Image
            width={592}
            height={592}
            src={episode.thumbnail}
            objectFit='cover'
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}

      <footer className={!episode ? styles.empty : ''}>
        <div className={styles.progress}>
          <span>{convertDurationToTimeString(progress)}</span>
          <div className={styles.slider}>
            {episode ? (
              <Slider
                max={episode.duration}
                value={progress}
                onChange={handleSeek}
                trackStyle={{ backgroundColor: '#04d361' }}
                railStyle={{ backgroundColor: '#9f75ff' }}
                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
              />
            ) : (
              <div className={styles.emptySlider} />
            )}
          </div>
          <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
        </div>

        {/* refs -> like document.getElementById to manipulate an element */}
        {episode && (
          <audio
            ref={audioRef}
            src={episode.file.url}
            loop={isLooping}
            autoPlay
            onEnded={handleEpisodeEnded}
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
            onLoadedMetadata={setupProgressListener}
          />
        )}

        <div className={styles.buttons}>
          <button
            type='button'
            disabled={!episode || episodeList.length === 1}
            className={isShuffling ? styles.isActive : ''}
            onClick={toggleShuffle}
          >
            <img src='/shuffle.svg' alt='Embaralhar' />
          </button>
          <button type='button' disabled={!episode || !hasPrevious}>
            <img
              src='/play-previous.svg'
              alt='Tocar anterior'
              onClick={playPrevious}
            />
          </button>
          <button
            type='button'
            className={styles.playButton}
            disabled={!episode}
            onClick={togglePlay}
          >
            {isPlaying ? (
              <img src='/pause.svg' alt='Tocar' />
            ) : (
              <img src='/play.svg' alt='Tocar' />
            )}
          </button>
          <button type='button' disabled={!episode || !hasNext}>
            <img src='/play-next.svg' alt='Tocar próxima' onClick={playNext} />
          </button>
          <button
            type='button'
            disabled={!episode}
            className={isLooping ? styles.isActive : ''}
            onClick={toggleLoop}
          >
            <img src='/repeat.svg' alt='Repetir' />
          </button>
        </div>
      </footer>
    </div>
  );
}
