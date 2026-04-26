export default function AsciiArt() {
  const art = `
 ____             ____        _
|  _ \\  _____   _|  _ \\ _   _| |___  ___
| | | |/ _ \\ \\ / / |_) | | | | / __|/ _ \\
| |_| |  __/\\ V /|  __/| |_| | \\__ \\  __/
|____/ \\___| \\_/ |_|    \\__,_|_|___/\\___|
`;

  return (
    <pre className="text-green-500 text-xs sm:text-sm md:text-base leading-tight whitespace-pre select-none">
      {art}
    </pre>
  );
}
