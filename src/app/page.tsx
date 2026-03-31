import Image from "next/image";
import Link from "next/link";
import basicShapes from "./assets/basic_shapes.svg";
import { ProjectCard } from "./components/ProjectCard";
import { getAllProjects } from "@/data/projects";
import styles from "./page.module.css";

export default function Home() {
  const projects = getAllProjects();

  return (
    <div className={styles.page}>
      <div className={styles.topRow}>
        <header className={styles.intro}>
          <h1 className={styles.title}>
            <span className={styles.titleLine}>
              I&apos;m Thu. This is my 100 days of{" "}
            </span>
            <span className={styles.titleWithShapes}>
              <span className={styles.titleSecond}>design engineering</span>
              <span className={styles.shapesWrap}>
                <Image
                  src={basicShapes}
                  alt=""
                  width={184}
                  height={46}
                  className={styles.shapes}
                  priority
                />
              </span>
            </span>
          </h1>
        </header>

        <nav className={styles.nav} aria-label="Social links">
          <a className={styles.navLink} href="#">
            WEBSITE
          </a>
          <a className={styles.navLink} href="#">
            LINKEDIN
          </a>
          <a className={styles.navLink} href="#">
            GITHUB
          </a>
        </nav>
      </div>

      <ul className={styles.projectsList}>
        {projects.map((project, index) => (
          <li key={project.slug} className={styles.projectsItem}>
            <Link
              href={`/projects/${project.slug}`}
              className={styles.projectLink}
              aria-label={`Open project: ${project.title}`}
            >
              <ProjectCard
                src={project.preview.src}
                alt={project.preview.alt}
                width={project.preview.width}
                height={project.preview.height}
                hoverLabel={`Day ${project.day} — ${project.title}`}
                wrapClassName={styles.modalWrap}
                className={styles.projectPreview}
                priority={index === 0}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
