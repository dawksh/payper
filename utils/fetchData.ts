import axios from "axios";

export const getUSDCQuote = async () => {
    const headers = {
        "content-type": "application/json",
    };
    const chainLinkGQL = "https://api.thegraph.com/subgraphs/name/openpredict/chainlink-prices-subgraph";
    const graphqlQuery = {
        operationName: "fetchPrices",
        // variables: {},
        query: `query fetchPrices {
  prices(where: {assetPair: "MATIC/USD", timestamp_gt: "1647604200"}) {
    price
  }
}
      `,
    };

    const res = await axios({
        url: chainLinkGQL,
        method: "POST",
        data: graphqlQuery,
        headers,
    });

    if (!!res.data?.errors?.length) {
        throw new Error("Error fetching ens domains");
    }

    return res.data;
};