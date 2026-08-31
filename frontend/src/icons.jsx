/* Inline stroke icons — no icon-font dependency, sized by CSS. */

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  xmlns: 'http://www.w3.org/2000/svg',
}

const make = (paths) => (props) => (
  <svg {...base} {...props}>
    {paths}
  </svg>
)

export const IconHome = make(
  <>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5.5 9.5V21h13V9.5" />
  </>,
)

export const IconUser = make(
  <>
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
  </>,
)

export const IconBriefcase = make(
  <>
    <rect x="3" y="7.5" width="18" height="13" rx="2" />
    <path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5M3 13h18" />
  </>,
)

export const IconLayers = make(
  <>
    <path d="m12 3 9 5-9 5-9-5 9-5Z" />
    <path d="m3 13 9 5 9-5M3 17l9 5 9-5" />
  </>,
)

export const IconCube = make(
  <>
    <path d="M12 2.8 20.5 7v10L12 21.2 3.5 17V7L12 2.8Z" />
    <path d="M3.5 7 12 11.5 20.5 7M12 21.2V11.5" />
  </>,
)

export const IconAward = make(
  <>
    <circle cx="12" cy="9" r="5.5" />
    <path d="m8.5 14-1.5 7 5-2.5 5 2.5-1.5-7" />
  </>,
)

export const IconChat = make(
  <>
    <path d="M20.5 12.5a7.5 7.5 0 0 1-10.9 6.7L4 20.5l1.4-5A7.5 7.5 0 1 1 20.5 12.5Z" />
    <path d="M9 12h.01M12.5 12h.01M16 12h.01" />
  </>,
)

export const IconMail = make(
  <>
    <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </>,
)

export const IconPhone = make(
  <path d="M6.5 3.5h3l1.5 4-2 1.4a12 12 0 0 0 6.1 6.1l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z" />,
)

export const IconPin = make(
  <>
    <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </>,
)

export const IconGithub = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 1.8a10.2 10.2 0 0 0-3.2 19.9c.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.2-1.5-1.2-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.7-1.4-2.3-.3-4.7-1.1-4.7-5a4 4 0 0 1 1-2.7c-.1-.3-.4-1.3.1-2.7 0 0 .9-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7a4 4 0 0 1 1 2.7c0 3.9-2.3 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10.2 10.2 0 0 0 12 1.8Z" />
  </svg>
)

export const IconLinkedin = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9.5h4v11H3v-11Zm6.5 0h3.8v1.5h.06c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.77 2.5 4.77 5.76v5.69h-4v-5c0-1.2-.02-2.74-1.75-2.74-1.75 0-2.02 1.3-2.02 2.65v5.09h-4v-11Z" />
  </svg>
)

export const IconTerminal = make(
  <>
    <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
    <path d="m7 10 2.5 2L7 14M12.5 15H17" />
  </>,
)

export const IconDatabase = make(
  <>
    <ellipse cx="12" cy="6" rx="7.5" ry="3" />
    <path d="M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6" />
    <path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" />
  </>,
)

export const IconSend = make(<path d="M4 12 20.5 4l-4 16.5-4.5-6.5L4 12Z" />)

export const IconArrowRight = make(
  <>
    <path d="M4 12h15" />
    <path d="m13.5 6.5 6 5.5-6 5.5" />
  </>,
)

export const IconChevronRight = make(<path d="m9.5 6 6 6-6 6" />)

export const IconArrowUp = make(
  <>
    <path d="M12 20V5" />
    <path d="m6 11 6-6 6 6" />
  </>,
)

export const IconClose = make(<path d="m6 6 12 12M18 6 6 18" />)

export const IconSearch = make(
  <>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4.5 4.5" />
  </>,
)

export const IconDownload = make(
  <>
    <path d="M12 3v11" />
    <path d="m7.5 10 4.5 4.5 4.5-4.5" />
    <path d="M4.5 20h15" />
  </>,
)

export const IconGraduation = make(
  <>
    <path d="M12 4 22 9l-10 5L2 9l10-5Z" />
    <path d="M6 11.5V17c0 1.4 2.7 3 6 3s6-1.6 6-3v-5.5" />
  </>,
)

export const IconSpark = make(
  <path d="M12 3.5 13.9 9l5.6 1.9-5.6 2L12 18.5l-1.9-5.6-5.6-2L10.1 9 12 3.5Z" />,
)
