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
    viewBox='0 0 48 48'
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
