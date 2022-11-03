import { NativeBaseProvider, StatusBar } from "native-base";
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { THEME } from "./src/styles/theme";
import { Loading } from "./src/components/Loading";
import { SignIn } from "./src/screens/SignIn";
import { AuthContextProvider } from "./src/context/authContext";
import { CreatePool } from "./src/screens/CreatePool";
import { FindPool } from "./src/screens/FindPool";
import { MyPools } from "./src/screens/MyPools";

export default function App() {
    const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold });

    return (
        <NativeBaseProvider theme={THEME}>
            <AuthContextProvider>
                <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
                {fontsLoaded ? <MyPools /> : <Loading />}
            </AuthContextProvider>
        </NativeBaseProvider>
    );
}
