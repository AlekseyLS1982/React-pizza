import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props: any) => (
  <ContentLoader
    speed={0}
    width={280}
    height={470}
    viewBox="0 0 280 470"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="275" rx="10" ry="10" width="280" height="20" />
    <rect x="0" y="308" rx="11" ry="11" width="280" height="40" />
    <circle cx="140" cy="130" r="130" />
    <rect x="120" y="360" rx="13" ry="13" width="160" height="38" />
    <rect x="197" y="402" rx="0" ry="0" width="1" height="1" />
    <rect x="0" y="360" rx="11" ry="11" width="90" height="38" />
  </ContentLoader>
);

export default Skeleton;
