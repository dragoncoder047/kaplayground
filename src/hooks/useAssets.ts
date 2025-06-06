import { useMemo } from "react";
import type { Asset } from "../features/Projects/models/Asset";
import type { AssetKind } from "../features/Projects/models/AssetKind";
import type { AssetsSlice } from "../features/Projects/stores/slices/assets";
import { useProject } from "../features/Projects/stores/useProject";

type UseAssetsOpt = {
    kind?: AssetKind;
};

type UseAssetsReturn = AssetsSlice & {
    assets: Asset[];
};

type UseAssetsHook = (opt: UseAssetsOpt) => UseAssetsReturn;

export const useAssets: UseAssetsHook = ({ kind }) => {
    const {
        assetsLastId,
        removeAsset,
        addAsset,
        project: { assets },
    } = useProject();

    const filteredAssets = useMemo(() => {
        if (!kind) return Object.values(assets);

        return Array.from(assets).filter(
            ([_, asset]) => asset.kind === kind,
        ).map(([_, asset]) => asset);
    }, [JSON.stringify(Array.from(assets))]);

    return {
        addAsset,
        removeAsset,
        assetsLastId,
        assets: filteredAssets,
    };
};
