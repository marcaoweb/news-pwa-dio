import { memo, useEffect, useState } from "react";
import Economy from './components/Economy';
import Technology from './components/Technology';
import World from './components/World';
import Api from '../api';

function Home() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleNews = (articles) => {
        setLoading(false);
        setNews({
            world: articles[0]?.value.value,
            economy: articles[1]?.value.value,
            technology: articles[2]?.value.value
        });
    };

    useEffect(() => {
        setLoading(true);
        Promise.allSettled([
            Api.getNews('world'),
            Api.getNews('economy'),
            Api.getNews('technology')
        ])
        .then(handleNews)
    }, []);

    if(loading) return <div>Carregando...</div>;

    return (
      <>
        <section className="news-section world">
            <div className="container mx-auto">
                <h2 className="subject-title text-green-900">World</h2>
                <World values={news?.world} />
            </div>
        </section>
        <section className="news-section economy">
            <div className="container mx-auto">
                <h2 className="subject-title text-red-900">Economy</h2>
                <Economy values={news?.economy} />
            </div>
        </section>
        <section className="news-section technology">
            <div className="container mx-auto">
                <h2 className="subject-title text-yellow-500">Technology</h2>
                <Technology values={news?.technology} />
            </div>
        </section>
      </>
    );
};

export default memo(Home);