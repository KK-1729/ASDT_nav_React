import React from 'react';

const Link = function({href, className, children}) {
    const onClick = function(event) {
        if(event.ctrlKey || event.metaKey) {
            return;
        }

        event.preventDefault();
        window.history.pushState({}, '', href);

        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    };

    return <a onClick={onClick} className={className} href={href}>{children}</a>
};

export default Link;