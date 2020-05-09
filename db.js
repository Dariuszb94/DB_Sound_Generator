//Style for active pad
const soundOnPad = {
  backgroundColor: 'orange' };

//Style for inactive pad
const soundOffPad = {
  backgroundColor: '#828282' };

//creating class for object with sound
class banking {
  constructor(keyCode, keyTrigger, id, url) {
    this.keyCode = keyCode;
    this.keyTrigger = keyTrigger;
    this.id = id;
    this.url = url;
  }};

const bank = []; //declaring object for sound

//declaring 9 pads
bank[0] = new banking(81, 'Q', 'Shoot Arrow', 'http://soundbible.com/mp3/fire_bow_sound-mike-koenig.mp3');
bank[1] = new banking(87, 'W', 'Teleport', 'https://www.myinstants.com/media/sounds/dbz-teleport.mp3');
bank[2] = new banking(69, 'E', 'Air Wrench', 'http://soundbible.com/mp3/Air_Wrench_Short-Lightning_McQue-2139303794.mp3');
bank[3] = new banking(65, 'A', 'Click', 'http://soundbible.com/mp3/Click2-Sebastian-759472264.mp3');
bank[4] = new banking(83, 'S', 'Bright Punch', 'https://www.myinstants.com/media/sounds/dragon-ball-z-golpe-soco-forte-luta-strongpunch.mp3');
bank[5] = new banking(68, 'D', 'Buzzer', 'http://soundbible.com/mp3/Short%20Circuit-SoundBible.com-1450168875.mp3');
bank[6] = new banking(90, 'Z', 'SSJ Aura', 'https://www.myinstants.com/media/sounds/saiyan.mp3');
bank[7] = new banking(88, 'X', 'Punch', 'http://soundbible.com/mp3/punch_or_whack_-Vladimir-403040765.mp3');
bank[8] = new banking(67, 'C', 'Beep', 'http://soundbible.com/mp3/Short%20Beep%20Tone-SoundBible.com-1937840853.mp3');

//React component(single pads)
class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      padStyle: soundOffPad };
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
      this.activateSoundEffect();
    }
  }

  activatePad() {
    this.state.padStyle.backgroundColor === 'orange' ?
    this.setState({
      padStyle: soundOffPad }) :
    this.setState({
      padStyle: soundOnPad });
  }

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
      React.createElement("div", { id: this.props.clipId,
        onClick: this.activateSoundEffect,
        className: "drum-pad",
        style: this.state.padStyle },
      React.createElement("audio", { className: "clip", id: this.props.keyTrigger, src: this.props.clip }),
      this.props.keyTrigger));
  }}

//React components-nesting single pads into the body
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: String.fromCharCode(160) 
    };
    this.displayClipName = this.displayClipName.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
  }
  displayClipName(name) {
    this.setState({
      display: name });
  }

  clearDisplay() {
    this.setState({
      display: String.fromCharCode(160) });

  }
  render() {
    let padBank;
    padBank = bank.map((drumObj, i, padBankArr) => {
      return (
        React.createElement(DrumPad, {
          clipId: padBankArr[i].id,
          clip: padBankArr[i].url,
          keyTrigger: padBankArr[i].keyTrigger,
          keyCode: padBankArr[i].keyCode,
          updateDisplay: this.displayClipName 
        }
       )
      );
    });
    return (
      React.createElement("div", { id: "drum-machine", className: "inner-container" },
      React.createElement("div", { id: "title" }, React.createElement("p", null, "Sound Generator")),
      React.createElement("div", { className: "pad-bank" },
      padBank),
      React.createElement("div", { className: "controls-container" },
      React.createElement("p", { id: "display" },
      this.state.display))));
  }}

ReactDOM.render(
React.createElement(App, null),
document.getElementById('dbapp'));
//# sourceURL=pen.js
