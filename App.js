import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList} from 'react-native';

import ListItems from './src/components/ListItem/Listitem';
import placeImage from './src/assets/opentext.jpg';

export default class App extends React.Component {

    state={
        placeName :'',
        places:[]
    }

    placeNameChangedHandler = val =>{

        this.setState({
            placeName: val
        })

    }


    placeSubmitHandler = () =>{

        if(this.state.placeName.trim() === ""){
            return;
        }

        this.setState(prevState => {

            return {
                places: prevState.places.concat({
                    key: Math.random(),
                    name:prevState.placeName,
                    image:placeImage

                })
            };
        });


    };

    palceDeleteHandler= key =>{

        this.setState(prevState => {

                return{

                    places: prevState.places.filter(place => {
                        return place.key !== key;
                    })

                };

            });

    };


  render() {


    return (
      <View style={styles.container}>

          <View style={styles.inputContainer}>

              <TextInput  style={{width:300, borderColor:"black" , borderWidth: 1}}
                    placeholder="An awesome place"
                    value={this.state.placeName}
                   onChangeText={this.placeNameChangedHandler}
                          style={styles.placeInput}
                />

          <Button
            title="Add"
            style={styles.placeButton}
            onPress={this.placeSubmitHandler}
          />

          </View>


          <FlatList style={styles.listContainer} data={this.state.places} renderItem={(info) => (

              <ListItems placeName={info.item.name}
                         placeImage={info.item.image}
                         onItemPressed={()=>this.palceDeleteHandler(info.item.key)} />


          )} />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
      padding:60,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

    inputContainer:{
     // flex:1,
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-between"
    },

    placeInput:{
        width:"70%"
    },
    placeButton:{
        width:"30%"
    },

    listContainer:{
      width:"100%"
    }
});
