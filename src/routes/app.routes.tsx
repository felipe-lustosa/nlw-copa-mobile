import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PlusCircle, SoccerBall } from "phosphor-react-native";
import { useTheme } from "native-base";
import { Platform } from "react-native";

import { CreatePool } from "../screens/CreatePool";
import { MyPools } from "../screens/MyPools";
import { FindPool } from "../screens/FindPool";
import { DetailsPool } from "../screens/DetailsPool";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
    const { colors, sizes } = useTheme();

    const iconSize = sizes[6];

    return (
        <Navigator screenOptions={{ headerShown: false, tabBarLabelPosition: "beside-icon", tabBarActiveTintColor: colors.yellow[500], tabBarInactiveTintColor: colors.gray[500], tabBarStyle: { position: "absolute", height: sizes[22], borderTopWidth: 0, backgroundColor: colors.gray[800] }, tabBarItemStyle: { position: "relative", top: Platform.OS === "android" ? -10 : 0 } }}>
            <Screen name="createPool" component={CreatePool} options={{ tabBarIcon: ({ color }) => <PlusCircle color={color} size={iconSize} />, tabBarLabel: "Novo bolão" }} />
            <Screen name="myPools" component={MyPools} options={{ tabBarIcon: ({ color }) => <SoccerBall color={color} size={iconSize} />, tabBarLabel: "Meus bolões" }} />
            <Screen name="findPool" component={FindPool} options={{ tabBarButton: () => null }} />
            <Screen name="detailsPool" component={DetailsPool} options={{ tabBarButton: () => null }} />
        </Navigator>
    );
}
