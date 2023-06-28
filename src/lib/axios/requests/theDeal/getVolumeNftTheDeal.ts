import client from "lib/axios/axiosClient";

export async function getVolumeNftTheDeal(date: Date,
    symbol: string,): Promise<number> {

    const dateString = date.toISOString();

    const response = await client.get<number>(`/thedeal/volume?date=${dateString}&symbol=${symbol}`);

    return response.data;
}
