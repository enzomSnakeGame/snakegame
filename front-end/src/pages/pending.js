
import PageNotFound from "../components/PageNotFound.js"
import React from 'react';
import PendingComponent from '../components/PendingComponent.js';

export default function PendingPage() {
  if(sessionStorage.length == 0){
        return (
            <PageNotFound />
        )
    }else{
        return(
          <>             
            <PendingComponent  />
          </>
        )
    }
}