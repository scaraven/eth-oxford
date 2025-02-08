"use client";
import React from "react";
import GradientBG from "./GradientBG";
import styles from "../../styles/Home.module.css";

type Props = {
  children: React.ReactNode;
};

const Main: React.FC<Props> = ({ children }) => {
  return (
    <GradientBG>
      <main className={styles.main}>{children}</main>
    </GradientBG>
  );
};

export default Main;
