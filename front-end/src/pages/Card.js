import PageNotFound from "../components/PageNotFound.js"
import React from 'react';
import CardComponent from '../components/CardComponent.js';

export default function CardPage() {
  if(sessionStorage.length == 0){
        return (
            <PageNotFound />
        )
    }else{
        return(
            <>             
            <CardComponent />
            </>
        )
    }
}