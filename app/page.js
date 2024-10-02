import Image from 'next/image';
import smilingCat from '../public/images/smiling-cat.webp';
import CookieBanner from './CookieBanner';
import GenerateButton from './GenerateButton';
import LocalStorage from './LocalStorage';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.homePage}>
      <GenerateButton />
      <LocalStorage />
      <CookieBanner />
      <h1>UpLeveled</h1>

      {/* This is not optimized */}
      <img src="/images/smiling-cat.webp" alt="Smiling cat" />

      {/* This is optimized */}
      <Image
        src="/images/smiling-cat.webp"
        alt="Smiling cat"
        height={200}
        width={300}
      />

      <Image src={smilingCat} alt="Smiling cat" />
    </div>
  );
}
