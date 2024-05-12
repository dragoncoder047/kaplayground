import { defaultProj } from "@/config/defaultProj";
import { type Project, useProject } from "@/hooks/useProject";
import type { FC } from "react";
import projectIcon from "../../assets/project_icon.png";

type Props = {
    onProjectReplace?(): void;
};

const Projects: FC<Props> = ({ onProjectReplace }) => {
    const [project, replaceProject] = useProject((
        state,
    ) => [
        state.project,
        state.replaceProject,
    ]);

    const handleDownload = () => {
        const blob = new Blob([JSON.stringify(project)], {
            type: "application/json",
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");

        a.href = url;
        a.download = "project.kaplay";
        a.click();

        URL.revokeObjectURL(url);
    };

    const handleProjectUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e) => {
            const project = JSON.parse(e.target?.result as string) as Project;
            replaceProject(project);
            onProjectReplace?.();
        };

        reader.readAsText(file);
    };

    const handleProjectReset = () => {
        replaceProject({
            assets: [...defaultProj.assets],
            files: [...defaultProj.files],
        });

        onProjectReplace?.();
    };

    return (
        <div className="dropdown dropdown-end flex-grow-0 flex-shrink-0 basis-24">
            <div
                tabIndex={0}
                role="button"
                className="btn btn-xs btn-secondary"
            >
                <span>Project</span>
                <img
                    src={projectIcon.src}
                    alt="Project's Icon"
                    className="w-4"
                />
            </div>
            <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52"
            >
                <li>
                    <button
                        onClick={handleDownload}
                    >
                        Export project
                    </button>
                </li>
                <li>
                    <label>
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleProjectUpload}
                        />
                        <span>Import project</span>
                    </label>
                </li>
                <li>
                    <button
                        onClick={handleProjectReset}
                    >
                        Reset project
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Projects;