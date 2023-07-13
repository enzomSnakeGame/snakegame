

import React from 'react';
import PendingComponent from '../components/PendingComponent.js';

export default function PendingPage({socket}) {
  
  return (
  <PendingComponent socket = {socket}  />
  );
}