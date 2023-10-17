import React, { Component } from 'react';
import './styles.css';
import data from './2_TopicsToEmotions500.json';
// import Switch from './Switch.js'
import './Switch.css';

class App extends Component {

constructor(props) {
  super(props);

  this.state = {
    email: '',
    password: '',
    author: '',
    tableData: data.data,
    test:1,
    selected:[1,'',[],[],''],  // [show experiences on/off, topic, topic-emotion list (full), topic-emotion list (random 10), emotion
    numbers: 1,
    mouseTopic: '',
    mouseEmotion: '',
    sortEmotion: 'Topic',
    sortDirection: 'Ascending',
    percentile: '',
    count: '',
  };

  // this.signUp = this.signUp.bind(this);
  this.useSortableData = this.useSortableData.bind(this);
  this.ProductTable = this.ProductTable.bind(this);
  this.generateRandomExperiences = this.generateRandomExperiences.bind(this);
  this.shuffle = this.shuffle.bind(this);
  this.handleExpandExperiences = this.handleExpandExperiences.bind(this);
  this.toggleNumbers= this.toggleNumbers.bind(this);
  this.Switch = this.Switch.bind(this);



}

Switch ({ isOn, handleToggle}){
  return (
    <>
      <input
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
        onChange={() => this.setState({numbers:this.state.numbers*-1})}
      />
      <label
        style={{ background: isOn && this.state.numbers>0?('lightsalmon'):('gray') }}
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

toggleNumbers(){
  this.setState({numbers: -1 *this.state.numbers});
  console.log(this.state.numbers)

}
shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

handleExpandExperiences(topic,emotion){
  let e = this.state.selected[1].split(':')[0]
  let t = this.state.selected[1].split(':')[1]

  console.log(e,t)
  if(e === emotion && t === topic){
    return(
      -1*this.state.selected[0]
    )
  } else{
    return(
      this.state.selected[0]
    )
  }


}

generateRandomExperiences(){
  console.log(this.state)
  const shuffled =this.shuffle(this.state.selected[2])
  let selectedExperiences = shuffled.slice(0, 10);

  this.setState({selected: [this.state.selected[0], this.state.selected[1], this.state.selected[2], selectedExperiences, this.state.selected[4], this.state.selected[5]]});
}


useSortableData (items, config = null) {
  const [sortConfig, setSortConfig] = React.useState(config);
  // console.log(sortConfig)
  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      let temp = sortConfig.key.split('Coun')[0];
      let emotion = temp.charAt(0).toUpperCase() + temp.slice(1);

      let direction = sortConfig.direction.charAt(0).toUpperCase() +  sortConfig.direction.slice(1)

      this.setState({sortEmotion: emotion, sortDirection: direction})

      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'descending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'descending'
    ) {
      direction = 'ascending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

ProductTable (props) {

  const { items, requestSort, sortConfig } = this.useSortableData(props.products);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  console.log(this.state)
  return (
    <>
      <div id="ProjectInfo">
        <div id="ProjectTitle">Mapping the Emotional Landscape of Maternity: An Interactive Data Visualization</div>
      </div>

      <div id="sticky-div">
      <div id="legend">
        <div id ='sorted'>
              Topics Sorted by <span style={{color:'lightsalmon'}}>{this.state.sortEmotion } ({this.state.sortDirection})</span> 
            </div>
            <div id='switch'>

              <this.Switch 
              onClick={() => this.setState({numbers:this.state.numbers*-1})}
              isOn={1}
              />
              <div style={{margin:'10px'}}>{this.state.numbers> 0?('Numbers On'):('Numbers Off')}</div>

            </div>
          </div>
          <div id="gradient">
           <img alt="my_gradient colormap" title="my_gradient" style={{width:'400px', height:'20px'}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAABACAYAAABsv8+/AAAAGnRFWHRUaXRsZQBteV9ncmFkaWVudCBjb2xvcm1hcPLO8YkAAAAgdEVYdERlc2NyaXB0aW9uAG15X2dyYWRpZW50IGNvbG9ybWFwY9C13wAAADB0RVh0QXV0aG9yAE1hdHBsb3RsaWIgdjMuOC4wLCBodHRwczovL21hdHBsb3RsaWIub3Jnn3P4TwAAADJ0RVh0U29mdHdhcmUATWF0cGxvdGxpYiB2My44LjAsIGh0dHBzOi8vbWF0cGxvdGxpYi5vcmex1WdoAAACPElEQVR4nO3WwXKbMBiFUaRJ0lU3fae8/8u0S5cskEn4BY0z2fWes6iChADbTOdrP3+9rst/pW3/tov5/bCdrH74q13MT6fVGz14//Ic0/z0HPMZ2/aL+fkDnF/nm99DvX8rn/Ny/eJztfJ9XK+f/55136frnz5H/X3O933/Oca4Huf7Up/juP/h9fX8vD4951fX6+99HPf9989X3qfeyvo0X+7fyvrF9d/ve1yf58/Xe3tsrM/z1f3TdS72P40/nurxPo75caHnXveV88r+3v5uY18Px20/HmM/ntfq/DhuvV7veF4b11/uY7+V+dvhOvfjZX+u2/G8sm/Z7/Pvfe/z43B/j8q4f0/lPe4X55d90/tf5ucXt4wX8+t9/mX8x/G8jet0PD7njz/b+PL7cFkAIIgAAIBAAgAAAgkAAAgkAAAgkAAAgEACAAACCQAACCQAACCQAACAQAIAAAIJAAAIJAAAIJAAAIBAAgAAAgkAAAgkAAAgkAAAgEACAAACCQAACCQAACCQAACAQAIAAAIJAAAIJAAAIJAAAIBAAgAAAgkAAAgkAAAgkAAAgEACAAACCQAACCQAACCQAACAQAIAAAIJAAAIJAAAIJAAAIBAAgAAAgkAAAgkAAAgkAAAgEACAAACCQAACCQAACCQAACAQAIAAAIJAAAIJAAAIJAAAIBAAgAAAgkAAAgkAAAgkAAAgEACAAACCQAACCQAACCQAACAQAIAAAIJAAAIJAAAIJAAAIBAAgAAAr0BPjUvjGdxh5AAAAAASUVORK5CYII="/>

            {/* <img alt="my_gradient colormap" title="my_gradient" style={{width:'400px', height:'20px'}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAABACAYAAABsv8+/AAAAGnRFWHRUaXRsZQBteV9ncmFkaWVudCBjb2xvcm1hcPLO8YkAAAAgdEVYdERlc2NyaXB0aW9uAG15X2dyYWRpZW50IGNvbG9ybWFwY9C13wAAADB0RVh0QXV0aG9yAE1hdHBsb3RsaWIgdjMuOC4wLCBodHRwczovL21hdHBsb3RsaWIub3Jnn3P4TwAAADJ0RVh0U29mdHdhcmUATWF0cGxvdGxpYiB2My44LjAsIGh0dHBzOi8vbWF0cGxvdGxpYi5vcmex1WdoAAACK0lEQVR4nO3WwVLbMBiF0T9mAe//bLxD1007wAxt1EUSM5ZtopSues/ZGMuyFCdAvsPzt9dWVVVtcajLYf7h4/zWvOX1/v7W3TCvM48vz1u3wHrftr3+at/lBvfO61/3z5ffVVV1PL5XVdX3H7/Ox/n8ffv6Zfw677h733n88HBaHKfr+dSPt8X41N03z5vvazvje/u07XVX+7XN9YbX3Xv9U/ecu8+1/X4Mv3876/Xjj9N5/uOhuvO2OH/qzvvrfzv/aXD/9fzl9YePv6TPjU5bzbtx4+jlm/v3/0AGtxt8rlsv5Ovr9sOjDzC27u5t6w9saN17P47RD/r+dT9faPjphn+/L983p+uxuvN/dP389VKnt73j4UvX2+U4jT02APA/EQAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAECgP2V0DNCOqRfGAAAAAElFTkSuQmCC" /> */}
        
            {this.state.count !== '' && this.state.percentile !== '' ?(
             <>
             <span style={{color:'white',width:'10px',fontSize:'10px',position:'left',marginLeft: (this.state.percentile-2.5) *4,transition: 'all 0.5s ease-in'}}
              >△ 
              </span>
              <span style={{color:'rgb(243, 243, 243)',fontSize:'8px', fontWeight:'bold',position:'left', transition: 'all 0.5s ease-in'}}> {this.state.count} experiences for <span style ={{color:'lightsalmon'}}>{this.state.mouseTopic}: {this.state.mouseEmotion} </span>(Percentile: {this.state.percentile})</span>
              </>
            ):(
            <>
              <span style={{color:'white', opacity: '0',width:'10px',fontSize:'10px',position:'left',marginLeft: (this.state.percentile-4) *4,transition: 'all 0.5s ease-in'}}>△ </span>
             <span style={{color:'lightsalmon', opacity: '0',fontSize:'8px', fontWeight:'bold',position:'left'}}>''</span>

            </>
            )}

         </div>
          <div>

          <thead >
          <tr>
            <th >
              <button
                id="sortButton"
                style={{ 
                  color: this.state.mouseEmotion === 'frustration' ? ('#282828'):('rgb(243, 243, 243)'),
                  background: this.state.mouseEmotion === 'frustration' ? ('lightsalmon'):('#282828'),
                  transition: 'all 0.5s ease-in'
                }}
                onClick={() => requestSort('frustrationCount')}
                className={getClassNamesFor('frustrationCount')}
              >
            Frustration
              </button>
            </th>
            <th>
              <button
                id="sortButton"
                onClick={() => requestSort('fearCount')}
                style={{ 
                  color: this.state.mouseEmotion === 'fear' ? ('#282828'):('rgb(243, 243, 243)'),
                  background: this.state.mouseEmotion === 'fear' ? ('lightsalmon'):('#282828'),
                  transition: 'all 0.5s ease-in'
                }}
                className={getClassNamesFor('fearCount')}
              >
                Fear
              </button>
            </th>
            <th>
              <button
                id="sortButton"
                onClick={() => requestSort('shameCount')}
                style={{ 
                  color: this.state.mouseEmotion === 'shame' ? ('#282828'):('rgb(243, 243, 243)'),
                  background: this.state.mouseEmotion === 'shame' ? ('lightsalmon'):('#282828'),
                  transition: 'all 0.5s ease-in'
                }}
                className={getClassNamesFor('shameCount')}
              >
                Shame
              </button>
            </th>
            <th>
              <button
                id="sortButton"
                onClick={() => requestSort('anxietyCount')}
                style={{ 
                  color: this.state.mouseEmotion === 'anxiety' ? ('#282828'):('rgb(243, 243, 243)'),
                  background: this.state.mouseEmotion === 'anxiety' ? ('lightsalmon'):('#282828'),
                  transition: 'all 0.5s ease-in'
                }}
                className={getClassNamesFor('anxietyCount')}
              >
                Anxiety
              </button>
            </th>
            <th>
              <button
                id="sortButton"
                onClick={() => requestSort('sadnessCount')}
                style={{ 
                  color: this.state.mouseEmotion === 'sadness' ? ('#282828'):('rgb(243, 243, 243)'),
                  background: this.state.mouseEmotion === 'sadness' ? ('lightsalmon'):('#282828'),
                  transition: 'all 0.5s ease-in'
                }}
                className={getClassNamesFor('sadnessCount')}
              >
                Sadness
              </button>
            </th>
            <th>
              <button
                id="sortButton"
                onClick={() => requestSort('angerCount')}
                style={{ 
                  color: this.state.mouseEmotion === 'anger' ? ('#282828'):('rgb(243, 243, 243)'),
                  background: this.state.mouseEmotion === 'anger' ? ('lightsalmon'):('#282828'),
                  transition: 'all 0.5s ease-in'
                }}
                className={getClassNamesFor('angerCount')}
              >
                Anger
              </button>
            </th>
            <th>
              <button
                id="sortButtonTopic"
                onClick={() => requestSort('topic')}
                className={getClassNamesFor('topic')}
              >
                Topic
              </button>
            </th>
            <th>
              <button
                id="sortButton"
                onClick={() => requestSort('excitementCount')}
                style={{ 
                  color: this.state.mouseEmotion === 'excitement' ? ('#282828'):('rgb(243, 243, 243)'),
                  background: this.state.mouseEmotion === 'excitement' ? ('lightsalmon'):('#282828'),
                  transition: 'all 0.5s ease-in'
                }}
                className={getClassNamesFor('excitementCount')}
              >
                Excitement
              </button>
            </th>
            <th>
              <button
                id="sortButton"
                onClick={() => requestSort('desireCount')}
                className={getClassNamesFor('desireCount')}
                style={{ 
                  color: this.state.mouseEmotion === 'desire' ? ('#282828'):('rgb(243, 243, 243)'),
                  background: this.state.mouseEmotion === 'desire' ? ('lightsalmon'):('#282828'),
                  transition: 'all 0.5s ease-in'
                }}
              >
                Desire
              </button>
            </th>
            <th>
              <button
                id="sortButton"
                onClick={() => requestSort('surpriseCount')}
                className={getClassNamesFor('surpriseCount')}
                style={{ 
                  color: this.state.mouseEmotion === 'surprise' ? ('#282828'):('rgb(243, 243, 243)'),
                  background: this.state.mouseEmotion === 'surprise' ? ('lightsalmon'):('#282828'),
                  transition: 'all 0.5s ease-in'
                }}
              >
                Surprise
              </button>
            </th>
            <th>
              <button
                id="sortButton"
                onClick={() => requestSort('happinessCount')}
                className={getClassNamesFor('happinessCount')}
                style={{ 
                  color: this.state.mouseEmotion === 'happiness' ? ('#282828'):('rgb(243, 243, 243)'),
                  background: this.state.mouseEmotion === 'happiness' ? ('lightsalmon'):('#282828'),
                  transition: 'all 0.5s ease-in'
                }}
              >
                Happiness
              </button>
            </th>
            <th>
              <button
                id="sortButton"
                onClick={() => requestSort('gratitudeCount')}
                className={getClassNamesFor('gratitudeCount')}
                style={{ 
                  color: this.state.mouseEmotion === 'gratitude' ? ('#282828'):('rgb(243, 243, 243)'),
                  background: this.state.mouseEmotion === 'gratitude' ? ('lightsalmon'):('#282828'),
                  transition: 'all 0.5s ease-in'
                }}
              >
                Gratitude
              </button>
            </th>
            <th>
              <button
                id="sortButton"
                onClick={() => requestSort('loveCount')}
                className={getClassNamesFor('loveCount')}
                style={{ 
                  color: this.state.mouseEmotion === 'love' ? ('#282828'):('rgb(243, 243, 243)'),
                  background: this.state.mouseEmotion === 'love' ? ('lightsalmon'):('#282828'),
                  transition: 'all 0.5s ease-in'
                }}
              >
                Love
              </button>
            </th>
            </tr>
            </thead>
            </div>
          </div>

    <table >
      {/* <caption>Placeholder Title and Caption</caption> */}
      <div id='vFlex'>

      <tbody>

        {items.map((item, index) => (
          
          (this.state.selected[0] >0) ? (
            <div id='vFlex'>

              <tr key={item.id}>
                <td id="invisible">
                    <button
                    id="cell" 
                    style={{background:item.frustrationColor}}
                    // onClick={() => this.setState({selected: [this.handleExpandExperiences(item.topic, ')frustration', item.topic, item.frustration, item.frustration]} )}
                    onClick={() => this.setState({selected: [-1*this.state.selected[0], item.topic, item.frustration, item.frustration,'frustration']} )}
                    onMouseLeave={()=>this.setState({mouseTopic: '', mouseEmotion: '',percentile:'',count:''})}
                    onMouseOverCapture={()=>this.setState({mouseTopic: item.topic, mouseEmotion: 'frustration', percentile: item.frustrationPercentile, count:item.frustrationCount})}

                   >

                      {this.state.numbers> 0?('ㅤ' + item.frustrationCount + 'ㅤ'):('ㅤ')}

                  </button>
                </td>

                <td id="invisible">
                    <button
                    id="cell" 
                    style={{background:item.fearColor}}
                    onClick={() => this.setState({selected: [-1*this.state.selected[0], item.topic, item.fear, item.fear,'fear']} )}
                    onMouseLeave={()=>this.setState({mouseTopic: '', mouseEmotion: '',percentile:'',count:''})}
                    onMouseOverCapture={()=>this.setState({mouseTopic: item.topic, mouseEmotion: 'fear', percentile: item.fearPercentile, count:item.fearCount})}
                    >
                      {this.state.numbers> 0?('ㅤ' + item.fearCount + 'ㅤ'):('ㅤ')}
                  </button>
                </td>

                <td id="invisible">
                    <button
                    id="cell" 
                    style={{background:item.shameColor}}
                    onClick={() => this.setState({selected: [-1*this.state.selected[0], item.topic, item.shame, item.shame,'shame']} )}
                    onMouseLeave={()=>this.setState({mouseTopic: '', mouseEmotion: '',percentile:'',count:''})}
                    onMouseOverCapture={()=>this.setState({mouseTopic: item.topic, mouseEmotion: 'shame', percentile: item.shamePercentile, count:item.shameCount})}

                    >
                      {this.state.numbers> 0?('ㅤ' + item.shameCount + 'ㅤ'):('ㅤ')}

                  </button>
                </td>

                <td id="invisible">
                    <button
                    id="cell" 
                    style={{background:item.anxietyColor}}
                    onClick={() => this.setState({selected: [-1*this.state.selected[0], item.topic, item.anxiety,item.anxiety,'anxiety']} )}
                    onMouseLeave={()=>this.setState({mouseTopic: '', mouseEmotion: '',percentile:'',count:''})}
                    onMouseOverCapture={()=>this.setState({mouseTopic: item.topic, mouseEmotion: 'anxiety', percentile: item.anxietyPercentile, count:item.anxietyCount})}

                    >
                      {this.state.numbers> 0?('ㅤ'+ item.anxietyCount + 'ㅤ'):('ㅤ')}
                  </button>
                </td>

                <td id="invisible">
                    <button
                    id="cell" 
                    style={{background:item.sadnessColor}}
                    onClick={() => this.setState({selected: [-1*this.state.selected[0], item.topic, item.sadness, item.sadness,'sadness']} )}
                    onMouseLeave={()=>this.setState({mouseTopic: '', mouseEmotion: '',percentile:'',count:''})}
                    onMouseOverCapture={()=>this.setState({mouseTopic: item.topic, mouseEmotion: 'sadness', percentile: item.sadnessPercentile, count:item.sadnessCount})}

                    >
                      {this.state.numbers> 0?('ㅤ' + item.sadnessCount +'ㅤ'):('ㅤ')}
                  </button>
                </td>

                <td id="invisible">
                    <button
                    id="cell" 
                    style={{background:item.angerColor}}
                    onClick={() => this.setState({selected: [-1*this.state.selected[0], item.topic, item.anger, item.anger,'anger']} )}
                    onMouseLeave={()=>this.setState({mouseTopic: '', mouseEmotion: '',percentile:'',count:''})}
                    onMouseOverCapture={()=>this.setState({mouseTopic: item.topic, mouseEmotion: 'anger', percentile: item.angerPercentile, count:item.angerCount})}

                    >
                      {this.state.numbers> 0?('ㅤ' + item.angerCount+ 'ㅤ'):('ㅤ')}
                  </button>
                </td>

                <td id="invisible" >
                  <button
                    id="topic" 
                    // style={{background:item.angerColor}}
                    // onMouseLeave={()=>this.setState({mouseTopic: '', mouseEmotion: ''})}
                    // onMouseOverCapture={()=>this.setState({mouseTopic: item.topic, mouseEmotion: 'topic'})}
                    style={{ 
                      color: this.state.mouseTopic === item.topic ? ('#282828'):('black'),
                      background: this.state.mouseTopic === item.topic ? ('lightsalmon'):('lightgray'),
                      transition: 'all 0.5s ease-in'
                    }}
              
                    // onClick={() => this.setState({selected: [-1*this.state.selected[0], item.topic, item.anger]} )}
                    >
                    <span style={{fontSize:'7px'}}>{index+1}.</span>ㅤ{item.topic}
                  </button>
                  
                </td>

                <td id="invisible">
                    <button
                    id="cell" 
                    style={{background:item.excitementColor}}
                    onClick={() => this.setState({selected: [-1*this.state.selected[0], item.topic, item.excitement, item.excitement,'excitement']} )}
                    onMouseLeave={()=>this.setState({mouseTopic: '', mouseEmotion: '',percentile:'',count:''})}
                    onMouseOverCapture={()=>this.setState({mouseTopic: item.topic, mouseEmotion: 'excitement', percentile: item.excitementPercentile, count:item.excitementCount})}

                    >
                      {this.state.numbers> 0?('ㅤ' + item.excitementCount + 'ㅤ'):('ㅤ')}
                  </button>
                </td>


                <td id="invisible">
                    <button
                    id="cell" 
                    style={{background:item.desireColor}}
                    onClick={() => this.setState({selected: [-1*this.state.selected[0], item.topic, item.desire, item.desire,'desire']} )}
                    onMouseLeave={()=>this.setState({mouseTopic: '', mouseEmotion: '',percentile:'',count:''})}
                    onMouseOverCapture={()=>this.setState({mouseTopic: item.topic, mouseEmotion: 'desire', percentile: item.desirePercentile, count:item.desireCount})}

                    >
                      {this.state.numbers> 0?('ㅤ' + item.desireCount + 'ㅤ'):('ㅤ')}
                  </button>
                </td>


                <td id="invisible">
                    <button
                    id="cell" 
                    style={{background:item.surpriseColor}}
                    onClick={() => this.setState({selected: [-1*this.state.selected[0], item.topic, item.surprise, item.surprise,'surprise']} )}
                    onMouseLeave={()=>this.setState({mouseTopic: '', mouseEmotion: '',percentile:'',count:''})}
                    onMouseOverCapture={()=>this.setState({mouseTopic: item.topic, mouseEmotion: 'surprise', percentile: item.surprisePercentile, count:item.surpriseCount})}

                    >
                      {this.state.numbers> 0?('ㅤ' + item.surpriseCount + 'ㅤ'):('ㅤ')}
                  </button>
                </td>


                <td id="invisible">
                    <button
                    id="cell" 
                    style={{background:item.happinessColor}}
                    onClick={() => this.setState({selected: [-1*this.state.selected[0], item.topic, item.happiness, item.happiness, 'happiness']} )}
                    onMouseLeave={()=>this.setState({mouseTopic: '', mouseEmotion: '',percentile:'',count:''})}
                    onMouseOverCapture={()=>this.setState({mouseTopic: item.topic, mouseEmotion: 'happiness', percentile: item.happinessPercentile, count:item.happinessCount})}

                    >
                      {this.state.numbers> 0?('ㅤ' + item.happinessCount+'ㅤ'):('ㅤ')}
                  </button>
                </td>


                <td id="invisible">
                    <button
                    id="cell" 
                    style={{background:item.gratitudeColor}}
                    onClick={() => this.setState({selected: [-1*this.state.selected[0], item.topic, item.gratitude, item.gratitude, 'gratitude']} )}
                    onMouseLeave={()=>this.setState({mouseTopic: '', mouseEmotion: '',percentile:'',count:''})}
                    onMouseOverCapture={()=>this.setState({mouseTopic: item.topic, mouseEmotion: 'gratitude', percentile: item.gratitudePercentile, count:item.gratitudeCount})}

                    >
                      {this.state.numbers> 0?('ㅤ'+item.gratitudeCount+'ㅤ'):('ㅤ')}
                  </button>
                </td>


                <td id="invisible">
                    <button
                    id="cell" 
                    style={{background:item.loveColor}}
                    onClick={() => this.setState({selected: [-1*this.state.selected[0], item.topic, item.love, item.love, 'love']} )}
                    onMouseLeave={()=>this.setState({mouseTopic: '', mouseEmotion: '',percentile:'',count:''})}
                    onMouseOverCapture={()=>this.setState({mouseTopic: item.topic, mouseEmotion: 'love', percentile: item.lovePercentile, count:item.loveCount})}

                    >
                      {this.state.numbers> 0?('ㅤ'+item.loveCount+'ㅤ'):('ㅤ')}
                  </button>
                </td>
                {/* <td id="element" style={{background:item.frustrationColor}}>{item.frustrationCount}</td> */}
        
  
            </tr>
            </div>
          ) : (
          <div id='vFlex'>
            
            <tr key={item.id}>
                <td id="invisible">
                  
                    <button
                    id="cell" 
                    style={{ background: this.state.selected[1] === item.topic && this.state.selected[4] === 'frustration' ?('rgb(67, 67, 67)'):(item.frustrationColor)}}

                    // style={{background: this.state.selected[1] === item.topic && this.state.selected[2] ==='frustation' ? ('rgb(67, 67, 67)') : (item.frustrationColor)}}
                    // onClick={() => this.setState({selected: [this.handleExpandExperiences(item.topic, ')frustration', item.topic, item.frustration, item.frustration]} )}
                    onClick={() => this.setState({selected: [-1*this.state.selected[0], item.topic, item.frustration, item.frustration, '']} )}
                    onMouseLeave={()=>this.setState({mouseTopic: '', mouseEmotion: '',percentile:'',count:''})}
                    onMouseOverCapture={()=>this.setState({mouseTopic: item.topic, mouseEmotion: 'frustration', percentile: item.frustrationPercentile, count:item.frustrationCount})}


                   >

                      {this.state.numbers> 0?('ㅤ' + item.frustrationCount + 'ㅤ'):('ㅤ')}

                  </button>
                </td>

                <td id="invisible">
                    <button
                    id="cell" 
                    style={{ background: this.state.selected[1] === item.topic && this.state.selected[4] === 'fear' ?('rgb(67, 67, 67)'):(item.fearColor)}}
                    onClick={() => this.setState({selected: [-1*this.state.selected[0], item.topic, item.fear, item.fear, '']} )}
                    onMouseLeave={()=>this.setState({mouseTopic: '', mouseEmotion: '',percentile:'',count:''})}
                    onMouseOverCapture={()=>this.setState({mouseTopic: item.topic, mouseEmotion: 'fear', percentile: item.fearPercentile, count:item.fearCount})}

                    >
                      {this.state.numbers> 0?('ㅤ' + item.fearCount + 'ㅤ'):('ㅤ')}
                  </button>
                </td>

                <td id="invisible">
                    <button
                    id="cell" 
                    style={{ background: this.state.selected[1] === item.topic && this.state.selected[4] === 'shame' ?('rgb(67, 67, 67)'):(item.shameColor)}}
                    onClick={() => this.setState({selected: [-1*this.state.selected[0], item.topic, item.shame, item.shame]} )}
                    onMouseLeave={()=>this.setState({mouseTopic: '', mouseEmotion: '',percentile:'',count:''})}
                    onMouseOverCapture={()=>this.setState({mouseTopic: item.topic, mouseEmotion: 'shame', percentile: item.shamePercentile, count:item.shameCount})}

                    >
                      {this.state.numbers> 0?('ㅤ' + item.shameCount + 'ㅤ'):('ㅤ')}

                  </button>
                </td>

                <td id="invisible">
                    <button
                    id="cell" 
                    style={{ background: this.state.selected[1] === item.topic && this.state.selected[4] === 'anxiety' ?('rgb(67, 67, 67)'):(item.anxietyColor)}}
                    onClick={() => this.setState({selected: [-1*this.state.selected[0], item.topic, item.anxiety,item.anxiety]} )}
                    onMouseLeave={()=>this.setState({mouseTopic: '', mouseEmotion: '',percentile:'',count:''})}
                    onMouseOverCapture={()=>this.setState({mouseTopic: item.topic, mouseEmotion: 'anxiety', percentile: item.anxietyPercentile, count:item.anxietyCount})}

                    >
                      {this.state.numbers> 0?('ㅤ'+ item.anxietyCount + 'ㅤ'):('ㅤ')}
                  </button>
                </td>

                <td id="invisible">
                    <button
                    id="cell" 
                    style={{ background: this.state.selected[1] === item.topic && this.state.selected[4] === 'sadness' ?('rgb(67, 67, 67)'):(item.sadnessColor)}}
                    onClick={() => this.setState({selected: [-1*this.state.selected[0], item.topic, item.sadness, item.sadness]} )}
                    onMouseLeave={()=>this.setState({mouseTopic: '', mouseEmotion: '',percentile:'',count:''})}
                    onMouseOverCapture={()=>this.setState({mouseTopic: item.topic, mouseEmotion: 'sadness', percentile: item.sadnessPercentile, count:item.sadnessCount})}

                    >
                      {this.state.numbers> 0?('ㅤ' + item.sadnessCount +'ㅤ'):('ㅤ')}
                  </button>
                </td>

                <td id="invisible">
                    <button
                    id="cell" 
                    style={{ background: this.state.selected[1] === item.topic && this.state.selected[4] === 'anger' ?('rgb(67, 67, 67)'):(item.angerColor)}}
                    onClick={() => this.setState({selected: [-1*this.state.selected[0], item.topic, item.anger, item.anger]} )}
                    onMouseLeave={()=>this.setState({mouseTopic: '', mouseEmotion: '',percentile:'',count:''})}
                    onMouseOverCapture={()=>this.setState({mouseTopic: item.topic, mouseEmotion: 'anger', percentile: item.angerPercentile, count:item.angerCount})}

                    >
                      {this.state.numbers> 0?('ㅤ' + item.angerCount+ 'ㅤ'):('ㅤ')}
                  </button>
                </td>

                <td id="invisible" >
                  <button
                    id="topic" 
                    // style={{background:item.angerColor}}
                    // onMouseLeave={()=>this.setState({mouseTopic: '', mouseEmotion: ''})}
                    // onMouseOverCapture={()=>this.setState({mouseTopic: item.topic, mouseEmotion: 'topic'})}
                    style={{ 
                      color: this.state.mouseTopic === item.topic ? ('#282828'):('black'),
                      background: this.state.mouseTopic === item.topic ? ('lightsalmon'):('lightgray'),
                      transition: 'all 0.5s ease-in'
                    }}
              
                    // onClick={() => this.setState({selected: [-1*this.state.selected[0], item.topic, item.anger]} )}
                    >
                    <span style={{fontSize:'7px'}}>{index+1}.</span>ㅤ{item.topic}
                  </button>
                  
                </td>

                <td id="invisible">
                    <button
                    id="cell" 
                    style={{ background: this.state.selected[1] === item.topic && this.state.selected[4] === 'excitement' ?('rgb(67, 67, 67)'):(item.excitementColor)}}
                    onClick={() => this.setState({selected: [-1*this.state.selected[0], item.topic, item.excitement, item.excitement]} )}
                    onMouseLeave={()=>this.setState({mouseTopic: '', mouseEmotion: '',percentile:'',count:''})}
                    onMouseOverCapture={()=>this.setState({mouseTopic: item.topic, mouseEmotion: 'excitement', percentile: item.excitementPercentile, count:item.excitementCount})}

                    >
                      {this.state.numbers> 0?('ㅤ' + item.excitementCount + 'ㅤ'):('ㅤ')}
                  </button>
                </td>


                <td id="invisible">
                    <button
                    id="cell" 
                    style={{ background: this.state.selected[1] === item.topic && this.state.selected[4] === 'desire' ?('rgb(67, 67, 67)'):(item.desireColor)}}
                    onClick={() => this.setState({selected: [-1*this.state.selected[0], item.topic, item.desire, item.desire]} )}
                    onMouseLeave={()=>this.setState({mouseTopic: '', mouseEmotion: '',percentile:'',count:''})}
                    onMouseOverCapture={()=>this.setState({mouseTopic: item.topic, mouseEmotion: 'desire', percentile: item.desirePercentile, count:item.desireCount})}

                    >
                      {this.state.numbers> 0?('ㅤ' + item.desireCount + 'ㅤ'):('ㅤ')}
                  </button>
                </td>


                <td id="invisible">
                    <button
                    id="cell" 
                    style={{ background: this.state.selected[1] === item.topic && this.state.selected[4] === 'surprise' ?('rgb(67, 67, 67)'):(item.surpriseColor)}}
                    onClick={() => this.setState({selected: [-1*this.state.selected[0], item.topic, item.surprise, item.surprise]} )}
                    onMouseLeave={()=>this.setState({mouseTopic: '', mouseEmotion: '',percentile:'',count:''})}
                    onMouseOverCapture={()=>this.setState({mouseTopic: item.topic, mouseEmotion: 'surprise', percentile: item.surprisePercentile, count:item.surpriseCount})}

                    >
                      {this.state.numbers> 0?('ㅤ' + item.surpriseCount + 'ㅤ'):('ㅤ')}
                  </button>
                </td>


                <td id="invisible">
                    <button
                    id="cell" 
                    style={{ background: this.state.selected[1] === item.topic && this.state.selected[4] === 'happiness' ?('rgb(67, 67, 67)'):(item.happinessColor)}}
                    onClick={() => this.setState({selected: [-1*this.state.selected[0], item.topic, item.happiness, item.happiness]} )}
                    onMouseLeave={()=>this.setState({mouseTopic: '', mouseEmotion: '',percentile:'',count:''})}
                    onMouseOverCapture={()=>this.setState({mouseTopic: item.topic, mouseEmotion: 'happiness', percentile: item.happinessPercentile, count:item.happinessCount})}

                    >
                      {this.state.numbers> 0?('ㅤ' + item.happinessCount+'ㅤ'):('ㅤ')}
                  </button>
                </td>


                <td id="invisible">
                    <button
                    id="cell" 
                    style={{ background: this.state.selected[1] === item.topic && this.state.selected[4] === 'gratitude' ?('rgb(67, 67, 67)'):(item.gratitudeColor)}}
                    onClick={() => this.setState({selected: [-1*this.state.selected[0], item.topic, item.gratitude, item.gratitude]} )}
                    onMouseLeave={()=>this.setState({mouseTopic: '', mouseEmotion: '',percentile:'',count:''})}
                    onMouseOverCapture={()=>this.setState({mouseTopic: item.topic, mouseEmotion: 'gratitude', percentile: item.gratitudePercentile, count:item.gratitudeCount})}

                    >
                      {this.state.numbers> 0?('ㅤ'+item.gratitudeCount+'ㅤ'):('ㅤ')}
                  </button>
                </td>


                <td id="invisible">
                    <button
                    id="cell" 
                    style={{ background: this.state.selected[1] === item.topic && this.state.selected[4] === 'love' ?('rgb(67, 67, 67)'):(item.loveColor)}}
                    onClick={() => this.setState({selected: [-1*this.state.selected[0], item.topic, item.love, item.love]} )}
                    onMouseLeave={()=>this.setState({mouseTopic: '', mouseEmotion: '',percentile:'',count:''})}
                    onMouseOverCapture={()=>this.setState({mouseTopic: item.topic, mouseEmotion: 'love', percentile: item.lovePercentile, count:item.loveCount})}

                    >
                      {this.state.numbers> 0?('ㅤ'+item.loveCount+'ㅤ'):('ㅤ')}
                  </button>
                </td>
                {/* <td id="element" style={{background:item.frustrationColor}}>{item.frustrationCount}</td> */}
        
  
            </tr>
            

              {(item.topic === this.state.selected[1]) ?(
              // <tr>
                  <div id ="experienceDropdown">

                    {this.state.selected[2][0] !== undefined ? (
                      <>
                      <div id ="experienceDropDownHeader"> 
                      {this.state.selected[2].length} anecdotal experience{this.state.selected[2].length > 1 ?('s'):('')} for <span style={{color:'lightsalmon'}}>{this.state.selected[2][0][0]}</span>
                      {' '}({this.state.selected[2].length <10 ? (this.state.selected[2].length):('10')} shown below)
                      {this.state.selected[2].length > 10 ? (

                      <button
                          id="generateExperiencesButton"
                          onClick={() => this.generateRandomExperiences()}
                        >
                          View More
                        </button>
             
                      ): ('')}
                       </div>
                      <div id="experienceBox"> 
                      {
                      
                      this.state.selected[2].length <10 ? (

                      
                      this.state.selected[2].map((experience) => (

                      <div id="experience">
                      <a  target="_blank" rel="noopener noreferrer"href={experience[5]}>
                      ◍ {experience[3]}
                      </a>
                      </div>

                      ))
                      ) :
                      (
                        this.state.selected[3].slice(0,10).map((experience) => (

                          <div id="experience">
                          <a  target="_blank" rel="noopener noreferrer"href={experience[5]}>
                          ◍ {experience[3]}
                          </a>
                          </div>
    
                          ))
                      )
                      
                      }
                      
                      </div>
                      </>                 

                    ) : (
                        <div id="experienceDropDownHeader"> 
                           0 anecdotal experiences for <span style={{color:'lightsalmon'}}> {this.state.selected[1]}: {this.state.selected[4]} </span>
                        </div>

                    
                    
                    )}

                

                  </div>
              // </tr>
                

                  
            ) : ('')}

          
            </div>



          )

          // 
        ))}
      </tbody>
      </div>

    </table>
    </>

  );
};





render(){
  console.log(this.state.selected[1], this.state.selected[4]);

return (
  <div className="App">
  
    <this.ProductTable
      products= {this.state.tableData} 
      test ={this.state.test}
      // {[
      //   { id: 1, name: 'Cheese', price: 4.9, stock: 20 },
      //   { id: 2, name: 'Milk', price: 1.9, stock: 32 },
      //   { id: 3, name: 'Yoghurt', price: 2.4, stock: 12 },
      //   { id: 4, name: 'Heavy Cream', price: 3.9, stock: 9 },
      //   { id: 5, name: 'Butter', price: 0.9, stock: 99 },
      //   { id: 6, name: 'Sour Cream ', price: 2.9, stock: 86 },
      //   { id: 7, name: 'Fancy French Cheese 🇫🇷', price: 99, stock: 12 },
      // ]}
    />
  </div>
);
};
}

export default App;

