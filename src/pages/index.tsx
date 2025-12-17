import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className={styles.heroOverlay}></div>

      <div className={styles.heroContent}>
        <div className={styles.textSection}>
          <h1 className={styles.heroTitle}>
            Physical AI & Humanoid Robotics
          </h1>
          <p className={styles.heroSubtitle}>
            Dive into cutting-edge robotics, AI-driven physical systems, and hands-on simulations.
          </p>
          <Link className={styles.ctaButton} to="/docs/book/course-overview">
            Start Learning 🚀
          </Link>
          <p className={styles.heroTagline}>
            VLAs, ethics, and advanced humanoid robotics — all in one interactive platform.
          </p>
        </div>
        <div className={styles.imageSection}>
          <img src="/img/robot.png" alt="Robotics Illustration" />
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Physical AI & Humanoid Robotics"
      description="Learn about humanoid robotics, AI-driven simulations, and hands-on physical AI projects."
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
