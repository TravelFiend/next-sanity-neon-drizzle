const CTAButtonFragment = `
  _type,
  link{
    internalLink{
      _type,
      linkText,
      slug{
        current
      }
    },
    externalLink{
      _type,
      linkText,
      url
    }
  },
  isDark
`;

export default CTAButtonFragment;
