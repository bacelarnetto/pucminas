import React from 'react'
import ReduxToastr from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

const messages = () => (
  <ReduxToastr 
    newestOnTop={false}
    position="top-right"
    preventDuplicates
    progressBar
    timeOut={4000}
    transitionIn="fadeIn"
    transitionOut="fadeOut"
  />)

export default messages

