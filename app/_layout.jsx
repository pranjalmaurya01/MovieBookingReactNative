import { Slot } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import '../global.css';

export default function () {
	return (
		<SafeAreaView>
			<Slot />
		</SafeAreaView>
	);
}
