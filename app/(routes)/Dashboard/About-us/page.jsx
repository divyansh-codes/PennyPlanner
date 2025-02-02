// Purpose: To display the About Us page of the application.
// This page can be called from the Navigation bar in the Dashboard page, and the Learn more button in the Hero page

import React from 'react';
function AboutUs() {
  return (
    <div>
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '75vh',
      textAlign: 'center'
    }}>
      <h1 className="text-3xl font-extrabold sm:text-5xl">About Us</h1>
      <p className="mt-4 sm:text-xl/relaxed">Penny Planner is an expense tracker cum budget tracker that caters to all your Budgeting needs.</p>
      <h2 className="text-2xl font-bold sm:text-4xl">Links:</h2>
      <p className="mt-4 sm:text-xl/relaxed">
        <a href="https://github.com/divyansh-codes/PennyPlanner" style={{ color: 'blue' }} >Penny Planner GitHub Repository</a><br/>
        Developer - <a href="https://github.com/divyansh-codes" style={{ color: 'blue' }}>Divyansh tiwari</a><br/>
        Developer - <a href="https://github.com/Dev-Siddhi" style={{ color: 'blue' }}>Siddhi goyal</a>
      </p>
    </div>
    </div>
  );
}

export default AboutUs;
