import React from "react";
import { View, Text, Image, StyleSheet } from 'react-native'
import { IData } from "./MoviesList"

interface IMovie {
	url: string
	movie: IData
}


const Movie:React.FC<IMovie> = ({url, movie }) => {
    const imageUri:string = `${url}public/images/${movie.poster}`
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{movie.title}</Text>
            <Image style={styles.poster} source={{uri:imageUri}} />
            <Text>Episode n.{movie.episode_number}</Text>
        </View>
    )
}

export default Movie

const styles = StyleSheet.create({
	container: {
		display: "flex",
        flexDirection: "column",
		alignItems: "center",
        marginVertical:20,
        maxWidth:300,
        textAlign:"center",
        border:"2px solid black"
	},
    poster: {
        width: 200,
        height: 200,
      },
      text:{

          fontSize:15,
          marginBottom:10,
      }
});
