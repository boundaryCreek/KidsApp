import BaseLayout from '../components/BaseLayout/BaseLayout';
import {
  homeContainerStyles,
  homeIconStyles,
  homeTitleStyles,
  homeDescriptionStyles,
  homeButtonContainerStyles,
  createButtonStyles,
  playButtonStyles,
  learnButtonStyles
} from './page.styles';

export default function Home() {
  return (
    <BaseLayout>
      <div style={homeContainerStyles}>
        <div style={homeIconStyles}>
          📚
        </div>
        <h1 style={homeTitleStyles}>
          Welcome to Kids App
        </h1>
        <p style={homeDescriptionStyles}>
          A learning platform designed for children to explore and grow.
        </p>
        <div style={homeButtonContainerStyles}>
          <button style={createButtonStyles}>
            Create
          </button>
          <button style={playButtonStyles}>
            Play
          </button>
          <button style={learnButtonStyles}>
            Learn
          </button>
        </div>
      </div>
    </BaseLayout>
  );
}
