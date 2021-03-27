import React, { useEffect, useRef, useState } from 'react';

const Dropdown = function({label, options, selected, onSelectedChange}) {
    const [open, setOpen] = useState(false);
    const ref = useRef();

    useEffect(function() {
        const onBodyClick = function(event) {
            if(ref.current && ref.current.contains(event.target)) {
                return;
            }

            setOpen(false);
        };

        document.body.addEventListener('click', onBodyClick);

        return function() {
            document.body.removeEventListener('click', onBodyClick);
        };
    }, []);

    const renderedOptions = options.map(function(option) {
        if(option.value === selected.value) {
            return null;
        }

        return (
            <div key={option.value} className="item" onClick={function() {onSelectedChange(option)}}>
                {option.label}
            </div>
        );
    });
    return (
        <div ref={ref} className="ui form">
            <div className="field">
                <label className="label">{label}</label>
                <div onClick={function() {setOpen(!open)}} className={`ui selection dropdown ${open ? 'visible active' : ''}`}>
                    <i className="dropdown icon"></i>
                    <div className="text">{selected.label}</div>
                    <div className={`menu ${open ? 'visible transition' : ''}`}>
                        {renderedOptions}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dropdown;