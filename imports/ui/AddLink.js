import React from 'react';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';

export default class AddLink extends React.Component {
  state = {
    url: '',
    errorMessage: '',
    isOpen: false
  }
  onSubmit(e) {
    const { url } = this.state;
    e.preventDefault();

    Meteor.call('links.insert', url, (err, res) => {
      if (!err) {
        this.handleModalClose();
      }
      this.setState({ errorMessage: err.reason });
    });
  }
  onChange = (e) => {
    this.setState({ url: e.target.value.trim() });
  }
  handleModalClose = () => this.setState({ 
    isOpen: false, 
    url: '' , 
    errorMessage: ''
  });
  render() {
    return (
      <div>
        <button onClick={() => this.setState({ isOpen: true })} className="button">+ Add Link</button>
        <Modal 
          isOpen={this.state.isOpen} 
          contentLabel="Add Link"
          onAfterOpen={() => this.refs.url.focus()}
          onRequestClose={this.handleModalClose}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal"
        >
          <h1>Add Link</h1>
          {this.state.errorMessage ? <p>{this.state.errorMessage}</p> : undefined}
          <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
            <input 
              type="text" 
              ref="url" 
              placeholder="URL" 
              value={this.state.url} 
              onChange={this.onChange}/>
            <button className="button">Add Link</button>
            <button type="button" className="button button--secondary" onClick={this.handleModalClose}>Cancel</button>
          </form>
        </Modal>
      </div>
    );
  };
};
