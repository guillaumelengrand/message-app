import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Welcome to Message App</h1>

                <Link href={'/room'}>
                    <a className="block py-4 text-xl text-green-800">New Chat Room</a>
                </Link>
            </main>

            <footer className={styles.footer}>
                <div>Powered by Yunne Corp.</div>
            </footer>
        </div>
    );
}
