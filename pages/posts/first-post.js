// dependencies 
import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import Layout from '../../components/layout';

// Frist-post page
export default function FirstPost () {
    return (
        <Layout>
            <Head>
                <title>Firts Post</title>
                
            </Head>
            <Script
                    src='https://connect.facebook.net/en_US/sdk.js' 
                    strategy='lazyOnload' 
                    onLoad={()=>console.log('facebook sdk loaded')} 
                />
            <h1>
                Thist is my first post!!!
            </h1>
            <h2>
                <Link href={'/'}>back to home</Link>
            </h2>
        </Layout>
        
    )
}