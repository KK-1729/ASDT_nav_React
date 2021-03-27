import { useEffect, useState } from "react";

const Route = function({path, children}) {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    useEffect(function() {
        const onLocationChange = function() {
            setCurrentPath(window.location.pathname);
        };

        window.addEventListener('popstate', onLocationChange);

        return function() {
            window.removeEventListener('popstate', onLocationChange);
        }
    }, []);


    return currentPath === path ? children : null;
};

export default Route;