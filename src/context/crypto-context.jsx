import { useEffect, useState, createContext, useContext} from "react";
import { fakeFetchAssets, fakeFetchCrypto } from "../api";
import { percentDifference } from "../utils"

export const CryptoContext = createContext({
    assets: [],
    crypto: [],
    loading: false
})

export function CryptoContextProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [crypto, setCrypto] = useState([]);
    const [assets, setAssets] = useState([]);

    useEffect(() => {
    async function preload() {
        setLoading(true)
        const {result} = await fakeFetchCrypto()
        const assets = await fakeFetchAssets()

        setCrypto(result)
        setAssets(assets.map((asset) => {
        const coin = result.find((c) => c.id === asset.id)
        
        return {
            grow: asset.price < coin.price,
            growPercent: percentDifference(asset.price, coin.price),
            totalAmount: asset.amount * coin.price,
            totalProfit: asset.amount * coin.price - asset.amount * asset.price,
            ...asset
        }
        }))
        setLoading(false)
    }
    preload()
    }, [])

    return (
        <CryptoContext.Provider value={{crypto, assets, loading}}>{children}</CryptoContext.Provider>
    )
}

export default function useCrypto() {
    return useContext(CryptoContext)
}

