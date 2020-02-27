import React, { useEffect } from 'react';

import './App.css';
import ComponentList from './components/ComponentList/ComponentList';
import components from './data/componentData.json';

const App = () => {

  // Append attribute for opening / closing
  const appendOpened = items => {
    items.forEach(item => {
        item.opened = false;
        if (item.children) {
            appendOpened(item.children);
        }
        return;
    });
  }

  useEffect(() => {
    appendOpened(components);
  })

  return (
    <div className="App">
      <ComponentList data={components} />
    </div>
  );
}

export default App;
