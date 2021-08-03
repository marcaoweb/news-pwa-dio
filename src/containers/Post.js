import { memo, useEffect, useState, useCallback } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import Api from '../api';
import Actions from "./components/Actions";
import { createMarkup } from "../utils";

function Post() {
    const {id, subject} = useParams();
    const [post, setPost] = useState({});
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const renderImg = ({ image, description }) => <img src={image.url} alt={description} width="100%" />;

    const handleNews = useCallback((data) => {
        setNews(data[0]?.value);
        setPost(data[1]?.value);
        setLoading(false);
    }, []);

    useEffect(() => {
        setLoading(true);
        Promise.allSettled([
            Api.getNews(subject),
            Api.getNewsById(subject, id)
        ]).then(handleNews)
    }, [id, subject, handleNews]);

    const renderDescription = (description) => <p dangerouslySetInnerHTML={createMarkup(description)} />

    const openPost = (id) => {
        history.push(`/${subject}/${id}`)
      }

    const renderPost = (post, index) => {
        const {title, image, description, id} = post;
        return(
            <>
                <div key={`post-${index}`} className="md:w-1/4 px-4">
                    
                    <article onClick={() => openPost(id)} className="article-box">
                        <p className="news-title">
                            <strong dangerouslySetInnerHTML={createMarkup(title)} />
                        </p>
                        {image?.url ? renderImg({image, description}) : renderDescription(description)}
                    </article>
                </div>
            </>
        );
    }

    if(loading) return <div>Carregando...</div>;
    if(!post?.id) return null;
    const {title, image, description, body, datePublished} = post;

    return(
        <>
            <div className="actions-box">
                <Link to="/" className="back-link">Back</Link>
                <Actions post={post} subject={subject} />
            </div>
            <section className={subject}>
                <div className="container mx-auto">                    
                    <article className="py-8">
                        <h1 dangerouslySetInnerHTML={createMarkup(title)} className="news-title-post" />
                        <p className="py-2 text-lg">{datePublished}</p>
                        {image && renderImg({ image, description})}
                        <p className="text-sm border-b border-gray-400" dangerouslySetInnerHTML={createMarkup(title)} />
                        
                        <p className="text-lg py-2" dangerouslySetInnerHTML={createMarkup(body)} />
                    </article>
                    <div className="pt-8 border-t border-black">
                        <h2 className="py-2 font-bold text-4xl border-b border-gray-500">More News</h2>
                        <div className="flex justify-around flex-wrap">
                            {news?.value?.map(renderPost)}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default memo(Post);
