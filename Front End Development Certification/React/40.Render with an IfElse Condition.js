class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true
    }
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }
  toggleDisplay() {
    this.setState({
      display: !this.state.display
    });
  }
  render() {
    // change code below this line
    let disp = null;
         
    if(this.state.display){
      disp =<div>
              <button onClick={this.toggleDisplay}>Toggle Display</button>
              <h1>Displayed!</h1>
            </div>;
    }else{
      disp = <div>
                <button onClick={this.toggleDisplay}>Toggle Display</button>
             </div>;
    }
   
    return (
      <React.Fragment>
       {disp}
      </React.Fragment>
    );
  }
};
