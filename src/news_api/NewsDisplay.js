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
            {news.map((article, index) => (
                <div key={index} className="news-card">
                    <h2 className="article_title">{article.title}</h2>
                    <div className="article_image">{article.image_url && <img src={article.image_url} alt={article.title} />}</div>
                    {/* Display other fields as needed */}
                </div>
            ))}
        </div>
    );
    
}


