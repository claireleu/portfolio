import { FaTwitter, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function SocialLinks() {
  return (
    <div className="flex gap-4 text-accent">
      <a href="https://x.com/claireleuu" target="_blank" aria-label="Twitter">
        <FaTwitter className="w-5 h-5" />
      </a>
      <a href="https://github.com/claireleu" target="_blank" aria-label="GitHub">
        <FaGithub className="w-5 h-5" />
      </a>
      <a href="https://linkedin.com/in/claireleu" target="_blank" aria-label="LinkedIn">
        <FaLinkedin className="w-5 h-5" />
      </a>
      <a href="mailto:claireliu6829@gmail.com" target="_blank" aria-label="Email">
        <FaEnvelope className="w-5 h-5" />
      </a>
    </div>
  );
}