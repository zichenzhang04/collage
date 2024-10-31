import React, {lazy, Suspense} from 'react';
import courseIcon from './Vector (2).svg'; // TODO: update png/vector
import CharlieProfileImage from './images/Charlie.svg';
import SuggestedConnections from './UserProfile/SuggestedConnections';
const NetworkNavBar = lazy(() => import('./Network/NetworkNavBar'));
const SuggestedConnectionUserProfile = lazy(() => import('./UserProfile/SuggestedConnections'));

function App() {
  const courseName = "Introduction to Computer Science";
  const currentUser = { name: "Tanishka Nalawade", userId: 123 };

  const userProfile = {
    userId: 1,
    name: 'Charlie Zhang',
    major: 'Computer Science',
    profileImage: CharlieProfileImage, //placeholder
  };


  const handleClick = () => {
    // Figure out redirection
    //window.location.href = `/course/${courseData.courseNumber}`;
  };

  return (
    <Suspense fallback={<h1>loading...</h1>}>
      <div className="App">

      {/* <div className='network-navbar-container'>
        <NetworkNavBar />
      </div> */}

      {/* <div>
        <SuggestedConnectionUserProfile {...userProfile} />
      </div> */}

      {/* <div> 
         <SuggestedConnections courseName={courseName} currentUser={currentUser} />
      </div> */}


    </div>

    </Suspense>
    
  );
}

export default App;

