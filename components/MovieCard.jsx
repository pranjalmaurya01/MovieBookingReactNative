import { Link } from 'expo-router';
import { View, Text, Image, Pressable } from 'react-native';

export default function MovieCard({ ...movie }) {
	return (
		<View className='h-[100vh]'>
			<Image
				className='w-full h-[75vh]'
				source={{
					uri: movie.image,
				}}
			/>
			<View className='h-[23vh] flex justify-between'>
				<Text className='text-center font-semibold text-4xl mt-2'>
					{movie.title}
				</Text>
				<Text className='text-xl text-center'>
					Genre: <Text className='font-bold'>{movie.genre}</Text>
				</Text>
				<View>
					<Pressable className='w-full bg-blue-500 focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 mr-2 mb-4'>
						<Link
							href={{
								pathname: '/movie/[id]',
								params: { id: movie.id },
							}}
						>
							<Text className='text-white text-2xl'>
								Book Now
							</Text>
						</Link>
					</Pressable>
				</View>
			</View>
		</View>
	);
}
