//Required React (https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react.min.js)(https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react-dom.min.js)

//Style for active pad
const soundOnPad = {
  backgroundColor: 'orange',
};
//Style for inactive pad
const soundOffPad = {
  backgroundColor: '#fcffc5',    
};

//creating class for object with sound
class banking {
    constructor(keyCode, keyTrigger, id, url) {
        this.keyCode = keyCode;
        this.keyTrigger = keyTrigger;
       this.id = id;
        this.url = url;
    }};

const bank=[]; //declaring object for sound

//declaring 9 pads
bank[0] = new banking(81, 'Q','Bright Punch','https://www.myinstants.com/media/sounds/dragon-ball-z-golpe-soco-forte-luta-strongpunch.mp3');
bank[1] = new banking(87, 'W','Teleport','https://www.myinstants.com/media/sounds/dbz-teleport.mp3');
bank[2] = new banking(69, 'E','Kamehameha','https://www.myinstants.com/media/sounds/kamehameha-wave-sound-effect.mp3');
bank[3] = new banking(65, 'A','Intermission','https://www.myinstants.com/media/sounds/all-dragon-ball-eyecatch-intermission.mp3');
bank[4] = new banking(83, 'S','Flying Nimbus','https://www.myinstants.com/media/sounds/dragon-ball-flying-nimbus-notification-sound.mp3');
bank[5] = new banking(68, 'D','Whoosh','https://www.myinstants.com/media/sounds/123_7G7G85U.mp3');
bank[6] = new banking(90, 'Z','SSJ Aura','https://www.myinstants.com/media/sounds/saiyan.mp3');
bank[7] = new banking(88, 'X','SSJ2 Aura','https://www.myinstants.com/media/sounds/super-saiyan-2.mp3');
bank[8] = new banking(67, 'C','Whoosh','https://www.myinstants.com/media/sounds/123_7G7G85U.mp3');


//React component(single pads)
class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      padStyle: soundOffPad
    }
    this.activateSoundEffect = this.activateSoundEffect.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.activatePad = this.activatePad.bind(this);
  }
    componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(x) {
    if (x.keyCode === this.props.keyCode) {
      this.activateSoundEffect();  }}
  
  activatePad() {
      this.state.padStyle.backgroundColor === 'orange' ?
        this.setState({
          padStyle: soundOffPad
        }) :
        this.setState({
          padStyle: soundOnPad
        });} 
  
  activateSoundEffect() {
    const sound = document.getElementById(this.props.keyTrigger);
    sound.currentTime = 0;
    sound.play();
    this.activatePad();
    setTimeout(() => this.activatePad(), 200);
    this.props.updateDisplay(this.props.clipId);
  }
  render() {
    return (
      <div id={this.props.clipId} 
        onClick={this.activateSoundEffect} 
        className="drum-pad" 
        style={this.state.padStyle} >
          <audio className='clip' id={this.props.keyTrigger} src={this.props.clip}></audio>
          {this.props.keyTrigger}
      </div>
    )}}
//React components-nesting single pads into the body
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    display: String.fromCharCode(160)
    }
    this.displayClipName = this.displayClipName.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
  }
  displayClipName(name) {
      this.setState({
        display: name
      });
  }
  
  clearDisplay() {
    this.setState({
   display: String.fromCharCode(160)
    });
  }
  render() {
     let padBank;
      padBank = bank.map((drumObj, i, padBankArr) => {
        return (
          <DrumPad 
            clipId={padBankArr[i].id} 
            clip={padBankArr[i].url}
            keyTrigger={padBankArr[i].keyTrigger}
            keyCode={padBankArr[i].keyCode} 
     updateDisplay={this.displayClipName}   
             />
        )
      })
    return (
      <div id="drum-machine" className="inner-container">
        <div id="title"><p>Dragon Ball Sound Generator</p></div>
         <div className="pad-bank">
        {padBank}
           
      </div>
        <div className="controls-container">    
          <p id="display">
            {this.state.display}
          </p>    
        </div>
      </div>
  )}}

ReactDOM.render(
  <App />,
  document.getElementById('dbapp')
);