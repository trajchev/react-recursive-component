import React, { useState, useEffect, useCallback } from 'react';
import * as _ from 'lodash';

import './ComponentList.css';
import ComponentItem from '../ComponentItem/ComponentItem';

const ComponentList = props => {
    
    const componentsClone = _.cloneDeep(props.data);

    const [componentItems, setComponentItems] = useState([]);
    const [openedComponents, setOpenedComponents] = useState([]);

    const getIdsRecursively = useCallback(items => {
        items.forEach(item => {
            componentItems.push(item.id);
            if (item.children) {
                getIdsRecursively(item.children);
            }
        });
        return componentItems;
    },[componentItems]);

    useEffect(() => {
        setComponentItems(getIdsRecursively(props.data));
    }, [getIdsRecursively, props.data]);

    // Handle toggle single component
    const toggleComponentHandler = id => {
        openedComponents.includes(id) 
            ? setOpenedComponents(openedComponents.filter(cmp => cmp !== id))
            : setOpenedComponents(openedComponents.concat(id));
    };

    // Handle toggle all components
    const toggleAllHandler = () => {
        componentItems.length > openedComponents.length
            ? setOpenedComponents(componentItems)
            : setOpenedComponents([]);
    };

    // Recursive Component list creation
    const componentsRender = data => {
        const children = comps => comps ? <div className="list">{componentsRender(comps)}</div> : null;

        return data.map(cItem => <ComponentItem
                key={cItem.id}
                title={cItem.title}
                body={cItem.body}
                id={cItem.id}
                onClick={() => toggleComponentHandler(cItem.id) }
                opened={openedComponents.includes(cItem.id)}
            >
                {children(cItem.children)}
            </ComponentItem>
        );

    };

    return (
        <div className="list">
            <h3>Component list</h3>
            <button 
                className='btn-list'
                onClick={toggleAllHandler} >
                {
                    componentItems.length === openedComponents.length
                    && openedComponents.length !== 0
                        ? 'Close'
                        : 'Open'
                } All
            </button>
            {componentsRender(componentsClone)}
        </div>
    );
}

export default ComponentList;