import { useState, useEffect } from "react";
import { Box, FlatList, useToast } from "native-base";
import { api } from "../services/api";
import { Game, GameProps } from "../components/Game";
import { Loading } from "./Loading";
import { EmptyMyPoolList } from "./EmptyMyPoolList";

interface Props {
    poolId: string;
    code: string;
}

export function Guesses({ poolId, code }: Props) {
    const [isLoading, setIsLoading] = useState(true);
    const [games, setGames] = useState<GameProps[]>([]);
    const [firstTeamPoints, setFirstTeamPoints] = useState("");
    const [secondTeamPoints, setSecondTeamPoints] = useState("");

    const toast = useToast();

    useEffect(() => {
        getGames();
    }, [poolId]);

    async function getGames() {
        try {
            setIsLoading(true);

            const response = await api.get(`/pools/${poolId}/games`);
            setGames(response.data.games);
        } catch (err) {
            toast.show({ title: "Não foi possível carregar os detalhes do bolão.", placement: "top", bgColor: "red.500" });
        } finally {
            setIsLoading(false);
        }
    }

    async function handleGuessConfirm(gameId: string) {
        try {
            setIsLoading(true);
            if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) return toast.show({ title: "informe o placar do palpite.", placement: "top", bgColor: "red.500" });

            await api.post(`pools/${poolId}/games/${gameId}/guesses`, {
                firstTeamPoints: Number(firstTeamPoints),
                secondTeamPoints: Number(secondTeamPoints),
            });

            toast.show({ title: "Palpite realizado com sucesso", placement: "top", bgColor: "green.500" });
            getGames();
        } catch (err) {
            toast.show({ title: "Não foi possível enviar o palpite", placement: "top", bgColor: "red.500" });
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) <Loading />;

    return <FlatList data={games} keyExtractor={(item) => item.id} renderItem={({ item }) => <Game data={item} setFirstTeamPoints={setFirstTeamPoints} setSecondTeamPoints={setSecondTeamPoints} onGuessConfirm={() => handleGuessConfirm(item.id)} />} ListEmptyComponent={() => <EmptyMyPoolList code={code} />} />;
}
