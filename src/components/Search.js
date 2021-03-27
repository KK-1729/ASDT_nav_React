import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Search = function() {
    const [term, setTerm] = useState('cricket');
    const [results, setResults] = useState([]);

    console.log(results);
    useEffect(function() {
        const search = async function() {
            const {data} = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: term
                },
            });
            setResults(data.query.search);
        }; 

        if(term && !results.length) {
            search();
        }
        else {
            const timeoutId = setTimeout(function() {
                if(term) {
                    search();  
                }
            }, 1000);
            return function() {
                clearTimeout(timeoutId);
            };
        }
    }, [term]);

    const renderedResults = results.map(function(result) {
        return(
            <div key={result.pageid} className="item">
                <div className="right floated content">
                    <a className="ui button" href={`https://en.wikipedia.org?curid=${result.pageid}`}>Go</a>
                </div>
                <div className="content">
                    <div className="header">
                        {result.title}
                    </div>
                    <span dangerouslySetInnerHTML={{__html: result.snippet}}></span>
                </div>
            </div>
        );
    });

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Search Term</label>
                    <input value={term} onChange={e => setTerm(e.target.value)} className="input"></input>
                </div>
            </div>
            <div className="ui celled list">{renderedResults}</div>
        </div>
    );
};

export default Search;