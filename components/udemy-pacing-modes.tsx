const MODES = [
  {
    name: 'Turbo',
    delay: '100 ms',
    batch: 'No pause',
    pause: '-',
  },
  {
    name: 'Balanced',
    delay: '250 ms',
    batch: 'Every 30 clicks',
    pause: '1.5 s',
  },
  {
    name: 'Safe',
    delay: '400 ms',
    batch: 'Every 20 clicks',
    pause: '3 s',
  },
  {
    name: 'Auto (default)',
    delay: '250 ms',
    batch: 'Every 30 clicks',
    pause: '1.5 s',
  },
  {
    name: 'Advanced',
    delay: '50 to 1000 ms',
    batch: 'Every 5 to 50 clicks',
    pause: 'Six delays, at least 1 s',
  },
];

export function UdemyPacingModes() {
  return (
    <table>
      <caption className="sr-only">
        Udemy Reset Progress speed modes in version 2.1.2
      </caption>
      <thead>
        <tr>
          <th scope="col">Mode</th>
          <th scope="col">Between clicks</th>
          <th scope="col">Pause</th>
          <th scope="col">Pause length</th>
        </tr>
      </thead>
      <tbody>
        {MODES.map((mode) => (
          <tr key={mode.name}>
            <th scope="row">{mode.name}</th>
            <td>{mode.delay}</td>
            <td>{mode.batch}</td>
            <td>{mode.pause}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
