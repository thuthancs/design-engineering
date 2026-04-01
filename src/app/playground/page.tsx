import { playgroundProjects } from "@/data/playgroundProjects";
import { ProjectCard } from "../components/ProjectCard";
import type { Metadata } from "next";
import Link from "next/link";
import homeStyles from "../page.module.css";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "100 days of creative experiments with AI — a showcase of playful builds and explorations.",
};

export default function PlaygroundPage() {
  return (
    <div className={homeStyles.page}>
      <div className={homeStyles.topRow}>
        <header className={homeStyles.intro}>
          <h1 className={homeStyles.title}>
            <span className={homeStyles.titleLine}>
              Creative experiments with AI
            </span>
          </h1>
        </header>

        <nav className={homeStyles.nav} aria-label="Site links">
          <Link className={homeStyles.navLink} href="/">
            HOME
          </Link>
          <Link className={homeStyles.navLink} href="/about">
            ABOUT
          </Link>
          <Link
            className={homeStyles.navLink}
            href="/playground"
            aria-current="page"
          >
            PLAYGROUND
          </Link>
        </nav>
      </div>

      <ul className={homeStyles.projectsList}>
        {playgroundProjects.map((project, index) => (
          <li key={project.id} className={homeStyles.projectsItem}>
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className={homeStyles.projectLink}
              aria-label={`Open project: ${project.title}`}
            >
              <ProjectCard
                src={project.preview}
                alt={project.previewAlt ?? project.title}
                width={project.cropModalFrame ? 448 : project.preview.width}
                height={project.cropModalFrame ? 515 : project.preview.height}
                hoverLabel={project.title}
                wrapClassName={homeStyles.modalWrap}
                className={homeStyles.projectPreview}
                priority={index === 0}
                unoptimized={project.unoptimized ?? false}
                cropModalFrame={project.cropModalFrame ?? false}
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
