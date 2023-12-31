import React, { useState, useEffect } from 'react';
import './News.css';

export const NewsComponent = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  

    useEffect(() => {
        fetch("http://localhost:8000/latest-news/")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setNews(data.results);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching the news:", err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="news-section">
            <div className='news_header'>Daily Tech News</div>
            {news.map((article, index) => (
                <div key={index} className="news-card">
                    <div className="news-content">
                        <div className='article-details'>
                        <h2 className="article_title">{article.title}</h2>
                        {article.image_url && <img className="article-image" src={article.image_url} alt={article.title} />}
                        </div>
                        <div className="news_link_button">
                        <a href={article.link}  target="_blank" rel="no_opener no_referrer">Read More</a>
                        </div>
                    </div>
                    {/* Display other fields as needed */}
                </div>
            ))}
        </div>
    );
            }    


