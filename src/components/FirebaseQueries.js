import React from 'react'

class FirebaseQueries extends React.Component {


  // checks the field in the database of /lastDraw

  testFirebase = () => {
    let test = firebase.database().ref('/lastDraw').once('value')
      .then( data => console.log('data', data.val()  ) );

    console.log(test);
  };

  firebaseSet = (r, c) => {
    firebase.database().ref('/lastDraw').set({
      row: r,
      col: c,
      color: this.state.color
    });
  }

  firebaseSetPixel = (r, c) => {
    firebase.database().ref(`/grid/${r}${c}`).set({
      row: r,
      col: c,
      color: this.state.color
    });
  }

  firebaseLastDrawListen = () => {
    let listen = firebase.database().ref('/lastDraw');
    listen.on('value', (snapshot) => {
      let data = snapshot.val()
      // console.log('firebaseListen', data.row, data.col);
      console.log(data);
      if (this.state.firstDraw === false) {
        this.firebasePaint( data.row, data.col, data.color )
      }
      console.log('first message');
      this.setState({ firstDraw: false })
    })
  }

  firebaseGridListen = () => {
    // let listen = firebase.database().ref('/grid');
    // listen.on('value', (snapshot) => {
    //   let data = snapshot.val()
    //   // console.log('firebaseListen', data.row, data.col);
    //   console.log(data);
    // })
  }

  firebasePaint = ( r, c, color ) => {
    let newImage = cloneDeep(this.state.image);
    newImage[r].splice(c, 1, color )
    this.setState({
      image: newImage
    })
  }

  getPhotoFromFirebase = () => {
    console.log('hello');
    firebase.database().ref('/grid').once('value')
    // .then((pixels) => console.log(pixels.val()))
      .then((pixels) => {
        // console.log('then');
        const pix = Object.values( pixels.val() );
        const output = Array(40).fill(null).map( el => new Array(100) );
        let rows = 40; let cols = 100;
        // console.log('pix', pix.length);
        for(let i = 0; i < pix.length; i++){
          const {row, col, color} = pix[i];
          // if( row < rows && col < cols ){
            output[col][row] = color;
          // }
           // const row = Math.floor(i/cols);
           // const col = i % cols;
        }
        // console.log( output );
        this.setState({ image: output });
        // pixels.forEach( pixel => {
        //   let p = pixel.val();
        //   console.log(p);
        //   // this.firebasePaint( p.col, p.row, p.color )
        // })
      });
  }

  firebaseEmptyGrid = () => {
    firebase.database().ref('/grid').remove()
  }

  render(){
    return(
      <div className='App'>
        <h2>FirebaseQueries</h2>
      </div>
    )
  }

} // Class

export default FirebaseQueries
