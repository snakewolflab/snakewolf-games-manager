// Homeページ例（src/pages/Home.js）
import Layout from '../components/layout/Layout';
import '../styles/Search.css'

export default function Home() {
    return (
        <Layout>
            <h1>SnakeWolf</h1>
            <form action='#' className="kyc-search-bar">
                <i className="material-icons md-21" id="kyc-search-mark">search</i>
                <input className="kyc-search-box" type="text" placeholder="検索" autoComplete="off" />
                <i className="material-icons md-21" id="kyc-search-mic">mic</i>
            </form>
        </Layout>
    );
}