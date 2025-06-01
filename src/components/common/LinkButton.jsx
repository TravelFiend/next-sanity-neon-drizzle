import conditionalClasses from '@/lib/utils/conditionalClasses';
import Link from 'next/link';

const LinkButton = ({ linkData }) => {
  const {
    link: { internalLink, externalLink },
    isDark
  } = linkData;

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
        {internalLink?.linkText}
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
        {externalLink?.linkText}
      </a>
    );
  }
};

export default LinkButton;
