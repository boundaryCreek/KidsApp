'use client';

import { useState, useRef, useEffect } from 'react';
import { Copy, Facebook, Twitter, Share2, Mail, Check } from 'lucide-react';
import * as styles from './ShareToolbar.styles';

interface ShareToolbarProps {
  url: string;
  title: string;
  description?: string;
}

export default function ShareToolbar({ url, title, description }: ShareToolbarProps) {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      setIsOpen(false);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
    setIsOpen(false);
  };

  const handleTwitterShare = () => {
    const text = description || title;
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
    setIsOpen(false);
  };

  const handleRedditShare = () => {
    const redditUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
    window.open(redditUrl, '_blank', 'width=800,height=600');
    setIsOpen(false);
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(`Check out this location: ${url}${description ? '\n\n' + description : ''}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setIsOpen(false);
  };

  return (
    <div style={styles.shareToolbar} ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={styles.shareButton}
        title="Share"
      >
        <Share2 size={18} />
        <span style={styles.shareButtonText}>Share</span>
      </button>
      
      {isOpen && (
        <div style={styles.shareMenu}>
          <button
            onClick={handleCopyLink}
            style={styles.shareMenuItem}
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>
          <button
            onClick={handleFacebookShare}
            style={styles.shareMenuItem}
          >
            <Facebook size={18} />
            <span>Facebook</span>
          </button>
          <button
            onClick={handleTwitterShare}
            style={styles.shareMenuItem}
          >
            <Twitter size={18} />
            <span>X</span>
          </button>
          <button
            onClick={handleRedditShare}
            style={styles.shareMenuItem}
          >
            <Share2 size={18} />
            <span>Reddit</span>
          </button>
          <button
            onClick={handleEmailShare}
            style={styles.shareMenuItem}
          >
            <Mail size={18} />
            <span>Email</span>
          </button>
        </div>
      )}
    </div>
  );
}
