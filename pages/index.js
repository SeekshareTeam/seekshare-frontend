// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
// import { TrialComponent } from '../src/components/trial';
// import { getLayout } from 'src/components/App/Layout/index';

import React from 'react';

import { GeneralLayout } from 'src/components/Layouts';

import { useSession, getSession } from 'next-auth/react';


// import { Home } from 'src/components/App/Home';
import Editor from 'src/components/Editor';

const Home = () => {
  return (
    <Editor />
  )
};

Home.layoutType = 'general';

export default Home;
