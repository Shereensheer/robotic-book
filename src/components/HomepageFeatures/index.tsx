import type { ReactNode } from "react";
import Heading from "@theme/Heading";
import {
  FaCogs,
  FaWalking,
  FaLaptopCode,
  FaProjectDiagram,
  FaGavel,
  FaHandsHelping,
} from "react-icons/fa";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Icon: React.ComponentType<{ className?: string }>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Embodied Intelligence",
    Icon: FaCogs,
    description: (
      <>
        Learn how Physical AI enables robots to sense, reason and interact with
        the real world using advanced control & perception.
      </>
    ),
  },
  {
    title: "Humanoid Robotics",
    Icon: FaWalking,
    description: (
      <>
        Explore humanoid robot design, locomotion, manipulation and human-robot
        interaction.
      </>
    ),
  },
  {
    title: "Simulation & Development",
    Icon: FaLaptopCode,
    description: (
      <>
        Build and simulate robotic systems in ROS2, Gazebo, Unity & NVIDIA Isaac
        Sim.
      </>
    ),
  },
  {
    title: "Visual Language Models",
    Icon: FaProjectDiagram,
    description: (
      <>
        Integrate vision + language models to enhance perception and multimodal
        robotic intelligence.
      </>
    ),
  },
  {
    title: "Ethics & Society",
    Icon: FaGavel,
    description: (
      <>
        Learn ethical frameworks, safety, privacy and societal impact of
        humanoid robotics.
      </>
    ),
  },
  {
    title: "Hands-on Learning",
    Icon: FaHandsHelping,
    description: (
      <>
        Work on practical robotics projects, assignments and real-world
        applications.
      </>
    ),
  },
];

function Feature({ title, Icon, description }: FeatureItem) {
  return (
    <div className="col col--4 margin-bottom--lg">
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <Icon className={styles.icon} />
        </div>

        <Heading as="h3" className={styles.title}>
          {title}
        </Heading>

        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
