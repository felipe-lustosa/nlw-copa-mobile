import { useCallback, useState } from "react";
import { VStack, Icon, Toast, FlatList } from "native-base";
import { Octicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { api } from "../services/api";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { PoolCard, PoolCardProps } from "../components/PoolCard";
import { EmptyPoolList } from "../components/EmptyPoolList";

export function MyPools() {
    const [isLoading, setIsLoading] = useState(true);
    const [pools, setPools] = useState<PoolCardProps[]>([]);

    const { navigate } = useNavigation();

    useFocusEffect(
        useCallback(() => {
            getPools();
        }, [])
    );

    async function getPools() {
        try {
            setIsLoading(true);

            const response = await api.get("/pools");
            setPools(response.data.pools);
        } catch (err) {
            console.log(err);
            Toast.show({ title: "Não foi possível carregar os bolões.", placement: "top", bgColor: "red.500" });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Meus bolões" />
            <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor="gray.600" pb={4} mb={4}>
                <Button title="BUSCAR BOLÃO POR CÓDIGO" onPress={() => navigate("findPool")} leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />} />
            </VStack>

            {isLoading ? <Loading /> : <FlatList data={pools} keyExtractor={(item) => item.id} renderItem={({ item }) => <PoolCard data={item} onPress={() => navigate("detailsPool", { id: item.id })} />} px={5} showsVerticalScrollIndicator={false} _contentContainerStyle={{ pb: 10 }} ListEmptyComponent={() => <EmptyPoolList />} />}
        </VStack>
    );
}
