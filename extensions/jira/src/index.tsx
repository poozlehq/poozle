
 import * as React from 'react';
 import ReactDOM from 'react-dom/client';
 
 
 import App from './app/index';
 
 const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

 root.render(
   <App commandKey="create_issue" resetCommand={function (): void {
     throw new Error('Function not implemented.');
   } } />
 );
 
