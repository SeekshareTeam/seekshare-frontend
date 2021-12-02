// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
// import { TrialComponent } from '../src/components/trial';
// import { getLayout } from 'src/components/App/Layout/index';

import * as React from 'react';

import { GeneralLayout } from 'src/components/Layouts';



// import { Home } from 'src/components/App/Home';
import Editor from 'src/components/Editor';



const Home = () => {
  return (
    <Editor />
  )
};

// const Home = () => {
//   return (<div>{"helloo"}</div>)
// };

// Home.getLayout = page => ()

// const Home = () => {
//   return (<div>{"he"}</div>)
// }
//
// Home.getLayout = getLayout;

Home.getLayout = GeneralLayout;

export default Home;


  /// return (
  ///   <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
  ///     <Sidebar />
  ///     <div style={{ flex: 1, height: '100%', borderWidth: 1, borderColor: 'black' }} />
  ///   </div>
  /// )

