import React, { useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Link from '../src/components/Link';
import Footer from '../src/components/Footer';
import GithubCorner from '../src/components/GithubCorner';
import QuizBackground from '../src/components/QuizBackground';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
// import QuizContainer from '../src/components/QuizContainer'

// Styled Components
// const Title = styled.h1`
//   font-size: 50px;
//   color: ${({ theme }) => theme.colors.primary};
// `;

// React
// function Title(props) { // propcidades / propriedades
//   return <h1>{props.children}</h1>;
// }

// const BackgroundImage = styled.div`
//   background-image: url(${db.bg});
//   flex: 1;
//   background-size: cover;
//   background-position: center;
// `;

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 50px;
  margin: 0 auto;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }

  h1,
  h2,
  h3 {
    font-size: 16px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');
  console.log('Retorno do useState: ', name, setName);

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head><title>Chemistry Quiz</title></Head>
      <QuizContainer>
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={(event) => {
              event.preventDefault();

              router.push(`/quiz?name=${name}`);

              // Router manda para a próxima paǵina
            }}
            >
              <Input
                name="username"
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                {/* eslint-disable-next-line no-trailing-spaces */}
                {`Play ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1>Quizzes from People</h1>
            <ul>

              {db.external.map((link) => {
                const [projectName, githubUser] = link.replace('https://', '').split('.');
                return (
                  <li key={link}>
                    <Widget.Topic
                      as={Link}
                      href={`/quiz/${projectName}___${githubUser}`}
                    >
                      {`${githubUser}/${projectName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer
          as={motion.footer}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>
      <GithubCorner projectUrl="https://github.com/arthursvpb/next-quiz" />
    </QuizBackground>
  );
}
