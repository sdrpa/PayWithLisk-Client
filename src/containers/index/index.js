import React, { Component } from 'react'

import ProgressIndicator from '../../components/progress-indicator'

const apiWsRoot = 'ws://localhost:8182'
let socket = new WebSocket(`${apiWsRoot}/payment`)

class Index extends Component {
   constructor(props) {
      super(props)

      this.state = {
         inputValue: '', // 10872755118372042973L
         status: null
      }
   }

   componentDidMount() {
      socket.onmessage = e => {
         const message = JSON.parse(e.data)
         this.setState({
            ...this.state,
            status: message.status
         })
      }
   }

   updateInputValue(evt) {
      this.setState({
         ...this.state,
         inputValue: evt.target.value
      })
   }

   render() { 
      const { inputValue, status } = this.state

      const purchase = () => {
         this.setState({
            ...this.state,
            status: 'pending'
         })

         // Send new order message to server 
         const message = {
            senderId: inputValue,
            item: 'CabernetSauvignon'
         }
         console.log(message)
         socket.send(JSON.stringify(message))
      }

      const renderStatus = () => {
         const { status } = this.state
         if (!status) {
            return <div />
         }
         if (status === 'pending') {
            return <div className="alert alert-info">
               <p>Please send 1 LSK to <strong>17206648368948385036L</strong><br />
                  Our server is waiting for your transaction...
               </p>
               
               <strong>Don&apos;t refresh the page, once the transaction has been processed the page will referesh automatically.</strong><br />
            </div>
         }
         if (status === 'completed') {
            return <div className="alert alert-success">
               Your transaction has been processed successfully. Thank you for shopping with us. <a href="/">Try again?</a>
            </div>
         }
      }

      return (
         <div className="row">
            <div className="col-xs-12 col-sm-5">
               <img className="img-responsive" src="images/wine.jpg" alt="wine-bottle" width="100%" />
            </div>
            <div className="col-xs-12 col-sm-7">
               <h3>2011 Cabernet Sauvignon</h3>
               <p>Price: 1 LSK</p>
               <p className="py-3">This Cabernet has a dark, classic style that is coupled with its background, brooding tannins.  The tannic structure within the wine is able to support a balanced fruit profile as well as subtle oak influences.  This wine was built for longevity.
               </p>
               <form>
                  <div className="form-group">
                     <input
                        placeholder="Enter your lisk wallet address"
                        type="text" 
                        className="form-control" 
                        value={inputValue} 
                        disabled={status === 'pending'}
                        onChange={evt => this.updateInputValue(evt)}/>
                  </div>
                  {renderStatus()}
                  <button onClick={purchase}
                     disabled={status === 'pending'}
                     className="btn btn-primary btn-lg btn-block">
                     <ProgressIndicator animated={status === 'pending'} /> {status === 'pending' ? 'Stand by...' : 'Purchase'}
                  </button>
               </form>
            </div>
         </div>
      )
   }
}

export default Index
