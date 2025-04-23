'use client';
import styles from "app/styles/components/InstagramPosts.module.scss"
import { useEffect } from 'react';
import { FaInstagram} from 'react-icons/fa'

interface InstagramPostProps {
  url: string;
}

const InstagramPost = ({ url }: InstagramPostProps) => {
  useEffect(() => {
    const scriptId = 'instagram-embed-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = '//www.instagram.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    } else {
      // @ts-ignore
      if (window.instgrm) window.instgrm.Embeds.process();
    }
  }, [url]);

  return (
    <div className={styles.instagramPosts}>
      <div className={styles.instagramSection}>
        <p>Instagram</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `
          <blockquote 
          class="instagram-media" 
          data-instgrm-permalink="${url}" 
          data-instgrm-version="14"
          style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px rgba(0,0,0,0.5),0 1px 10px rgba(0,0,0,0.15); margin: 1rem auto; max-width:540px; min-width:326px; width:100%;">
          </blockquote>
          `,
        }}
        />
      </div>
    </div>
  );
};

export default InstagramPost;
