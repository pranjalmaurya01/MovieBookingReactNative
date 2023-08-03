import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import client from '../../axios';
import { router } from 'expo-router';

const uniqId = Date.now();

export default function Page() {
	const [movie, setMovie] = useState(null);
	const [selectedSeats, setSelectedSeats] = useState([]);

	const { slug } = useLocalSearchParams();

	useEffect(() => {
		client.get('/movies').then(({ data }) => {
			const movie = data.find((movie) => movie.id === parseInt(slug));
			setMovie(movie);
		});
	}, []);

	const handleSeatSelect = (seat) => {
		setSelectedSeats((prevSeats) => {
			if (prevSeats.includes(seat)) {
				return prevSeats.filter((s) => s !== seat);
			} else {
				return [...prevSeats, seat];
			}
		});
	};

	const handleTransaction = () => {
		if (selectedSeats.length > 0) {
			const price = selectedSeats.reduce(
				(each, a) => each + movie.prices[a],
				0
			);
			const transaction = {
				movieId: movie.id,
				price,
				currency: movie.currency,
				userId: '' + uniqId,
				id: Date.now(),
			};
			client
				.post('/transactions', transaction)
				.then((e) => {
					alert(`Transaction successful! Total Cost = ${price}`);
					router.replace('/');
				})
				.catch((e) => {
					console.log('e', e);
					console.log('Please Try Again Later');
				});
		} else {
			alert(
				'Please select a movie and seats before making a transaction.'
			);
		}
	};

	if (!movie) return <Text>Loading... </Text>;

	return (
		<ScrollView className=''>
			<Image
				className='w-full h-[95vh]'
				source={{
					uri: movie.image,
				}}
			/>
			<View className='flex justify-between'>
				<Text className='text-center font-semibold text-4xl mt-2'>
					{movie.title}
				</Text>
				<Text className='text-xl font-semibold'>
					Genre: <Text className='font-normal'>{movie.genre}</Text>
				</Text>
				<Text className='text-xl font-semibold'>
					Director:{' '}
					<Text className='font-normal'>{movie.director}</Text>
				</Text>
				<Text className='text-xl font-semibold'>
					Stars: <Text className='font-normal'>{movie.stars}</Text>
				</Text>
				<Text className='text-xl font-semibold'>
					Plot: <Text className='font-normal'>{movie.plot}</Text>
				</Text>
				<View className='flex flex-row justify-center mt-2'>
					{Object.keys(movie.prices).map((seat) => (
						<Pressable
							className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 '
							variant='outline-primary'
							key={seat}
							onPress={() => handleSeatSelect(seat)}
						>
							<Text>
								{selectedSeats.includes(seat) && <>&#x2705; </>}
								{seat} (&#8377;{movie.prices[seat]})
							</Text>
						</Pressable>
					))}
				</View>
				<Pressable
					className=' mt-2
				focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 
				'
					onPress={handleTransaction}
				>
					<Text className='text-white text-center text-2xl'>
						Buy Seats
					</Text>
				</Pressable>
			</View>
		</ScrollView>
	);
}
