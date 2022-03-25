import { ethers } from "ethers";
import { CurrencyAmount, Token, TradeType } from "@uniswap/sdk-core";
import { abi as IUniswapV3PoolABI } from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import { Route, Trade, Pool } from "@uniswap/v3-sdk";
import { abi as QuoterABI } from "@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json";


export const quote = async (amountIn: any) => {

    const provider = new ethers.providers.JsonRpcProvider('https://polygon-mainnet.g.alchemy.com/v2/bS1uxiiIYWOw7MjvFFsj72JbHhya8hBj')
    const quoterContract = new ethers.Contract("0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6", QuoterABI, provider);

    const poolAddress = '0xa374094527e1673a86de625aa59517c5de346d32';

    const poolContract = new ethers.Contract(
        poolAddress,
        IUniswapV3PoolABI,
        provider
    );

    async function getPoolImmutables() {
        const PoolImmutables: any = {
            factory: await poolContract.factory(),
            token0: await poolContract.token0(),
            token1: await poolContract.token1(),
            fee: await poolContract.fee(),
            tickSpacing: await poolContract.tickSpacing(),
            maxLiquidityPerTick: await poolContract.maxLiquidityPerTick(),
        };
        return PoolImmutables;
    }

    const immutables: any = await getPoolImmutables();

    const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
        immutables.token0,
        immutables.token1,
        immutables.fee,
        ethers.utils.parseEther(amountIn).toString(),
        0
    );

    console.log(ethers.utils.formatUnits(quotedAmountOut, 6))

    async function getPoolState() {
        const [liquidity, slot] = await Promise.all([
            poolContract.liquidity(),
            poolContract.slot0(),
        ]);

        const PoolState: any = {
            liquidity,
            sqrtPriceX96: slot[0],
            tick: slot[1],
            observationIndex: slot[2],
            observationCardinality: slot[3],
            observationCardinalityNext: slot[4],
            feeProtocol: slot[5],
            unlocked: slot[6],
        };

        return PoolState;
    }

    const [state] = await Promise.all([
        getPoolState(),
    ]);

    const TokenA = new Token(3, immutables.token0, 6, "USDC", "USD Coin");
    const TokenB = new Token(3, immutables.token1, 18, "WETH", "Wrapped Ether");
    const poolExample = new Pool(
        TokenA,
        TokenB,
        immutables.fee,
        state.sqrtPriceX96.toString(), //note the description discrepancy - sqrtPriceX96 and sqrtRatioX96 are interchangable values
        state.liquidity.toString(),
        state.tick
    );

    const swapRoute = new Route([poolExample], TokenA, TokenB);

    const uncheckedTradeExample = await Trade.createUncheckedTrade({
        route: swapRoute,
        inputAmount: CurrencyAmount.fromRawAmount(TokenA, ethers.utils.parseEther(amountIn).toString()),
        outputAmount: CurrencyAmount.fromRawAmount(
            TokenB,
            quotedAmountOut.toString()
        ),
        tradeType: TradeType.EXACT_INPUT,
    });

    console.log(uncheckedTradeExample)
}