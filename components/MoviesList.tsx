import React, { useState, useEffect } from "react";
import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Movie from "./Movie";

export interface IData {
	title: string;
	episode_number: string;
	poster: string;
	main_characters?: string[];
	description?: string;
	hero_image: string;
}

const url: string =
	"https://raw.githubusercontent.com/RyanHemrick/star_wars_movie_app/master/";

const MoviesList: React.FC = () => {
	const [isAscending, setAscending] = useState<boolean>(true);
	const [isLoading, setLoading] = useState<boolean>(true);
	const [data, setData] = useState<IData[]>([]);

	const toggleSort = () => {
		let newData = [...data];
		newData.sort((a, b) =>
			isAscending
				? a.episode_number > b.episode_number
					? -1
					: 1
				: b.episode_number > a.episode_number
				? -1
				: 1
		);

		setData(newData);
		setAscending(!isAscending);
	};

	const getMovies = async () => {
		try {
			const response = await fetch(`${url}movies.json`);
			const json = await response.json();
			setData(json.movies);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getMovies();
	}, []);
	return (
		<>
			<View style={styles.container}>
				<Text style={styles.appbar}>Start Wars Episodes</Text>
				{isLoading ? (
					<ActivityIndicator />
				) : (
					<FlatList
						data={data}
						extraData={data}
						keyExtractor={({ episode_number }, index) => episode_number}
						renderItem={({ item }) => <Movie movie={item} url={url} />}
					/>
				)}
				<View style={styles.sort_container}>
					<Text style={styles.button}>
						Click to sort {isAscending ? "Descending" : "Ascending"}
					</Text>
					<TouchableOpacity onPress={toggleSort}>
						<AntDesign
							name={isAscending ? "caretdown" : "caretup"}
							size={24}
							color="black"
						/>
					</TouchableOpacity>
				</View>
			</View>
		</>
	);
};

export default MoviesList;

const styles = StyleSheet.create({
	container: {
		display: "flex",
		alignItems: "center",
	},
	appbar: {
		backgroundColor: "black",
		color: "#FFE800",
		padding: 17,
		marginBottom: 20,
		fontSize: 28,
	},
	sort_container: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 15,
	},
	button: {
		marginRight: 5,
	},
});
