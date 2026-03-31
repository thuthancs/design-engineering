import { aboutPhotos } from "@/data/aboutPhotos";
import type { Metadata } from "next";
import Link from "next/link";
import { AboutPhotoCard } from "./components/AboutPhotoCard";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Thu and the 100 days of design engineering challenge.",
};


const experience = [
  {
    institution: "Minerva University",
    institutionUrl: "https://www.minerva.edu/",
    title: "SWE Intern",
    date: "2025-2026",
  },
  {
    institution: "Universidad Abierta Interamericana",
    institutionUrl: "https://www.uai.edu.ar/",
    title: "SWE Intern",
    date: "2024-2025",
  },
  {
    institution: "MoMo M_Service",
    institutionUrl: "https://vietcetera.com/en/momo-hits-2-billion-valuation-becomes-vietnams-4th-unicorn-startup",
    title: "Data Analytics Intern",
    date: "2024",
  },
  {
    institution: "Next Challenge Foundation",
    institutionUrl: "https://www.ncf.or.kr/en",
    title: "Product Manager Intern",
    date: "2023",
  },
];

const education = [
  {
    institution: "Minerva University",
    institutionUrl: "https://www.minerva.edu/",
    degree: "B.S. in Computer Science",
    date: "2022–2026",
  },
];

export default function AboutPage() {
  return (
    <div className={styles.shell}>
      <Link className={styles.homeLink} href="/">
        ← HOME
      </Link>

      <div className={styles.topGrid}>
        <div className={styles.bioCol}>
          <p className={styles.greeting}>Hi there, I&apos;m Thu.</p>
          <p className={styles.prose}>
            I am an engineer with a passion for design. This site is my{" "}
            <Link href="/">100 days of design engineering</Link> - a daily
            practice of crafting great designs. I love creating fun, useful, and beautiful stuff.
            Currently, I am based in sunny San Francisco, CA.
          </p>
          <p className={styles.subheading}>Outside work, I&apos;m:</p>
          <ul className={styles.list}>
            <li>Cafe hopping in SF to find the best hot latte</li>
            <li>Experimenting new recipes and writing haiku</li>
            <li>Spending hours in the library to read</li>
          </ul>
        </div>

        <div className={styles.cvCol}>
          <h2 className={styles.sectionLabel}>Experience</h2>
          <ul className={styles.timeline}>
            {experience.map((item) => (
              <li
                key={`${item.institution}-${item.date}`}
                className={styles.timelineItem}
              >
                <span className={styles.timelineTitle}>
                  <a
                    className={styles.institutionLink}
                    href={item.institutionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.institution}
                  </a>
                  <span className={styles.timelineDegree}>
                    {" "}
                    / {item.title}
                  </span>
                </span>
                <span className={styles.timelineMeta}>{item.date}</span>
              </li>
            ))}
          </ul>

          <h2 className={styles.sectionLabel}>Education</h2>
          <ul className={styles.timeline}>
            {education.map((item) => (
              <li key={item.institution} className={styles.timelineItem}>
                <span className={styles.timelineTitle}>
                  <a
                    className={styles.institutionLink}
                    href={item.institutionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.institution}
                  </a>
                  <span className={styles.timelineDegree}>
                    {" "}
                    / {item.degree}
                  </span>
                </span>
                <span className={styles.timelineMeta}>{item.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ul className={styles.photoGrid} aria-label="Photo gallery">
        {aboutPhotos.map((photo, index) => (
          <li key={index} className={styles.photoItem}>
            <div className={styles.photoFrame}>
              <AboutPhotoCard
                src={photo.src}
                alt={photo.alt}
                hoverLabel={photo.hoverLabel}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
