import * as HUI from "@headlessui/react";
import { assets } from "@kaplayjs/crew";
import ResourcesPanel from "./ResourcesPanel";
import ResourceTab from "./ResourceTab";

const Resources = () => {
    return (
        <HUI.TabGroup className="flex flex-col h-full">
            <HUI.TabList className="tabs tabs-bordered bg-base-200 w-full">
                <ResourceTab label="Sprites" icon={assets.mark.outlined} />
                <ResourceTab label="Sounds" icon={assets.sounds.outlined} />
                <ResourceTab label="Fonts" icon={assets.fonts.outlined} />
            </HUI.TabList>
            <HUI.TabPanels className="flex-1 flex">
                <ResourcesPanel
                    kind="sprite"
                    onDragData={(name, url) =>
                        `\nloadSprite("${name}", "${url}")`}
                    accept="image/*"
                />
                <ResourcesPanel
                    kind="sound"
                    onDragData={(name, url) =>
                        `\nloadSound("${name}", "${url}")`}
                    visibleIcon={assets.sounds.sprite}
                    accept="audio/*"
                />
                <ResourcesPanel
                    kind="font"
                    onDragData={(name, url) =>
                        `\nloadFont("${name}", "${url}")`}
                    visibleIcon={assets.fonts.sprite}
                    accept=".ttf,.otf"
                />
            </HUI.TabPanels>
        </HUI.TabGroup>
    );
};

export default Resources;