'use client';

import ContentWrapper from '@/components/common/ContentWrapper';

export default function MainError() {
  return (
    <ContentWrapper justify="center">
      <h2>An error occurred.</h2>
      <p>
        Unfortunately, something went wrong. We&apos;re working on it! Reloading
        the page might resolve the issue.
      </p>
    </ContentWrapper>
  );
}
