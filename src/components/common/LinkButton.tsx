import conditionalClasses from '@/lib/utils/conditionalClasses';
import Link from 'next/link';
import type { HeroBlockRes } from '@sanityTypes/derivedTypes';

type LinkButtonProps = {
  linkData: HeroBlockRes['ctaButton'];
};

const LinkButton: React.FC<LinkButtonProps> = ({ linkData }) => {
  if (!linkData) return null;

  const { link, isDark } = linkData;

  if (!link) return null;

  const { internalLink, externalLink } = link;

  if (internalLink) {
    return (
      <Link
        href={`/${internalLink.slug.current}`}
        className={conditionalClasses(
          'relative top-4 rounded-sm p-4 text-blue-500 hover:underline',
          isDark
            ? 'border border-white bg-primary text-white'
            : 'border border-primary bg-white text-primary'
        )}
      >
        {internalLink.linkText}
      </Link>
    );
  }

  if (externalLink) {
    return (
      <a
        href={externalLink.url}
        target="_blank"
        rel="noopener noreferrer"
        className={conditionalClasses(
          'relative top-4 rounded-sm p-4 text-blue-500 hover:underline',
          isDark
            ? 'border border-white bg-primary text-white'
            : 'border border-primary bg-white text-primary'
        )}
      >
        {externalLink.linkText}
      </a>
    );
  }
};

export default LinkButton;
