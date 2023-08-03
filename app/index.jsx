import { useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import client from '../axios';
import MovieCard from '../components/MovieCard';

export default function Home() {
	const [moviesData, setMoviesData] = useState([]);

	useEffect(() => {
		client.get('/movies').then(({ data }) => {
			setMoviesData(data);
		});
	}, []);

	return (
		<View>
			<Text className='text-center text-4xl underline mt-2'>
				Movie Ticket Booking
			</Text>
			<View className='pb-10 mt-2'>
				<ScrollView
					style={{
						minHeight: '100%',
					}}
				>
					{moviesData.map((movie) => (
						<View
							key={movie.id}
							style={{
								marginBottom: '2rem',
							}}
						>
							<MovieCard {...movie} />
						</View>
					))}
				</ScrollView>
			</View>
		</View>
	);
}
