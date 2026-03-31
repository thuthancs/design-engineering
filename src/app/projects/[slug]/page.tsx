import {
  getAllProjectSlugs,
  getProjectBySlug,
} from "@/data/projects";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  loadProjectMarkdownSections,
  normalizeSectionKey,
} from "@/lib/projectMarkdown";
import styles from "./page.module.css";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Project" };
  }
  return {
    title: `Day ${project.day} - ${project.title}`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }
  const markdownSections = await loadProjectMarkdownSections(project.slug);

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <Link className={styles.back} href="/">
          <span aria-hidden>←</span>
          <span>BACK</span>
        </Link>
        <nav className={styles.sideNav} aria-label="On this page">
          <ul className={styles.sideNavList}>
            {project.sections.map((section) => (
              <li key={section.id}>
                <a className={styles.sideNavLink} href={`#${section.id}`}>
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <p className={styles.day}>
            Day {project.day} - {project.dateLabel}
          </p>
          <h1 className={styles.title}>{project.title}</h1>
          {project.inlinePreview ? (
            <div className={styles.inlinePreviewPanel}>
              {project.inlinePreview.images.map((img, i) => (
                <div
                  key={i}
                  className={`${styles.inlinePreviewItem} ${i === 0 ? styles.inlinePreviewItemDesktop : ""}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    className={styles.inlinePreviewImage}
                    sizes={
                      i === 0
                        ? "(max-width: 900px) 74vw, 920px"
                        : "(max-width: 900px) 38vw, 380px"
                    }
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          ) : null}
          <p className={styles.summary}>{project.summary}</p>
        </header>

        <figure className={styles.figure}>
          {project.detailGallery && project.detailGallery.length > 0 ? (
            <>
              <div className={styles.previewRow}>
                {project.detailGallery.map((img, i) => (
                  <div key={i} className={styles.previewRowItem}>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={img.width}
                      height={img.height}
                      className={styles.preview}
                      sizes="(max-width: 900px) 33vw, 260px"
                      priority={i === 0}
                    />
                  </div>
                ))}
              </div>
              {project.detailGalleryCaption ? (
                <figcaption className={styles.figureCaption}>
                  {project.detailGalleryCaption}
                </figcaption>
              ) : null}
            </>
          ) : (
            <Image
              src={project.preview.src}
              alt={project.preview.alt}
              width={project.preview.width}
              height={project.preview.height}
              className={styles.preview}
              priority
            />
          )}
        </figure>

        {project.sections.map((section) => (
          // Prefer markdown section body when available; fallback to typed content in projects.ts.
          <section
            key={section.id}
            id={section.id}
            className={styles.contentSection}
            tabIndex={-1}
          >
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            {markdownSections?.[normalizeSectionKey(section.id)] ? (
              <div
                className={styles.markdownContent}
                dangerouslySetInnerHTML={{
                  __html: markdownSections[normalizeSectionKey(section.id)],
                }}
              />
            ) : (
              <>
                {section.paragraphs.map((paragraph, i) => (
                  <p key={i} className={styles.paragraph}>
                    {paragraph}
                  </p>
                ))}
                {section.bullets?.length ? (
                  <ul className={styles.bulletList}>
                    {section.bullets.map((item, i) => (
                      <li key={i} className={styles.bulletItem}>
                        <strong>{item.label}:</strong> {item.text}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </>
            )}
          </section>
        ))}
      </main>
    </div>
  );
}
