import {
  Commitment,
  Connection,
  ConnectionConfig,
  PublicKey,
} from "@solana/web3.js";

import { MetaplexError } from "@metaplex-foundation/js";

import type {
  GetAssetProofRpcInput,
  GetAssetProofRpcResponse,
  GetAssetRpcInput,
  GetAssetsByOwnerRpcInput,
  GetAssetsByGroupRpcInput,
  ReadApiAsset,
  ReadApiAssetList,
} from "./types/wrapeedConnectionTypes";

type JsonRpcParams<ReadApiMethodParams> = {
  method: string;
  id?: string;
  params: ReadApiMethodParams;
};

type JsonRpcOutput<ReadApiJsonOutput> = {
  result: ReadApiJsonOutput;
};

/** @group Errors */
export class ReadApiError extends MetaplexError {
  readonly name: string = "ReadApiError";
  constructor(message: string, cause?: Error) {
    super(message, "rpc", undefined, cause);
  }
}

export default class WrapperConnection extends Connection {
  constructor(
    endpoint: string,
    commitmentOrConfig?: Commitment | ConnectionConfig
  ) {
    super(endpoint, commitmentOrConfig);
  }

  private callReadApi = async <ReadApiMethodParams, ReadApiJsonOutput>(
    jsonRpcParams: JsonRpcParams<ReadApiMethodParams>
  ): Promise<JsonRpcOutput<ReadApiJsonOutput>> => {
    const response = await fetch(this.rpcEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: jsonRpcParams.method,
        id: jsonRpcParams.id ?? "rpd-op-123",
        params: jsonRpcParams.params,
      }),
    });

    return await response.json();
  };

  // Asset id can be calculated via Bubblegum#getLeafAssetId
  // It is a PDA with the following seeds: ["asset", tree, leafIndex]
  async getAsset(assetId: PublicKey): Promise<ReadApiAsset> {
    const { result: asset } = await this.callReadApi<
      GetAssetRpcInput,
      ReadApiAsset
    >({
      method: "getAsset",
      params: {
        id: assetId.toBase58(),
      },
    });

    if (!asset) throw new ReadApiError("No asset returned");

    return asset;
  }

  // Asset id can be calculated via Bubblegum#getLeafAssetId
  // It is a PDA with the following seeds: ["asset", tree, leafIndex]
  async getAssetProof(assetId: PublicKey): Promise<GetAssetProofRpcResponse> {
    const { result: proof } = await this.callReadApi<
      GetAssetProofRpcInput,
      GetAssetProofRpcResponse
    >({
      method: "getAssetProof",
      params: {
        id: assetId.toBase58(),
      },
    });

    if (!proof) throw new ReadApiError("No asset proof returned");

    return proof;
  }

  //
  async getAssetsByGroup({
    groupKey,
    groupValue,
    page,
    limit,
    sortBy,
    before,
    after,
  }: GetAssetsByGroupRpcInput): Promise<ReadApiAssetList> {
    // `page` cannot be supplied with `before` or `after`
    if (typeof page == "number" && (before || after))
      throw new ReadApiError(
        "Pagination Error. Only one pagination parameter supported per query."
      );

    // a pagination method MUST be selected, but we are defaulting to using `page=0`

    const { result } = await this.callReadApi<
      GetAssetsByGroupRpcInput,
      ReadApiAssetList
    >({
      method: "getAssetsByGroup",
      params: {
        groupKey,
        groupValue,
        after: after ?? null,
        before: before ?? null,
        limit: limit ?? null,
        page: page ?? 1,
        sortBy: sortBy ?? null,
      },
    });

    if (!result) throw new ReadApiError("No results returned");

    return result;
  }

  //
  async getAssetsByOwner({
    ownerAddress,
    page,
    limit,
    sortBy,
    before,
    after,
  }: GetAssetsByOwnerRpcInput): Promise<ReadApiAssetList> {
    // `page` cannot be supplied with `before` or `after`
    if (typeof page == "number" && (before || after))
      throw new ReadApiError(
        "Pagination Error. Only one pagination parameter supported per query."
      );

    // a pagination method MUST be selected, but we are defaulting to using `page=0`

    const { result } = await this.callReadApi<
      GetAssetsByOwnerRpcInput,
      ReadApiAssetList
    >({
      method: "getAssetsByOwner",
      params: {
        ownerAddress,
        after: after ?? null,
        before: before ?? null,
        limit: limit ?? null,
        page: page ?? 1,
        sortBy: sortBy ?? null,
      },
    });

    // !if (!result) throw new ReadApiError("No results returned");

    return result;
  }
}
