import React, {useState} from 'react';

const Accordion = function({items}) {
    const [activeIndex, setActiveIndex] = useState(null);

    const onTitleClick = function(index) {
        setActiveIndex(index);
    };

    const renderedItems = items.map(function(item, index) {
        const active = index === activeIndex ? 'active' : '';
        
        return (
            <React.Fragment key={item.title}> 
            {/* React.fragement is used instead of div to avoid the double border caused by the semantic UI due to the div tag */}
                <div className={`title ${active}`} onClick={function() {onTitleClick(index)}} >
                    <i className="dropdown icon"></i>
                    {item.title}
                </div>
                <div className={`content ${active}`} >
                    <p>{item.content}</p>
                </div>
            </React.Fragment>
        );
    });

    return (
        <div className="ui styled accordion">
            {renderedItems}
        </div>
    ); 
};

export default Accordion;