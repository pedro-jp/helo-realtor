import * as React from 'react';

export const WazeMap = (props: any) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={58}
    height={58}
    viewBox='0 0 100 100'
    {...props}
  >
    <path
      fill='#39c2d8'
      d='M69 82H31c-7.18 0-13-5.82-13-13V31c0-7.18 5.82-13 13-13h38c7.18 0 13 5.82 13 13v38c0 7.18-5.82 13-13 13z'
    />
    <path
      fill='#1f212b'
      d='M30 17c-7.168 0-13 5.832-13 13v39c0 7.168 5.832 13 13 13h39c7.168 0 13-5.832 13-13V30c0-7.168-5.832-13-13-13H30zm0 2h39c6.065 0 11 4.935 11 11v39c0 6.065-4.935 11-11 11H30c-6.065 0-11-4.935-11-11V30c0-6.065 4.935-11 11-11z'
    />
    <path
      fill='#1f212b'
      d='M32.838 22C26.862 22 22 26.862 22 32.838v33.326C22 72.14 26.862 77 32.838 77h33.324C72.138 77 77 72.139 77 66.164V47.502a.5.5 0 0 0-1 0v18.662C76 71.588 71.586 76 66.162 76H32.838C27.414 76 23 71.588 23 66.164V32.838C23 27.414 27.414 23 32.838 23H66.5a.5.5 0 0 0 0-1H32.838zM76.5 37.002a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-2a.5.5 0 0 0-.5-.5zm0 4a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 1 0v-4a.5.5 0 0 0-.5-.5z'
    />
    <circle cx={57} cy={65} r={4.5} fill='#565fa1' />
    <path
      fill='#1f212b'
      d='M57 70c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5zm0-9c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4z'
    />
    <path
      fill='#fefdef'
      d='M34.489 48.523c0-9.382 7.606-16.989 16.989-16.989s16.989 7.606 16.989 16.989-7.606 16.989-16.989 16.989-16.989 0-21.42-9.602c4.431-.74 4.431-2.217 4.431-7.387z'
    />
    <path
      fill='#1f212b'
      d='M51.477 66.012c-9.287 0-17.308 0-21.875-9.893a.5.5 0 0 1 .372-.703c4.014-.669 4.014-1.741 4.014-6.894 0-9.644 7.845-17.488 17.488-17.488 9.644 0 17.489 7.845 17.489 17.488s-7.844 17.49-17.488 17.49zm-20.688-9.731c4.333 8.731 11.573 8.73 20.688 8.73 9.092 0 16.489-7.397 16.489-16.489s-7.397-16.488-16.489-16.488-16.488 7.396-16.488 16.488c0 4.906-.001 6.885-4.2 7.759z'
    />
    <circle cx={42} cy={65} r={4.5} fill='#565fa1' />
    <path
      fill='#1f212b'
      d='M42 70c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5zm0-9c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4z'
    />
    <circle cx={60} cy={45} r={1.5} fill='#565fa1' />
    <path
      fill='#1f212b'
      d='M60 47c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zm0-3a1.001 1.001 0 0 0 0 2 1.001 1.001 0 0 0 0-2z'
    />
    <circle cx={48} cy={45} r={1.5} fill='#565fa1' />
    <path
      fill='#1f212b'
      d='M48 47c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zm0-3a1.001 1.001 0 0 0 0 2 1.001 1.001 0 0 0 0-2zM53.5 57a8.045 8.045 0 0 1-7.221-4.553.5.5 0 0 1 .902-.432A7.038 7.038 0 0 0 53.5 56a7.033 7.033 0 0 0 6.331-4.011.5.5 0 1 1 .904.428A8.039 8.039 0 0 1 53.5 57z'
    />
  </svg>
);

export const GoogleMap = (props: any) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={50}
    height={50}
    viewBox='0 0 50 50'
    {...props}
  >
    <path
      fill='#1c9957'
      d='M42 39V9a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v30a3 3 0 0 0 3 3h30a3 3 0 0 0 3-3z'
    />
    <path fill='#3e7bf1' d='M9 42h30c1.657 0-15-16-15-16S7.343 42 9 42z' />
    <path fill='#cbccc9' d='M42 39V9c0-1.657-16 15-16 15s16 16.657 16 15z' />
    <path
      fill='#efefef'
      d='M39 42a3 3 0 0 0 3-3v-.245L26.245 23 23 26.245 38.755 42H39z'
    />
    <path
      fill='#ffd73d'
      d='M42 9a3 3 0 0 0-3-3h-.245L6 38.755V39a3 3 0 0 0 3 3h.245L42 9.245V9z'
    />
    <path
      fill='#d73f35'
      d='M36 2c-5.523 0-10 4.477-10 10 0 6.813 7.666 9.295 9.333 19.851.107.68.115 1.149.667 1.149s.56-.469.667-1.149C38.334 21.295 46 18.813 46 12c0-5.523-4.477-10-10-10z'
    />
    <path fill='#752622' d='M36 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 1 0 0-7Z' />
    <path
      fill='#fff'
      d='M14.493 12.531v2.101h2.994c-.392 1.274-1.455 2.185-2.994 2.185a3.317 3.317 0 1 1 2.156-5.837l1.548-1.547A5.5 5.5 0 1 0 14.493 19c4.81 0 5.637-4.317 5.184-6.461l-5.184-.008z'
    />
  </svg>
);

export const AppleMap = (props: any) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={50} height={50} {...props}>
    <path
      fill='#e0e0e0'
      d='M35.13 42H19V30s16.48 12 16.13 12zM6.3 10.87c.1-.33.22-.65.38-.96A6.728 6.728 0 0 1 10 6.64c.149-.075 1 6.36 1 6.36s-4.807-1.793-4.7-2.13z'
    />
    <path fill='#7cb342' d='M18 6h2v17h-2z' />
    <path
      fill='#ffcdd2'
      d='M11 18v23.73c-.35-.09-.68-.21-1-.37-2.36-1.08-4-3.47-4-6.23V18h5z'
    />
    <path
      fill='#aed581'
      d='M42 25v10.13c0 .36-.03.71-.09 1.05L20 20.6V6h3c0 10.48 8.52 19 19 19z'
    />
    <path
      fill='#bdbdbd'
      d='M12 14h-2V6.64c.32-.16.65-.28 1-.37.32-.1.66-.17 1-.2.28-.05 0 7.93 0 7.93zm6 18h2v10h-2z'
    />
    <path
      fill='#f9a825'
      d='M42 35.02v.11c0 .36-.03.71-.09 1.05-.06.43-.16.84-.31 1.23a6.81 6.81 0 0 1-5.44 4.5c-.33.06-.68.09-1.03.09h-.57l-3.02-2.15c-.01 0-.01-.01-.01-.01l-4.5-3.2s-.01 0-.01-.01l-6.36-4.52-.66-.46-1-.72-1-.71-.91-.64-.81-.58-2.49-1.77L12.06 26l-.06-.04-1-.71-1-.72-.74-.53h-.01L6 21.69v-8.82c0-.69.1-1.37.3-2 .1-.33.22-.65.38-.96L10 12.27l2 1.42 1 .71 5 3.55 1 .71.55.39.45.32v.01l14.73 10.47 1.6 1.14 2.66 1.89.98.7L42 35.02z'
    />
    <path
      fill='#fdd835'
      d='M41.91 36.18c-.06.43-.16.84-.31 1.23a6.81 6.81 0 0 1-5.44 4.5l-2.72-1.93c-.01.01-.01.01-.02 0l-1.49-1.08-4.15-2.94-.01-.01-1.51-1.08-5.07-3.6-1.19-.85-1-.71-1-.71-1.53-1.09h-.01l-2.31-1.65-1.15-.81-1-.72-1-.71-1-.71-.11-.08L6 20.47v-7.6c0-.69.1-1.37.3-2L10 13.5l1 .71 2 1.42 5 3.55 1 .71 1 .71v.01l12.41 8.81 1.89 1.35s0 .01.01.01l4.6 3.26.88.63 2.12 1.51z'
    />
    <path
      fill='#ef9a9a'
      d='M12 33v8.94a5.55 5.55 0 0 1-1-.21c-.35-.09-.68-.21-1-.37V32l2 1z'
    />
    <path
      fill='#fafafa'
      d='M19 6v36h-6.13c-.3 0-.59-.02-.87-.06a5.55 5.55 0 0 1-1-.21V6.27c.32-.1.66-.17 1-.2.28-.05.57-.07.87-.07H19z'
    />
    <path fill='#3996e8' d='M18 6v17h-6V6.052c.28-.037.57-.052.87-.052H18z' />
    <path
      fill='#1976d2'
      d='M38.77 29.04S38 30 36 30s-3-1-3-1-1 1-3 1-2.77-.96-2.77-.96A6.91 6.91 0 0 0 26 33c0 3.87 3.13 7 7 7s7-3.13 7-7c0-1.47-.45-2.84-1.23-3.96z'
    />
    <path
      fill='#d84315'
      d='M38 33H28c0-.42.05-.83.15-1.23.57.15 1.19.23 1.85.23 1.28 0 2.29-.31 3-.64.71.33 1.72.64 3 .64.66 0 1.28-.08 1.85-.23.1.4.15.81.15 1.23z'
    />
    <path
      fill='#fbc02d'
      d='M10 12.27v12.26l1 .72V12.98zm10 7.11v12.27l-1-.72V18.66z'
    />
    <path fill='#1976d2' d='M15 21a7 7 0 1 0 0 14 7 7 0 1 0 0-14Z' />
    <path
      fill='#e89c23'
      d='M10 12.27v1.23l1 .71v-1.23zm9 6.39v1.23l1 .71v-1.23z'
    />
    <path
      fill='#e9e9e9'
      d='M42 16.96V26c-11.03 0-20-8.97-20-20h9.04c.48 5.83 5.13 10.48 10.96 10.96z'
    />
    <path
      fill='#7cb342'
      d='M42 13v4.96C35.62 17.48 30.52 12.38 30.05 6H35c3.87 0 7 3.13 7 7z'
    />
    <path
      fill='#aed581'
      d='M42 13v3.96C36.17 16.48 31.52 11.83 31.04 6H35c3.87 0 7 3.13 7 7z'
    />
    <path
      fill='#7cb342'
      d='M23 6h-1c0 11.03 8.97 20 20 20v-1c-10.48 0-19-8.52-19-19z'
    />
    <path fill='#fafafa' d='m15 24-3 8 3-2 3 2z' />
    <path
      fill='#fff'
      d='M38.45 30.48c-.57.28-1.37.52-2.45.52-1.39 0-2.39-.41-3-.77-.61.36-1.61.77-3 .77-1.08 0-1.88-.24-2.45-.52A6.005 6.005 0 0 0 33 39a6.005 6.005 0 0 0 5.45-8.52zM33 38a5.009 5.009 0 0 1-4.899-4h9.798A5.009 5.009 0 0 1 33 38zm-5-5c0-.422.051-.834.151-1.233A7.073 7.073 0 0 0 30 32c1.283 0 2.288-.308 3-.641.712.333 1.717.641 3 .641.657 0 1.276-.078 1.849-.233.1.399.151.811.151 1.233H28z'
    />
    <path
      fill='#fff'
      d='M32.125 35.24s0-.625-.625-.625-.625.625-.625.625h.375c0-.114.043-.25.25-.25.066 0 .242 0 .25.25 0 .215-.291.549-.487.707l-.013.01-.375.325V36.616h1.25v-.376h-.628s.628-.5.628-1zm1.275.375a.55.55 0 0 0 .225-.427c0-.316-.28-.573-.625-.573s-.625.257-.625.573c0 .184.1.325.225.427a.55.55 0 0 0-.225.427c0 .316.28.573.625.573s.625-.257.625-.573a.55.55 0 0 0-.225-.427zm-.4-.625c.135 0 .25.091.25.198 0 .106-.157.19-.25.228-.092-.037-.25-.121-.25-.228 0-.109.112-.198.25-.198zm0 1.25c-.138 0-.25-.089-.25-.198 0-.106.157-.19.25-.228.092.037.25.121.25.228 0 .107-.115.198-.25.198zm1.499-1.25c.104 0 .138.033.163.067.057.075.087.207.087.382v.354c0 .175-.03.307-.086.381-.026.034-.06.067-.162.067-.105 0-.139-.033-.165-.067-.057-.075-.087-.206-.087-.38v-.355c0-.175.03-.307.086-.381.027-.035.061-.068.164-.068m0-.375c-.199 0-.352.071-.461.214s-.163.346-.163.608v.355c0 .261.055.463.164.607a.547.547 0 0 0 .463.215.544.544 0 0 0 .46-.214c.109-.143.163-.346.163-.608v-.354c0-.262-.055-.465-.164-.608a.547.547 0 0 0-.462-.215z'
    />
  </svg>
);

export const Share = (props: any) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={40}
    height={40}
    viewBox='0 0 50 50'
    {...props}
  >
    <path d='M40 0c-5.465 0-9.922 4.398-10 9.844V10c0 3.688 1.996 6.89 4.969 8.625A9.959 9.959 0 0 0 40 20c5.516 0 10-4.484 10-10S45.516 0 40 0ZM28.062 10.844l-10.218 5.125c2.379 2.062 3.941 5.031 4.125 8.375l10.343-5.188a11.95 11.95 0 0 1-4.25-8.312ZM10 15C4.484 15 0 19.484 0 25s4.484 10 10 10a9.9 9.9 0 0 0 5.531-1.688C18.215 31.52 20 28.473 20 25c0-3.59-1.91-6.734-4.75-8.5A9.876 9.876 0 0 0 10 15Zm11.969 10.656a12 12 0 0 1-4.094 8.407l10.188 5.093a11.94 11.94 0 0 1 4.218-8.312ZM40 30a9.916 9.916 0 0 0-5.563 1.719C31.77 33.516 30 36.543 30 40v.031c-.043.004-.082.028-.125.032l.125.062C30.066 45.582 34.527 50 40 50c5.516 0 10-4.484 10-10s-4.484-10-10-10Z' />
  </svg>
);

export const Favorite = (props: any) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    xmlSpace='preserve'
    width={50}
    height={50}
    style={{
      '--darkreader-inline-fill': '#000000',
    }}
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='m12 23.2-.6-.5C8.7 20.7 0 13.5 0 7.3 0 3.8 2.9 1 6.5 1c2.2 0 4.3 1.1 5.5 2.9C13.2 2.1 15.3 1 17.5 1 21.1 1 24 3.8 24 7.3c0 6.3-8.7 13.4-11.4 15.5l-.6.4zM6.5 2.9C4 2.9 2 4.8 2 7.2c0 4.1 5.1 9.5 10 13.4 4.9-3.9 10-9.3 10-13.4 0-2.4-2-4.3-4.5-4.3-1.6 0-3 .8-3.8 2L12 7.6 10.3 5c-.8-1.3-2.2-2.1-3.8-2.1z' />
  </svg>
);

export const Placeholder = (props: any) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={300} height={400} {...props}>
    <rect width='100%' height='100%' fill='#DDD' />
    <path
      fill='#999'
      d='m124.03 203.86-1.46 2.31q-.26.42-.54.59-.29.17-.73.17-.47 0-1-.26-.54-.26-1.24-.59-.7-.32-1.6-.58-.89-.26-2.12-.26-1.89 0-2.97.8-1.08.81-1.08 2.11 0 .86.56 1.44.56.59 1.48 1.03.92.44 2.09.79 1.17.35 2.38.77 1.21.42 2.38.95t2.09 1.35q.93.82 1.49 1.96.55 1.15.55 2.76 0 1.92-.68 3.55-.69 1.62-2.05 2.81-1.35 1.18-3.34 1.84-1.99.67-4.59.67-1.37 0-2.69-.25-1.31-.25-2.52-.69-1.21-.44-2.23-1.04-1.03-.6-1.81-1.3l1.48-2.44q.29-.45.68-.68.39-.23.98-.23.6 0 1.14.33.53.34 1.23.73.7.39 1.65.73.95.34 2.41.34 1.14 0 1.96-.28.82-.27 1.35-.71.53-.44.78-1.03.25-.58.25-1.21 0-.93-.56-1.53t-1.48-1.04q-.93-.44-2.11-.79-1.18-.35-2.42-.77-1.23-.42-2.41-.98-1.19-.55-2.11-1.41-.92-.86-1.48-2.11-.56-1.25-.56-3.01 0-1.64.65-3.12.65-1.49 1.91-2.59 1.26-1.11 3.15-1.77 1.88-.66 4.35-.66 2.76 0 5.02.91t3.77 2.39Zm10.19 7.38h12.12q0-1.24-.35-2.35-.36-1.1-1.06-1.94-.7-.83-1.78-1.31-1.08-.48-2.51-.48-2.78 0-4.38 1.59-1.6 1.58-2.04 4.49Zm16.38 3.88h-16.51q.16 2.05.73 3.55.57 1.49 1.51 2.47.93.97 2.22 1.45t2.85.48q1.56 0 2.69-.36t1.97-.81q.85-.44 1.49-.8.63-.37 1.23-.37.81 0 1.2.6l1.84 2.34q-1.06 1.25-2.39 2.09-1.33.85-2.77 1.36-1.44.5-2.94.71-1.49.21-2.9.21-2.78 0-5.17-.92-2.39-.93-4.16-2.73-1.77-1.81-2.78-4.48-1.02-2.66-1.02-6.17 0-2.73.89-5.14.88-2.4 2.53-4.18 1.65-1.78 4.03-2.82 2.38-1.04 5.37-1.04 2.52 0 4.66.8 2.13.81 3.66 2.36 1.54 1.54 2.41 3.79.87 2.25.87 5.14 0 1.45-.31 1.96-.32.51-1.2.51Zm12.74 12.53h-6.42v-26.68h3.92q1.25 0 1.64 1.17l.42 1.98q.7-.78 1.47-1.43.76-.65 1.64-1.12.87-.47 1.87-.74t2.19-.27q2.53 0 4.15 1.36 1.63 1.37 2.43 3.63.63-1.33 1.56-2.28.94-.94 2.06-1.54 1.11-.6 2.38-.89 1.26-.28 2.53-.28 2.21 0 3.93.67 1.71.68 2.88 1.98 1.17 1.3 1.78 3.17.61 1.87.61 4.29v16.98h-6.42v-16.98q0-2.55-1.12-3.83-1.11-1.29-3.27-1.29-.99 0-1.83.34-.85.34-1.49.97-.63.64-1 1.6-.36.96-.36 2.21v16.98h-6.45v-16.98q0-2.68-1.08-3.9-1.08-1.22-3.16-1.22-1.4 0-2.61.69t-2.25 1.88v19.53ZM62.63 263.37h6.45v26.68h-6.45v-26.68Zm7.33-7.77q0 .83-.34 1.56-.34.73-.89 1.27-.56.55-1.32.88-.75.32-1.61.32-.83 0-1.57-.32-.74-.33-1.29-.88-.55-.54-.87-1.27-.33-.73-.33-1.56 0-.86.33-1.61.32-.76.87-1.3.55-.55 1.29-.87.74-.33 1.57-.33.86 0 1.61.33.76.32 1.32.87.55.54.89 1.3.34.75.34 1.61Zm12.09 34.45h-6.42v-26.68h3.92q1.25 0 1.64 1.17l.42 1.98q.7-.78 1.47-1.43.76-.65 1.64-1.12.87-.47 1.87-.74t2.19-.27q2.53 0 4.15 1.36 1.63 1.37 2.43 3.63.63-1.33 1.56-2.27.94-.95 2.06-1.55 1.11-.6 2.38-.89 1.26-.28 2.53-.28 2.21 0 3.93.67 1.71.68 2.88 1.98 1.17 1.3 1.78 3.17.61 1.87.61 4.29v16.98h-6.42v-16.98q0-2.55-1.12-3.83-1.11-1.29-3.27-1.29-.99 0-1.83.34-.85.34-1.49.97-.63.64-1 1.6-.36.96-.36 2.21v16.98h-6.45v-16.98q0-2.68-1.08-3.9-1.08-1.22-3.16-1.22-1.4 0-2.61.69t-2.25 1.88v19.53Zm51.22-6.89v-4.5q-2.78.13-4.68.48t-3.04.9q-1.15.55-1.64 1.27-.49.73-.49 1.59 0 1.69 1 2.42t2.61.73q1.98 0 3.42-.72 1.44-.71 2.82-2.17Zm-13.57-14.01-1.15-2.06q4.61-4.21 11.08-4.21 2.34 0 4.19.77 1.84.76 3.12 2.13 1.27 1.36 1.93 3.26.67 1.9.67 4.16v16.85h-2.92q-.91 0-1.4-.27-.49-.28-.78-1.11l-.57-1.92q-1.02.91-1.98 1.6-.96.69-2 1.15-1.04.47-2.22.72-1.19.25-2.62.25-1.69 0-3.12-.46-1.43-.45-2.47-1.36-1.04-.91-1.61-2.27-.57-1.35-.57-3.14 0-1.02.34-2.02t1.1-1.91q.77-.91 1.99-1.71 1.22-.81 3.01-1.41 1.78-.6 4.14-.97 2.37-.38 5.41-.46v-1.56q0-2.68-1.14-3.96-1.15-1.29-3.31-1.29-1.56 0-2.58.36-1.03.37-1.81.82-.78.46-1.42.82-.63.37-1.41.37-.68 0-1.15-.35-.47-.36-.75-.82Zm35.62 6.91q1.19 0 2.08-.32.88-.33 1.47-.9.58-.57.88-1.38.3-.8.3-1.77 0-1.97-1.18-3.13-1.19-1.16-3.55-1.16-2.37 0-3.55 1.16-1.18 1.16-1.18 3.13 0 .94.3 1.75.29.8.88 1.39.58.58 1.48.91.9.32 2.07.32Zm7.25 15.19q0-.78-.47-1.28-.46-.49-1.27-.76-.81-.28-1.88-.41-1.08-.13-2.29-.19-1.21-.07-2.5-.12-1.29-.05-2.51-.21-1.06.6-1.73 1.41-.66.8-.66 1.87 0 .7.35 1.31.35.61 1.12 1.05.77.45 1.99.69 1.22.25 2.99.25 1.79 0 3.09-.27 1.3-.28 2.15-.76.84-.48 1.23-1.14.39-.66.39-1.44Zm-1.27-26.97h7.67v2.4q0 1.14-1.38 1.4l-2.39.44q.54 1.38.54 3.02 0 1.97-.79 3.57-.79 1.6-2.2 2.72-1.4 1.12-3.31 1.73-1.91.61-4.12.61-.78 0-1.51-.08t-1.43-.21q-1.25.76-1.25 1.69 0 .81.74 1.19.74.37 1.97.53 1.22.16 2.78.2 1.56.03 3.2.16 1.63.13 3.19.46 1.56.32 2.79 1.03 1.22.7 1.96 1.91t.74 3.1q0 1.77-.87 3.44-.87 1.66-2.52 2.96t-4.06 2.09q-2.4.8-5.47.8-3.02 0-5.25-.59-2.24-.58-3.72-1.56-1.48-.97-2.21-2.25-.73-1.27-.73-2.65 0-1.87 1.13-3.13 1.13-1.26 3.11-2.02-1.07-.54-1.69-1.45-.63-.91-.63-2.4 0-.59.23-1.23.22-.64.65-1.26.42-.63 1.07-1.18.65-.56 1.54-1.01-2.03-1.09-3.19-2.91-1.15-1.82-1.15-4.26 0-1.98.79-3.58t2.21-2.73q1.42-1.13 3.35-1.73 1.94-.59 4.23-.59 1.71 0 3.22.35 1.51.35 2.76 1.02Zm16.79 9.36h12.12q0-1.24-.35-2.35-.35-1.1-1.05-1.94-.71-.83-1.78-1.31-1.08-.48-2.51-.48-2.79 0-4.38 1.59-1.6 1.58-2.05 4.49Zm16.39 3.88h-16.52q.16 2.05.73 3.55.57 1.49 1.51 2.47.94.97 2.22 1.45 1.29.48 2.85.48t2.69-.36q1.13-.36 1.98-.81.84-.44 1.48-.8.64-.37 1.23-.37.81 0 1.2.6l1.85 2.34q-1.07 1.25-2.4 2.1-1.32.84-2.76 1.35-1.45.5-2.94.71-1.5.21-2.9.21-2.78 0-5.18-.92-2.39-.93-4.16-2.73-1.76-1.81-2.78-4.47-1.01-2.67-1.01-6.18 0-2.73.88-5.13.89-2.41 2.54-4.19 1.65-1.78 4.03-2.82 2.38-1.04 5.37-1.04 2.52 0 4.65.8 2.13.81 3.67 2.36 1.53 1.54 2.4 3.79.87 2.25.87 5.14 0 1.45-.31 1.96t-1.19.51Zm12.73 12.53h-6.42v-26.68h3.93q1.25 0 1.64 1.17l.41 1.98q.7-.78 1.47-1.43.77-.65 1.64-1.12.87-.47 1.87-.74t2.2-.27q2.52 0 4.15 1.36 1.62 1.37 2.43 3.63.62-1.33 1.56-2.27.93-.95 2.05-1.55 1.12-.6 2.38-.89 1.26-.28 2.53-.28 2.22 0 3.93.67 1.72.68 2.89 1.98 1.17 1.3 1.78 3.17.61 1.87.61 4.29v16.98h-6.42v-16.98q0-2.55-1.12-3.83-1.12-1.29-3.28-1.29-.98 0-1.83.34-.85.34-1.48.97-.64.64-1 1.6-.37.96-.37 2.21v16.98h-6.45v-16.98q0-2.68-1.07-3.9-1.08-1.22-3.16-1.22-1.41 0-2.62.69-1.21.69-2.25 1.88v19.53Z'
    />
  </svg>
);

export const Iphone = (props: any) => (
  <svg
    width='200'
    height='400'
    viewBox='0 0 200 400'
    xmlns='http://www.w3.org/2000/svg'
  >
    <rect
      x='10'
      y='10'
      width='180'
      height='380'
      rx='20'
      ry='20'
      fill='#000'
      stroke='#333'
      stroke-width='2'
    />

    <rect x='15' y='15' width='170' height='370' rx='15' ry='15' fill='#fff' />

    <rect x='80' y='20' width='40' height='10' rx='5' ry='5' fill='#333' />

    <rect x='7' y='70' width='2' height='30' rx='1.5' ry='1.5' fill='#333' />
    <rect x='7' y='105' width='2' height='30' rx='1.5' ry='1.5' fill='#333' />
    <rect x='190' y='85' width='2' height='40' rx='1.5' ry='1.5' fill='#333' />
  </svg>
);
