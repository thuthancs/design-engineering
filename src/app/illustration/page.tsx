import { illustrationProjects } from "@/data/illustrationProjects";
import type { Metadata } from "next";
import Link from "next/link";
import { ProjectCard } from "../components/ProjectCard";
import homeStyles from "../page.module.css";

export const metadata: Metadata = {
  title: "Illustration",
  description: "Illustration work and process.",
};

export default function IllustrationPage() {
  return (
    <div className={homeStyles.page}>
      <div className={homeStyles.topRow}>
        <header className={homeStyles.intro}>
          <h1 className={homeStyles.title}>
            <span className={homeStyles.titleLine}>Illustration</span>
          </h1>
        </header>

        <nav className={homeStyles.nav} aria-label="Site links">
          <Link className={homeStyles.navLink} href="/">
            HOME
          </Link>
        </nav>
      </div>

      <ul
        className={`${homeStyles.projectsList} ${homeStyles.projectsListFullRow}`}
      >
        {illustrationProjects.map((project, index) => {
          const width = project.cropModalFrame ? 448 : project.preview.width;
          const height = project.cropModalFrame ? 515 : project.preview.height;
          const card = (
            <ProjectCard
              src={project.preview}
              alt={project.previewAlt ?? project.title}
              width={width}
              height={height}
              hoverLabel={project.title}
              wrapClassName={
                project.naturalAspectSheet ? undefined : homeStyles.modalWrap
              }
              className={homeStyles.projectPreview}
              priority={index === 0}
              unoptimized={project.unoptimized ?? false}
              cropModalFrame={project.cropModalFrame ?? false}
              containHeightMatchSignup={
                project.containHeightMatchSignup ?? false
              }
              containHeightZoom={project.containHeightZoom ?? 1}
              naturalAspectSheet={project.naturalAspectSheet ?? false}
            />
          );
          const linkClass = `${homeStyles.projectLink} ${homeStyles.illustrationProjectLink}`;
          return (
            <li key={project.id} className={homeStyles.projectsItem}>
              {project.href ? (
                project.href.startsWith("/") ? (
                  <Link
                    href={project.href}
                    className={linkClass}
                    aria-label={`Open project: ${project.title}`}
                  >
                    {card}
                  </Link>
                ) : (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                    aria-label={`Open project: ${project.title}`}
                  >
                    {card}
                  </a>
                )
              ) : (
                <div className={linkClass} aria-label={project.title}>
                  {card}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
